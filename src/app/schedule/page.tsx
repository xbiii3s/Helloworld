import Link from "next/link";
import { TournamentTable } from "@/components/TournamentTable";
import { dayKey } from "@/lib/format";
import { listClubs, listTournaments } from "@/lib/repo";

export const dynamic = "force-dynamic";
export const metadata = { title: "赛程" };

type SP = Promise<{ club?: string; game?: string }>;

export default async function SchedulePage({ searchParams }: { searchParams: SP }) {
  const { club, game } = await searchParams;
  const [clubs, list] = await Promise.all([listClubs(), listTournaments({ clubSlug: club, gameType: game })]);

  const groups = new Map<string, typeof list>();
  for (const t of list) {
    const k = dayKey(t.startTime);
    groups.set(k, [...(groups.get(k) ?? []), t]);
  }

  const q = (patch: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const merged = { club, game, ...patch };
    Object.entries(merged).forEach(([k, v]) => v && p.set(k, v));
    const s = p.toString();
    return s ? `/schedule?${s}` : "/schedule";
  };
  const chip = (active: boolean) => `rounded-full px-3 py-1 text-xs ${active ? "bg-white text-black" : "bg-white/10 text-slate-300 hover:bg-white/20"}`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">完整赛程</h1>
      <div className="flex flex-wrap gap-2">
        <Link href={q({ club: undefined })} className={chip(!club)}>全部俱乐部</Link>
        {clubs.map((c) => <Link key={c.slug} href={q({ club: c.slug })} className={chip(club === c.slug)}>{c.name}</Link>)}
      </div>
      <div className="flex flex-wrap gap-2">
        {[undefined, "NLH", "PLO"].map((g) => <Link key={g ?? "all"} href={q({ game: g })} className={chip(game === g)}>{g ?? "全部玩法"}</Link>)}
      </div>
      {[...groups.entries()].map(([day, ts]) => (
        <section key={day}>
          <h2 className="mb-2 text-sm font-semibold text-slate-400">{day}</h2>
          <TournamentTable tournaments={ts} clubs={clubs} showClub={!club} />
        </section>
      ))}
      {!groups.size && <p className="text-slate-400">没有符合条件的比赛</p>}
    </div>
  );
}
