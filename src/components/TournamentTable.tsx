import Link from "next/link";
import { compactVND, formatDateTime, formatVND, reentryLabel } from "@/lib/format";
import type { TournamentWithStatus } from "@/lib/repo";
import type { Club } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

export function TournamentTable({ tournaments, clubs, showClub = true }: { tournaments: TournamentWithStatus[]; clubs: Club[]; showClub?: boolean }) {
  if (!tournaments.length) return <p className="py-6 text-center text-sm text-slate-400">暂无比赛</p>;
  const clubName = (slug: string) => clubs.find((c) => c.slug === slug)?.name ?? slug;
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[720px] text-sm">
        <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-3 py-2">时间</th>
            <th className="px-3 py-2">赛事</th>
            {showClub && <th className="px-3 py-2">俱乐部</th>}
            <th className="px-3 py-2 text-right">买入</th>
            <th className="px-3 py-2 text-right">保底</th>
            <th className="px-3 py-2">规则</th>
            <th className="px-3 py-2">状态</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {tournaments.map((t) => (
            <tr key={t.id} className="hover:bg-white/5">
              <td className="whitespace-nowrap px-3 py-2 text-slate-300">{formatDateTime(t.startTime)}</td>
              <td className="px-3 py-2">
                <Link href={`/tournaments/${t.id}`} className="font-medium text-white hover:text-chip-gold">
                  {t.eventNo ? <span className="mr-1 text-slate-400">#{t.eventNo}</span> : null}
                  {t.name}
                  {t.flight ? <span className="ml-1 text-amber-300">{t.flight}</span> : null}
                </Link>
                <div className="text-xs text-slate-500">{t.gameType} · 起始 {t.startingStack.toLocaleString()} 筹码 · 每级 {t.levelMinutes} 分钟</div>
              </td>
              {showClub && <td className="px-3 py-2 text-slate-300">{clubName(t.clubSlug)}</td>}
              <td className="whitespace-nowrap px-3 py-2 text-right text-slate-200" title={`${formatVND(t.buyIn)} + ${formatVND(t.fee)}`}>
                {compactVND(t.buyIn + t.fee)}
              </td>
              <td className="whitespace-nowrap px-3 py-2 text-right font-semibold text-chip-gold">{compactVND(t.guarantee)}</td>
              <td className="whitespace-nowrap px-3 py-2 text-xs text-slate-400">{reentryLabel(t.reentry)}</td>
              <td className="px-3 py-2"><StatusBadge status={t.liveStatus} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
