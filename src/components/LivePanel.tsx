"use client";

import { useEffect, useState } from "react";
import { formatChips, formatVND } from "@/lib/format";
import type { LiveSnapshot } from "@/lib/types";

/**
 * 实况面板：只展示真实录入的快照，每 30 秒刷新。
 * 没有数据时显示“未接入”，不生成任何模拟数据。
 */
export function LivePanel({ id, initial, running }: { id: string; initial?: LiveSnapshot; running: boolean }) {
  const [snap, setSnap] = useState(initial);

  useEffect(() => {
    if (!running) return;
    const load = async () => {
      try {
        const res = await fetch(`/api/tournaments/${id}/live`, { cache: "no-store" });
        if (res.ok) setSnap(await res.json());
      } catch { /* 保留旧数据 */ }
    };
    const t = setInterval(load, 30_000);
    return () => clearInterval(t);
  }, [id, running]);

  if (!snap) {
    return (
      <section className="rounded-2xl border border-dashed border-white/15 p-5 text-sm text-slate-400">
        <h2 className="mb-1 text-lg font-semibold text-slate-200">比赛实况</h2>
        {running
          ? "比赛正在进行，但实况数据尚未接入（需俱乐部录入或对接计时系统）。请先关注主办方的 Facebook 获取实时消息。"
          : "比赛进行时，这里会显示级别、盲注、剩余人数、平均筹码、筹码榜和播报。"}
      </section>
    );
  }

  const stat = (label: string, value?: string) => (
    <div className="rounded-xl bg-black/25 p-3">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="text-xl font-bold tabular-nums">{value ?? "—"}</div>
    </div>
  );

  return (
    <section className="rounded-2xl border border-white/10 bg-felt-900/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">比赛实况</h2>
        <span className="text-xs text-slate-400">更新于 {new Date(snap.updatedAt).toLocaleString("zh-CN", { timeZone: "Asia/Ho_Chi_Minh", hour12: false })}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        {stat("级别 / 盲注", snap.level ? `L${snap.level} ${snap.blinds ?? ""}` : snap.blinds)}
        {stat("剩余 / 总人次", snap.playersLeft != null ? `${snap.playersLeft} / ${snap.entries ?? "?"}` : undefined)}
        {stat("平均筹码", snap.avgStack != null ? formatChips(snap.avgStack) : undefined)}
        {stat("奖池", snap.prizePool != null ? formatVND(snap.prizePool) : undefined)}
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {snap.chipLeaders?.length ? (
          <ol className="space-y-1 text-sm">
            {snap.chipLeaders.map((c, i) => (
              <li key={c.player} className="flex justify-between rounded bg-white/5 px-3 py-1.5">
                <span><span className="mr-2 text-slate-500">{i + 1}.</span>{c.player}</span>
                <span className="font-mono">{formatChips(c.chips)}</span>
              </li>
            ))}
          </ol>
        ) : null}
        {snap.feed?.length ? (
          <ul className="max-h-72 space-y-1 overflow-y-auto text-sm">
            {snap.feed.map((f, i) => (
              <li key={i} className="border-l-2 border-felt-500 pl-3"><span className="mr-2 text-xs text-slate-500">{f.time}</span>{f.text}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
