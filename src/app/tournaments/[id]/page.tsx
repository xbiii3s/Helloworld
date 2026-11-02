import Link from "next/link";
import { notFound } from "next/navigation";
import { LivePanel } from "@/components/LivePanel";
import { Sources } from "@/components/Sources";
import { StatusBadge } from "@/components/StatusBadge";
import { formatRange, formatVND } from "@/lib/format";
import { getClub, getLive, getSeries, getTournament } from "@/lib/repo";

export const dynamic = "force-dynamic";

type P = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: P }) {
  const t = await getTournament((await params).id);
  return { title: t?.name ?? "比赛" };
}

export default async function TournamentPage({ params }: { params: P }) {
  const { id } = await params;
  const t = await getTournament(id);
  if (!t) notFound();
  const [club, series, live] = await Promise.all([getClub(t.clubSlug), t.seriesSlug ? getSeries(t.seriesSlug) : undefined, getLive(t.id)]);

  const info = (label: string, value?: string, gold?: boolean) => (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-slate-400">{label}</div>
      <div className={`text-lg font-bold ${gold ? "text-chip-gold" : ""} ${value ? "" : "text-slate-500"}`}>{value ?? "待确认"}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      <nav className="text-sm text-slate-400">
        {club && <Link href={`/clubs/${club.slug}`} className="hover:text-white">{club.name}</Link>}
        {series && <> / <Link href={`/series/${series.slug}`} className="hover:text-white">{series.name}</Link></>}
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t.eventNo && <span className="mr-2 text-slate-400">#{t.eventNo}</span>}{t.name}</h1>
          <div className="mt-1 text-slate-300">{formatRange(t.startDate, t.endDate)}{t.startTime && ` ${t.startTime}`} · {t.gameType}{series && ` · ${series.venue}`}</div>
        </div>
        <StatusBadge status={t.status} />
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        {info("买入（含服务费）", t.buyIn ? formatVND(t.buyIn) : undefined)}
        {info("保底", t.guarantee ? formatVND(t.guarantee) : undefined, true)}
        {info("参赛人次", t.entries ? `${t.entries.toLocaleString()} 人次` : undefined)}
      </section>

      {t.results?.length ? (
        <section>
          <h2 className="mb-3 text-xl font-semibold">🏆 结果</h2>
          <table className="w-full max-w-xl text-sm">
            <tbody className="divide-y divide-white/5">
              {t.results.map((r) => (
                <tr key={r.place}>
                  <td className="py-2 pr-3 text-slate-400">{r.place}</td>
                  <td className="py-2">{r.player}</td>
                  <td className="py-2 text-right font-mono text-chip-gold">{r.prize ? formatVND(r.prize) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : t.status !== "finished" ? (
        <LivePanel id={t.id} initial={live} running={t.status === "running"} />
      ) : null}

      <Sources sources={t.sources} notes={t.notes} />
    </div>
  );
}
