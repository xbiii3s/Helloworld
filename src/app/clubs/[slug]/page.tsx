import { notFound } from "next/navigation";
import { SeriesCard } from "@/components/SeriesCard";
import { Sources } from "@/components/Sources";
import { TournamentTable } from "@/components/TournamentTable";
import { getClub, listClubs, listSeries, listTournaments } from "@/lib/repo";

export const dynamic = "force-dynamic";

type P = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: P }) {
  const club = await getClub((await params).slug);
  return { title: club?.name ?? "俱乐部" };
}

export default async function ClubPage({ params }: { params: P }) {
  const { slug } = await params;
  const club = await getClub(slug);
  if (!club) notFound();
  const [clubs, series, ts] = await Promise.all([listClubs(), listSeries({ clubSlug: slug }), listTournaments({ clubSlug: slug })]);
  const active = series.filter((s) => s.status !== "finished");
  const past = series.filter((s) => s.status === "finished").reverse();

  return (
    <div className="space-y-8">
      <header className="overflow-hidden rounded-3xl border border-white/10">
        <div className="h-3" style={{ background: club.color }} />
        <div className="space-y-3 p-6">
          <div className="text-sm text-slate-400">{club.city} · {club.kind === "club" ? "俱乐部" : "赛事主办方"}</div>
          <h1 className="text-3xl font-bold">{club.name}</h1>
          <p className="max-w-3xl text-slate-200">{club.description}</p>
          <dl className="grid gap-1 text-sm text-slate-300 sm:grid-cols-2">
            {club.address && <div>📍 {club.address}</div>}
            {club.phone && <div>☎ <a href={`tel:${club.phone.replace(/\s/g, "")}`} className="hover:text-white">{club.phone}</a></div>}
            {club.email && <div>✉ {club.email}</div>}
            {club.website && <div>🌐 <a href={club.website} target="_blank" rel="noopener noreferrer" className="underline">{club.website.replace("https://", "")}</a></div>}
            {club.facebook && <div>📘 <a href={club.facebook} target="_blank" rel="noopener noreferrer" className="underline">Facebook</a></div>}
          </dl>
          <Sources sources={club.sources} notes={club.warnings} />
        </div>
      </header>

      <section>
        <h2 className="mb-3 text-xl font-semibold">进行中 / 即将开始的系列赛</h2>
        {active.length ? <div className="grid gap-4 md:grid-cols-2">{active.map((s) => <SeriesCard key={s.slug} s={s} club={club} />)}</div>
          : <p className="text-sm text-slate-400">暂未查到即将举办的系列赛。</p>}
      </section>
      <section>
        <h2 className="mb-3 text-xl font-semibold">重点赛事</h2>
        <TournamentTable tournaments={ts} clubs={clubs} series={series} showClub={false} />
      </section>
      {past.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-semibold">2026 年已结束</h2>
          <div className="grid gap-4 md:grid-cols-2">{past.map((s) => <SeriesCard key={s.slug} s={s} club={club} />)}</div>
        </section>
      )}
    </div>
  );
}
