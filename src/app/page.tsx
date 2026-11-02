import Link from "next/link";
import { ClubCard } from "@/components/ClubCard";
import { SeriesCard } from "@/components/SeriesCard";
import { listClubs, listSeries } from "@/lib/repo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [clubs, series] = await Promise.all([listClubs(), listSeries()]);
  const running = series.filter((s) => s.status === "running");
  const upcoming = series.filter((s) => s.status === "upcoming");
  const finished = series.filter((s) => s.status === "finished").reverse().slice(0, 4);
  const byCity = (city: string) => clubs.filter((c) => c.city === city);

  const clubGrid = (list: typeof clubs) => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((c) => {
        const cs = series.filter((s) => s.clubSlug === c.slug);
        return <ClubCard key={c.slug} club={c} seriesCount={cs.length} running={cs.filter((s) => s.status === "running").length} />;
      })}
    </div>
  );

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-felt-700 to-felt-900 p-8">
        <h1 className="text-3xl font-bold">越南德州扑克赛事中心</h1>
        <p className="mt-2 max-w-2xl text-slate-200">汇总河内、胡志明市等地真实俱乐部的系列赛、赛程、买入与保底。每条数据都附来源链接。</p>
        <div className="mt-5 flex gap-6 text-sm">
          <div><div className="text-2xl font-bold">{clubs.length}</div><div className="text-slate-300">俱乐部 / 主办方</div></div>
          <div><div className="text-2xl font-bold">{series.length}</div><div className="text-slate-300">2026 系列赛</div></div>
          <div><div className="text-2xl font-bold text-red-300">{running.length}</div><div className="text-slate-300">进行中</div></div>
        </div>
      </section>

      {running.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-semibold">🔴 正在进行的系列赛</h2>
          <div className="grid gap-4 md:grid-cols-2">{running.map((s) => <SeriesCard key={s.slug} s={s} club={clubs.find((c) => c.slug === s.clubSlug)} />)}</div>
        </section>
      )}

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-xl font-semibold">即将开始</h2>
          <Link href="/schedule" className="text-sm text-slate-400 hover:text-white">完整赛程 →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">{upcoming.map((s) => <SeriesCard key={s.slug} s={s} club={clubs.find((c) => c.slug === s.clubSlug)} />)}</div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">河内</h2>
        {clubGrid(byCity("河内"))}
      </section>
      <section>
        <h2 className="mb-3 text-xl font-semibold">胡志明市</h2>
        {clubGrid(byCity("胡志明市"))}
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-xl font-semibold">最近结束</h2>
          <Link href="/series" className="text-sm text-slate-400 hover:text-white">全部系列赛 →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">{finished.map((s) => <SeriesCard key={s.slug} s={s} club={clubs.find((c) => c.slug === s.clubSlug)} />)}</div>
      </section>
    </div>
  );
}
