import { ClubCard } from "@/components/ClubCard";
import { listClubs, listSeries } from "@/lib/repo";

export const dynamic = "force-dynamic";
export const metadata = { title: "俱乐部" };

export default async function ClubsPage() {
  const [clubs, series] = await Promise.all([listClubs(), listSeries()]);
  const cities = [...new Set(clubs.map((c) => c.city))];
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">俱乐部与主办方</h1>
      {cities.map((city) => (
        <section key={city}>
          <h2 className="mb-3 text-lg font-semibold text-slate-300">{city}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.filter((c) => c.city === city).map((c) => {
              const cs = series.filter((s) => s.clubSlug === c.slug);
              return <ClubCard key={c.slug} club={c} seriesCount={cs.length} running={cs.filter((s) => s.status === "running").length} />;
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
