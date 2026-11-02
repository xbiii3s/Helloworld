import { SeriesCard } from "@/components/SeriesCard";
import { listClubs, listSeries } from "@/lib/repo";

export const dynamic = "force-dynamic";
export const metadata = { title: "系列赛" };

export default async function SeriesList() {
  const [series, clubs] = await Promise.all([listSeries(), listClubs()]);
  const groups = [
    { title: "进行中", list: series.filter((s) => s.status === "running") },
    { title: "即将开始", list: series.filter((s) => s.status === "upcoming") },
    { title: "2026 年已结束", list: series.filter((s) => s.status === "finished").reverse() },
  ];
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">系列赛</h1>
      {groups.filter((g) => g.list.length).map((g) => (
        <section key={g.title}>
          <h2 className="mb-3 text-lg font-semibold text-slate-300">{g.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {g.list.map((s) => <SeriesCard key={s.slug} s={s} club={clubs.find((c) => c.slug === s.clubSlug)} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
