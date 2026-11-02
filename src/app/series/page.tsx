import Link from "next/link";
import { compactVND, formatDate } from "@/lib/format";
import { listClubs, listSeries } from "@/lib/repo";

export const dynamic = "force-dynamic";
export const metadata = { title: "系列赛" };

export default async function SeriesList() {
  const [series, clubs] = await Promise.all([listSeries(), listClubs()]);
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">系列赛</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {series.map((s) => (
          <Link key={s.slug} href={`/series/${s.slug}`} className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 hover:border-amber-400">
            <div className="text-xs text-amber-300">{formatDate(s.startDate)} – {formatDate(s.endDate)} · {clubs.find((c) => c.slug === s.clubSlug)?.name}</div>
            <div className="mt-1 text-lg font-semibold">{s.name}</div>
            <div className="mt-1 text-sm text-slate-400">{s.description}</div>
            <div className="mt-3 text-sm">总保底 <b className="text-chip-gold">{compactVND(s.totalGuarantee)} ₫</b></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
