"use client";

import { useEffect, useState } from "react";
import { formatChips, formatVND } from "@/lib/format";
import type { LiveSnapshot } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

function mmss(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

/** 实况面板：每 15 秒拉取一次快照，本地每秒倒计时。 */
export function LivePanel({ id, initial }: { id: string; initial: LiveSnapshot }) {
  const [snap, setSnap] = useState(initial);
  const [left, setLeft] = useState(initial.secondsLeftInLevel);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(`/api/tournaments/${id}/live`, { cache: "no-store" });
        if (!res.ok) return;
        const s: LiveSnapshot = await res.json();
        if (alive) { setSnap(s); setLeft(s.secondsLeftInLevel); }
      } catch { /* 网络错误时保留旧数据 */ }
    };
    const poll = setInterval(load, 15_000);
    const tick = setInterval(() => setLeft((x) => Math.max(0, x - 1)), 1000);
    return () => { alive = false; clearInterval(poll); clearInterval(tick); };
  }, [id]);

  const pre = snap.status === "upcoming" || snap.status === "registering";

  return (
    <section className="rounded-2xl border border-white/10 bg-felt-900/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">比赛实况</h2>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <StatusBadge status={snap.status} />
          <span>更新于 {new Date(snap.updatedAt).toLocaleTimeString("zh-CN", { timeZone: "Asia/Ho_Chi_Minh", hour12: false })}</span>
        </div>
      </div>

      {pre ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="距离开赛" value={mmss(left)} big />
          <Stat label="已报名" value={snap.registrationOpen ? `${snap.entries} 人` : "未开放"} />
          <Stat label="保底奖池" value={formatVND(snap.prizePool)} />
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-4">
            <Stat
              label={snap.status === "break" ? "休息剩余" : snap.level ? `Level ${snap.level.level}` : "级别"}
              value={snap.status === "finished" ? "—" : mmss(left)}
              big
            />
            <Stat
              label="当前盲注"
              value={snap.level ? `${formatChips(snap.level.sb)}/${formatChips(snap.level.bb)}` : "—"}
              sub={snap.level?.ante ? `BB ante ${formatChips(snap.level.ante)}` : undefined}
            />
            <Stat label="剩余 / 总人次" value={`${snap.playersLeft} / ${snap.entries}`} sub={snap.registrationOpen ? "仍可报名" : "报名已截止"} />
            <Stat label="平均筹码" value={formatChips(snap.avgStack)} sub={snap.level ? `${(snap.avgStack / snap.level.bb).toFixed(0)} BB` : undefined} />
          </div>
          <div className="mt-3 rounded-lg bg-black/20 px-4 py-2 text-sm">
            奖池：<b className="text-chip-gold">{formatVND(snap.prizePool)}</b>
            {snap.nextLevel && <span className="ml-4 text-slate-400">下一级别 {formatChips(snap.nextLevel.sb)}/{formatChips(snap.nextLevel.bb)}</span>}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-300">筹码榜</h3>
              <ol className="space-y-1 text-sm">
                {snap.chipLeaders.map((c, i) => (
                  <li key={c.player} className="flex justify-between rounded bg-white/5 px-3 py-1.5">
                    <span><span className="mr-2 text-slate-500">{i + 1}.</span>{c.player} <span className="text-xs text-slate-500">{c.country}</span></span>
                    <span className="font-mono">{formatChips(c.chips)}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-300">实时播报</h3>
              <ul className="max-h-72 space-y-1 overflow-y-auto text-sm">
                {snap.feed.map((f, i) => (
                  <li key={i} className="border-l-2 border-felt-500 pl-3">
                    <span className="mr-2 text-xs text-slate-500">
                      {new Date(f.time).toLocaleTimeString("zh-CN", { timeZone: "Asia/Ho_Chi_Minh", hour: "2-digit", minute: "2-digit", hour12: false })}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function Stat({ label, value, sub, big }: { label: string; value: string; sub?: string; big?: boolean }) {
  return (
    <div className="rounded-xl bg-black/25 p-3">
      <div className="text-xs text-slate-400">{label}</div>
      <div className={`${big ? "text-3xl" : "text-xl"} font-bold tabular-nums`}>{value}</div>
      {sub && <div className="text-xs text-slate-500">{sub}</div>}
    </div>
  );
}
