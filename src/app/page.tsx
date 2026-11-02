import Link from "next/link";
import { ClubCard } from "@/components/ClubCard";
import { TournamentTable } from "@/components/TournamentTable";
import { compactVND, formatDate } from "@/lib/format";
import { listClubs, listSeries, listTournaments } from "@/lib/repo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [clubs, series, all] = await Promise.all([listClubs(), listSeries(), listTournaments()]);
  const active = all.filter((t) => ["live", "break"].includes(t.liveStatus));
  const upcoming = all.filter((t) => ["upcoming", "registering"].includes(t.liveStatus)).slice(0, 8);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-felt-700 to-felt-900 p-8">
        <h1 className="text-3xl font-bold">越南德州扑克赛事中心</h1>
        <p className="mt-2 max-w-2xl text-slate-200">一站查看胡志明市、河内、岘港等地俱乐部的赛程、买入、奖励结构，以及正在进行的比赛实况。</p>
        <div className="mt-5 flex gap-6 text-sm">
          <div><div className="text-2xl font-bold">{clubs.length}</div><div className="text-slate-300">俱乐部</div></div>
          <div><div className="text-2xl font-bold">{series.length}</div><div className="text-slate-300">系列赛</div></div>
          <div><div className="text-2xl font-bold text-red-300">{active.length}</div><div className="text-slate-300">进行中</div></div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">🔴 正在进行</h2>
        <TournamentTable tournaments={active} clubs={clubs} />
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-xl font-semibold">系列赛</h2>
          <Link href="/series" className="text-sm text-slate-400 hover:text-white">全部 →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {series.map((s) => (
            <Link key={s.slug} href={`/series/${s.slug}`} className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 hover:border-amber-400">
              <div className="text-xs text-amber-300">{formatDate(s.startDate)} – {formatDate(s.endDate)}</div>
              <div className="mt-1 text-lg font-semibold">{s.name}</div>
              <div className="mt-1 text-sm text-slate-400">{s.description}</div>
              <div className="mt-3 text-sm">总保底 <b className="text-chip-gold">{compactVND(s.totalGuarantee)} ₫</b></div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-xl font-semibold">即将开始</h2>
          <Link href="/schedule" className="text-sm text-slate-400 hover:text-white">完整赛程 →</Link>
        </div>
        <TournamentTable tournaments={upcoming} clubs={clubs} />
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">俱乐部</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((c) => {
            const ts = all.filter((t) => t.clubSlug === c.slug);
            return <ClubCard key={c.slug} club={c} count={ts.length} live={ts.filter((t) => ["live", "break"].includes(t.liveStatus)).length} />;
          })}
        </div>
      </section>
    </div>
  );
}
