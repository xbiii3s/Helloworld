import { ClubCard } from "@/components/ClubCard";
import { listClubs, listTournaments } from "@/lib/repo";

export const dynamic = "force-dynamic";
export const metadata = { title: "俱乐部" };

export default async function ClubsPage() {
  const [clubs, all] = await Promise.all([listClubs(), listTournaments()]);
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">俱乐部</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clubs.map((c) => {
          const ts = all.filter((t) => t.clubSlug === c.slug);
          return <ClubCard key={c.slug} club={c} count={ts.length} live={ts.filter((t) => ["live", "break"].includes(t.liveStatus)).length} />;
        })}
      </div>
    </div>
  );
}
