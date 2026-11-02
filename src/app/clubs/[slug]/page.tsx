import Link from "next/link";
import { notFound } from "next/navigation";
import { TournamentTable } from "@/components/TournamentTable";
import { compactVND, formatDate } from "@/lib/format";
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
  const [clubs, series, ts] = await Promise.all([listClubs(), listSeries(slug), listTournaments({ clubSlug: slug })]);
  const active = ts.filter((t) => ["live", "break", "registering"].includes(t.liveStatus));
  const upcoming = ts.filter((t) => t.liveStatus === "upcoming" && !t.seriesSlug);
  const finished = ts.filter((t) => t.liveStatus === "finished").reverse();

  return (
    <div className="space-y-8">
      <header className="overflow-hidden rounded-3xl border border-white/10">
        <div className="h-3" style={{ background: club.color }} />
        <div className="p-6">
          <div className="text-sm text-slate-400">{club.city} · {club.address}</div>
          <h1 className="text-3xl font-bold">{club.name}</h1>
          <div className="text-slate-400">{club.localName}</div>
          <p className="mt-3 max-w-3xl text-slate-200">{club.description}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-300">
            {club.contact.phone && <span>☎ {club.contact.phone}</span>}
            {club.contact.zalo && <span>Zalo: {club.contact.zalo}</span>}
            {club.contact.telegram && <span>Telegram: {club.contact.telegram}</span>}
            {club.contact.facebook && <span>Facebook: {club.contact.facebook}</span>}
          </div>
        </div>
      </header>

      {series.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-semibold">系列赛</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {series.map((s) => (
              <Link key={s.slug} href={`/series/${s.slug}`} className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 hover:border-amber-400">
                <div className="text-xs text-amber-300">{formatDate(s.startDate)} – {formatDate(s.endDate)}</div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-sm">总保底 <b className="text-chip-gold">{compactVND(s.totalGuarantee)} ₫</b></div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-xl font-semibold">进行中 / 报名中</h2>
        <TournamentTable tournaments={active} clubs={clubs} showClub={false} />
      </section>
      <section>
        <h2 className="mb-3 text-xl font-semibold">常规赛赛程</h2>
        <TournamentTable tournaments={upcoming} clubs={clubs} showClub={false} />
      </section>
      <section>
        <h2 className="mb-3 text-xl font-semibold">已结束</h2>
        <TournamentTable tournaments={finished} clubs={clubs} showClub={false} />
      </section>
    </div>
  );
}
