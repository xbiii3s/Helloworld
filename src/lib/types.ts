/** 核心数据模型。现在由 mock 数据提供，后续可替换为数据库 / 后台 CMS。 */

export type GameType = "NLH" | "PLO" | "PLO5" | "Mixed";
export type TournamentStatus = "upcoming" | "registering" | "live" | "break" | "finished";

export interface Club {
  slug: string;
  name: string;
  /** 越南语 / 本地名称 */
  localName?: string;
  city: string;
  address: string;
  description: string;
  /** 品牌主色，用于俱乐部模块的配色 */
  color: string;
  contact: { phone?: string; zalo?: string; telegram?: string; facebook?: string };
}

export interface Series {
  slug: string;
  name: string;
  shortName: string;
  clubSlug: string;
  startDate: string; // ISO
  endDate: string; // ISO
  description: string;
  /** 系列赛总保底（VND） */
  totalGuarantee: number;
  highlights: string[];
}

export interface PayoutRule {
  /** 名次范围，例如 [1,1]、[10,12] */
  places: [number, number];
  /** 奖池百分比（每人） */
  percent: number;
}

export interface BlindLevel {
  level: number;
  sb: number;
  bb: number;
  ante: number;
  /** 该级别后是否休息（分钟） */
  breakAfter?: number;
}

export interface Tournament {
  id: string;
  clubSlug: string;
  seriesSlug?: string;
  /** 系列赛中的赛事编号，如 Event #5 */
  eventNo?: number;
  name: string;
  gameType: GameType;
  startTime: string; // ISO
  /** 进入奖池的买入（VND） */
  buyIn: number;
  /** 服务费（VND） */
  fee: number;
  guarantee: number;
  startingStack: number;
  levelMinutes: number;
  /** 截止报名的级别 */
  lateRegLevel: number;
  reentry: "freezeout" | "unlimited" | number;
  /** 多日赛的 Day 标识，如 "Day 1A" */
  flight?: string;
  status?: TournamentStatus;
  /** 已完成比赛的结果 */
  results?: { place: number; player: string; country?: string; prize: number }[];
  /** 预估或实际参赛人数（用于实况模拟） */
  expectedEntries: number;
  notes?: string;
}

export interface LiveSnapshot {
  tournamentId: string;
  status: TournamentStatus;
  updatedAt: string;
  level: BlindLevel | null;
  nextLevel: BlindLevel | null;
  /** 当前级别剩余秒数 */
  secondsLeftInLevel: number;
  entries: number;
  playersLeft: number;
  prizePool: number;
  avgStack: number;
  registrationOpen: boolean;
  chipLeaders: { player: string; country?: string; chips: number }[];
  feed: { time: string; text: string }[];
}
