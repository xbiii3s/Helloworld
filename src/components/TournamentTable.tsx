import Link from "next/link";
import { compactVND, formatRange, formatVND } from "@/lib/format";
import type { TournamentWithStatus } from "@/lib/repo";
import type { Club, Series } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

const TBD = <span className="text-slate-500">待确认</span>;

export function TournamentTable({ tournaments, clubs, series, showClub = true }: {
  tournaments: TournamentWithStatus[]; clubs: Club[]; series?: Series[]; showClub?: boolean;
}) {
  if (!tournaments.length) return <p className="py-6 text-center text-sm text-slate-400">暂无比赛数据</p>;
  const clubName = (slug: string) => clubs.find((c) => c.slug === slug)?.name ?? slug;
  const seriesName = (slug?: string) => series?.find((s) => s.slug === slug)?.name;
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[680px] text-sm">
        <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-3 py-2">日期</th>
            <th className="px-3 py-2">赛事</th>
            {showClub && <th className="px-3 py-2">俱乐部 / 主办</th>}
            <th className="px-3 py-2 text-right">买入</th>
            <th className="px-3 py-2 text-right">保底</th>
            <th className="px-3 py-2">状态</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {tournaments.map((t) => (
            <tr key={t.id} className="hover:bg-white/5">
              <td className="whitespace-nowrap px-3 py-2 text-slate-300">{formatRange(t.startDate, t.endDate)}</td>
              <td className="px-3 py-2">
                <Link href={`/tournaments/${t.id}`} className="font-medium text-white hover:text-chip-gold">
                  {t.eventNo ? <span className="mr-1 text-slate-400">#{t.eventNo}</span> : null}{t.name}
                </Link>
                {seriesName(t.seriesSlug) && <div className="text-xs text-slate-500">{seriesName(t.seriesSlug)}</div>}
              </td>
              {showClub && <td className="px-3 py-2 text-slate-300">{clubName(t.clubSlug)}</td>}
              <td className="whitespace-nowrap px-3 py-2 text-right" title={t.buyIn ? formatVND(t.buyIn) : undefined}>
                {t.buyIn ? compactVND(t.buyIn) : TBD}
              </td>
              <td className="whitespace-nowrap px-3 py-2 text-right font-semibold text-chip-gold">{t.guarantee ? compactVND(t.guarantee) : TBD}</td>
              <td className="px-3 py-2"><StatusBadge status={t.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
