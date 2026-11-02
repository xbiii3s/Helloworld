import { STANDARD_STRUCTURE } from "./blinds";
import { formatChips, formatVND } from "./format";
import { paidPlaces, payoutStructure } from "./payouts";
import type { BlindLevel, LiveSnapshot, Tournament } from "./types";

/**
 * 比赛实况引擎（演示版）。
 *
 * 这里根据开赛时间 + 当前时间“确定性地”推算级别、剩余人数、筹码榜等，
 * 让页面在没有后台录入的情况下也能演示实况效果。
 * 正式上线时：由俱乐部工作人员在后台（或计时器软件对接）录入数据，
 * 本函数改为从数据库读取最新快照即可，前端无需改动。
 */

const NAMES: [string, string][] = [
  ["Nguyễn Hoàng Long", "VN"], ["Trần Bảo Ngọc", "VN"], ["Lê Văn Tài", "VN"], ["Phạm Quốc Việt", "VN"],
  ["Đỗ Minh Khang", "VN"], ["Vũ Thanh Tùng", "VN"], ["Zhang Wei", "CN"], ["Liu Yang", "CN"],
  ["Kim Ji-hoon", "KR"], ["Park Sung-min", "KR"], ["Sato Kenji", "JP"], ["Somchai P.", "TH"],
  ["John Mitchell", "AU"], ["Alexei Ivanov", "RU"], ["Bùi Thị Lan", "VN"], ["Ngô Đình Phúc", "VN"],
];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function rng(seed: number) {
  let x = seed || 1;
  return () => {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    return ((x >>> 0) % 1_000_000) / 1_000_000;
  };
}

interface Clock {
  levelIndex: number; // 0-based，-1 表示未开赛
  onBreak: boolean;
  secondsLeft: number;
  /** 每个已开始级别的开始时间 */
  levelStarts: number[];
}

function clock(t: Tournament, structure: BlindLevel[], now: number): Clock {
  const start = new Date(t.startTime).getTime();
  if (now < start) return { levelIndex: -1, onBreak: false, secondsLeft: Math.round((start - now) / 1000), levelStarts: [] };
  let cursor = start;
  const levelStarts: number[] = [];
  for (let i = 0; i < structure.length; i++) {
    levelStarts.push(cursor);
    const levelEnd = cursor + t.levelMinutes * 60_000;
    if (now < levelEnd) return { levelIndex: i, onBreak: false, secondsLeft: Math.round((levelEnd - now) / 1000), levelStarts };
    const brk = structure[i].breakAfter ?? 0;
    const breakEnd = levelEnd + brk * 60_000;
    if (now < breakEnd) return { levelIndex: i, onBreak: true, secondsLeft: Math.round((breakEnd - now) / 1000), levelStarts };
    cursor = breakEnd;
  }
  return { levelIndex: structure.length - 1, onBreak: false, secondsLeft: 0, levelStarts };
}

/** 已进行的级别数（含小数），用于平滑计算人数 */
function progress(c: Clock, t: Tournament): number {
  if (c.levelIndex < 0) return 0;
  const done = c.onBreak ? 1 : 1 - c.secondsLeft / (t.levelMinutes * 60);
  return c.levelIndex + done;
}

export function getLiveSnapshot(t: Tournament, now: number = Date.now()): LiveSnapshot {
  const structure = STANDARD_STRUCTURE;
  const c = clock(t, structure, now);
  const p = progress(c, t);
  const isDay1 = t.flight?.startsWith("Day 1") ?? false;
  const isDay2 = t.flight === "Day 2";
  // Day 1 打到报名截止后 +2 级别封袋；常规赛约在截止后 14 个级别内结束
  const endAt = isDay1 ? t.lateRegLevel + 2 : t.lateRegLevel + 14;

  const base: LiveSnapshot = {
    tournamentId: t.id,
    status: "upcoming",
    updatedAt: new Date(now).toISOString(),
    level: null,
    nextLevel: structure[0],
    secondsLeftInLevel: c.secondsLeft,
    entries: 0,
    playersLeft: 0,
    prizePool: t.guarantee,
    avgStack: t.startingStack,
    registrationOpen: false,
    chipLeaders: [],
    feed: [],
  };

  // 未开赛：开赛前 3 小时开放预报名
  if (c.levelIndex < 0) {
    const open = c.secondsLeft <= 3 * 3600 && !isDay2;
    const pre = open ? Math.round(t.expectedEntries * 0.35 * (1 - c.secondsLeft / (3 * 3600))) : 0;
    return { ...base, status: open ? "registering" : "upcoming", registrationOpen: open, entries: pre, playersLeft: pre };
  }

  const regFraction = t.lateRegLevel > 0 ? Math.min(1, p / t.lateRegLevel) : 1;
  const entries = isDay2 ? t.expectedEntries : Math.max(1, Math.round(t.expectedEntries * (0.45 + 0.55 * Math.sqrt(regFraction))));
  const pastReg = Math.max(0, p - t.lateRegLevel);
  const finished = t.status === "finished" || p >= endAt;

  let playersLeft: number;
  if (isDay1) {
    playersLeft = Math.max(2, Math.round(entries * (0.85 - 0.25 * Math.min(1, pastReg / 2))));
  } else {
    const startLeft = isDay2 ? 0.45 : 0.82;
    const frac = Math.min(1, pastReg / (endAt - t.lateRegLevel));
    playersLeft = Math.max(1, Math.round(entries * startLeft * Math.pow(1 - frac, 2.2)));
    if (!isDay2 && p < t.lateRegLevel) playersLeft = Math.round(entries * (1 - 0.18 * regFraction));
    if (isDay2) playersLeft = Math.max(1, Math.round(entries * 0.45 * Math.pow(1 - Math.min(1, p / 14), 2.2)));
  }
  if (finished && !isDay1) playersLeft = 1;

  const totalChips = entries * t.startingStack;
  const prizePool = Math.max(t.guarantee, entries * t.buyIn);
  const lvl = structure[Math.min(c.levelIndex, structure.length - 1)];

  // 筹码榜：以 id + 级别为种子，保证同一时刻刷新结果一致
  const r = rng(hash(`${t.id}:${c.levelIndex}`));
  const avg = totalChips / Math.max(1, playersLeft);
  const leaders = [...NAMES]
    .sort(() => r() - 0.5)
    .slice(0, Math.min(10, playersLeft))
    .map(([player, country]) => ({ player, country, chips: Math.round((avg * (1.2 + r() * 2.8)) / 100) * 100 }))
    .sort((a, b) => b.chips - a.chips);

  // 动态播报
  const feed: { time: string; text: string }[] = [];
  c.levelStarts.forEach((ts, i) => {
    const L = structure[i];
    feed.push({ time: new Date(ts).toISOString(), text: `Level ${L.level} 开始 —— 盲注 ${formatChips(L.sb)}/${formatChips(L.bb)}${L.ante ? `，BB ante ${formatChips(L.ante)}` : ""}` });
    if (t.lateRegLevel > 0 && L.level === t.lateRegLevel + 1) {
      feed.push({ time: new Date(ts).toISOString(), text: `报名截止，共 ${entries} 人次参赛，奖池 ${formatVND(prizePool)}` });
    }
  });
  const paid = paidPlaces(payoutStructure(entries));
  if (!isDay1 && playersLeft <= paid && c.levelStarts.length) {
    feed.push({ time: new Date(c.levelStarts[c.levelStarts.length - 1]).toISOString(), text: `进入钱圈！剩余 ${playersLeft} 人，前 ${paid} 名获得奖励` });
  }
  if (finished) {
    feed.push({
      time: new Date(now).toISOString(),
      text: isDay1 ? `${t.flight} 结束封袋，${playersLeft} 人晋级 Day 2` : `比赛结束，冠军：${leaders[0]?.player ?? "-"}`,
    });
  }
  feed.reverse();

  return {
    ...base,
    status: finished ? "finished" : c.onBreak ? "break" : "live",
    level: finished ? null : lvl,
    nextLevel: finished ? null : structure[c.levelIndex + 1] ?? null,
    secondsLeftInLevel: finished ? 0 : c.secondsLeft,
    entries,
    playersLeft,
    prizePool,
    avgStack: Math.round(avg),
    registrationOpen: !finished && !isDay2 && (t.lateRegLevel === 0 ? false : lvl.level <= t.lateRegLevel),
    chipLeaders: finished && !isDay1 ? leaders.slice(0, 1) : leaders,
    feed: feed.slice(0, 30),
  };
}
