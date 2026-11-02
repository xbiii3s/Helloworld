import Link from "next/link";
import { compactVND, formatRange } from "@/lib/format";
import type { SeriesWithStatus } from "@/lib/repo";
import type { Club } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

export function SeriesCard({ s, club }: { s: SeriesWithStatus; club?: Club }) {
  return (
    <Link href={`/series/${s.slug}`} className="block rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 hover:border-amber-400">
      <div className="flex items-center justify-between gap-2 text-xs text-amber-300">
        <span>{formatRange(s.startDate, s.endDate)}</span>
        <StatusBadge status={s.status} />
      </div>
      <div className="mt-1 text-lg font-semibold">{s.name}</div>
      <div className="text-xs text-slate-400">{club?.name} · {s.venue}</div>
      <div className="mt-3 text-sm">
        总保底 <b className="text-chip-gold">{s.totalGuarantee ? `${compactVND(s.totalGuarantee)} ₫` : "待公布"}</b>
        {s.eventCount && <span className="ml-3 text-slate-400">{s.eventCount} 场赛事</span>}
      </div>
    </Link>
  );
}
