import Link from "next/link";
import type { Club } from "@/lib/types";

export function ClubCard({ club, seriesCount, running }: { club: Club; seriesCount: number; running: number }) {
  return (
    <Link href={`/clubs/${club.slug}`} className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/30">
      <div className="h-2" style={{ background: club.color }} />
      <div className="p-4">
        <div className="text-xs text-slate-400">{club.city} · {club.kind === "club" ? "俱乐部" : "赛事主办方"}</div>
        <div className="text-lg font-semibold group-hover:text-chip-gold">{club.name}</div>
        {club.address && <div className="mt-1 text-xs text-slate-500">{club.address}</div>}
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-300">
          <span>2026 年 {seriesCount} 个系列赛</span>
          {running > 0 && <span className="text-red-300">● 系列赛进行中</span>}
          {club.warnings?.length ? <span className="text-amber-300">⚠ 有注意事项</span> : null}
        </div>
      </div>
    </Link>
  );
}
