import Link from "next/link";
import { notFound } from "next/navigation";
import { TournamentTable } from "@/components/TournamentTable";
import { formatDate, formatVND } from "@/lib/format";
import { getClub, getSeries, listClubs, listTournaments } from "@/lib/repo";

export const dynamic = "force-dynamic";

type P = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: P }) {
  const s = await getSeries((await params).slug);
  return { title: s?.name ?? "系列赛" };
}

/** 系列赛独立页面：概览、完整赛程、各赛事冠军。 */
export default async function SeriesPage({ params }: { params: P }) {
  const { slug } = await params;
  const s = await getSeries(slug);
  if (!s) notFound();
  const [club, clubs, events] = await Promise.all([getClub(s.clubSlug), listClubs(), listTournaments({ seriesSlug: slug })]);
  const champions = events.filter((e) => e.results?.length);

  return (
    <div className="space-y-8">
      <header className="rounded-3xl bg-gradient-to-br from-amber-700/60 via-felt-900 to-felt-900 p-8">
        <div className="text-sm text-amber-200">
          {formatDate(s.startDate)} – {formatDate(s.endDate)} · {club && <Link href={`/clubs/${club.slug}`} className="underline">{club.name}</Link>}
        </div>
        <h1 className="mt-1 text-3xl font-bold">{s.name}</h1>
        <p className="mt-2 max-w-2xl text-slate-200">{s.description}</p>
        <div className="mt-4 text-lg">系列赛总保底 <b className="text-chip-gold">{formatVND(s.totalGuarantee)}</b></div>
        <ul className="mt-3 flex flex-wrap gap-2 text-xs">
          {s.highlights.map((h) => <li key={h} className="rounded-full bg-black/30 px-3 py-1">{h}</li>)}
        </ul>
      </header>

      <section>
        <h2 className="mb-3 text-xl font-semibold">系列赛赛程（{events.length} 场）</h2>
        <TournamentTable tournaments={events} clubs={clubs} showClub={false} />
      </section>

      {champions.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-semibold">🏆 冠军榜</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {champions.map((e) => (
              <Link key={e.id} href={`/tournaments/${e.id}`} className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30">
                <div className="text-xs text-slate-400">#{e.eventNo} {e.name}</div>
                <div className="font-semibold">{e.results![0].player} <span className="text-xs text-slate-400">{e.results![0].country}</span></div>
                <div className="text-sm text-chip-gold">{formatVND(e.results![0].prize)}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
