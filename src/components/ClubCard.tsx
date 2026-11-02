import Link from "next/link";
import type { Club } from "@/lib/types";

export function ClubCard({ club, count, live }: { club: Club; count: number; live: number }) {
  return (
    <Link href={`/clubs/${club.slug}`} className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/30">
      <div className="h-2" style={{ background: club.color }} />
      <div className="p-4">
        <div className="text-xs text-slate-400">{club.city}</div>
        <div className="text-lg font-semibold group-hover:text-chip-gold">{club.name}</div>
        <div className="text-xs text-slate-500">{club.localName}</div>
        <div className="mt-3 flex gap-3 text-xs text-slate-300">
          <span>{count} 场比赛</span>
          {live > 0 && <span className="text-red-300">● {live} 场进行中</span>}
        </div>
      </div>
    </Link>
  );
}
