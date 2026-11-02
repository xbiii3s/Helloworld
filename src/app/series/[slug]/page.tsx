import Link from "next/link";
import { notFound } from "next/navigation";
import { Sources } from "@/components/Sources";
import { StatusBadge } from "@/components/StatusBadge";
import { TournamentTable } from "@/components/TournamentTable";
import { formatRange, formatVND } from "@/lib/format";
import { getClub, getSeries, listClubs, listTournaments } from "@/lib/repo";

export const dynamic = "force-dynamic";

type P = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: P }) {
  const s = await getSeries((await params).slug);
  return { title: s?.name ?? "系列赛" };
}

/** 系列赛独立页面 */
export default async function SeriesPage({ params }: { params: P }) {
  const { slug } = await params;
  const s = await getSeries(slug);
  if (!s) notFound();
  const [club, clubs, events] = await Promise.all([getClub(s.clubSlug), listClubs(), listTournaments({ seriesSlug: slug })]);
  const champions = events.filter((e) => e.results?.length);

  return (
    <div className="space-y-8">
      <header className="space-y-3 rounded-3xl bg-gradient-to-br from-amber-700/60 via-felt-900 to-felt-900 p-8">
        <div className="flex flex-wrap items-center gap-3 text-sm text-amber-200">
          <span>{formatRange(s.startDate, s.endDate)}</span>
          <StatusBadge status={s.status} />
        </div>
        <h1 className="text-3xl font-bold">{s.name}</h1>
        <div className="text-sm text-slate-300">
          {club && <Link href={`/clubs/${club.slug}`} className="underline">{club.name}</Link>} · {s.venue}
        </div>
        <p className="max-w-2xl text-slate-200">{s.description}</p>
        <div className="text-lg">系列赛总保底 <b className="text-chip-gold">{s.totalGuarantee ? formatVND(s.totalGuarantee) : "待公布"}</b>
          {s.eventCount && <span className="ml-3 text-sm text-slate-300">共 {s.eventCount} 场赛事</span>}
        </div>
        <ul className="flex flex-wrap gap-2 text-xs">
          {s.highlights.map((h) => <li key={h} className="rounded-full bg-black/30 px-3 py-1">{h}</li>)}
        </ul>
      </header>

      <section>
        <h2 className="mb-1 text-xl font-semibold">赛事</h2>
        <p className="mb-3 text-xs text-slate-400">
          以下为已查到信息的重点赛事{s.eventCount ? `（全部 ${s.eventCount} 场的完整赛程请见主办方官方渠道）` : ""}。
        </p>
        <TournamentTable tournaments={events} clubs={clubs} showClub={false} />
      </section>

      {champions.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-semibold">🏆 冠军</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {champions.map((e) => (
              <Link key={e.id} href={`/tournaments/${e.id}`} className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30">
                <div className="text-xs text-slate-400">{e.eventNo ? `#${e.eventNo} ` : ""}{e.name}</div>
                <div className="font-semibold">{e.results![0].player}</div>
                {e.results![0].prize && <div className="text-sm text-chip-gold">{formatVND(e.results![0].prize)}</div>}
              </Link>
            ))}
          </div>
        </section>
      )}

      <Sources sources={s.sources} notes={s.notes} />
    </div>
  );
}
