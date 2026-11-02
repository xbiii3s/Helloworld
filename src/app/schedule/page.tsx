import Link from "next/link";
import { TournamentTable } from "@/components/TournamentTable";
import { listClubs, listSeries, listTournaments } from "@/lib/repo";
import type { Status } from "@/lib/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "赛程" };

type SP = Promise<{ club?: string; status?: Status }>;

export default async function SchedulePage({ searchParams }: { searchParams: SP }) {
  const { club, status } = await searchParams;
  const [clubs, series, raw] = await Promise.all([listClubs(), listSeries(), listTournaments({ clubSlug: club, status })]);
  // 进行中 → 即将开始（按日期升序）→ 已结束（最近的在前）
  const rank = { running: 0, upcoming: 1, finished: 2 } as const;
  const list = [...raw].sort((a, b) =>
    rank[a.status] - rank[b.status] ||
    (a.status === "finished" ? b.startDate.localeCompare(a.startDate) : a.startDate.localeCompare(b.startDate)));

  const q = (patch: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    Object.entries({ club, status, ...patch }).forEach(([k, v]) => v && p.set(k, v));
    const s = p.toString();
    return s ? `/schedule?${s}` : "/schedule";
  };
  const chip = (on: boolean) => `rounded-full px-3 py-1 text-xs ${on ? "bg-white text-black" : "bg-white/10 text-slate-300 hover:bg-white/20"}`;
  const withEvents = clubs.filter((c) => series.some((s) => s.clubSlug === c.slug));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">赛程</h1>
        <p className="mt-1 text-sm text-slate-400">目前收录各系列赛中已查到买入/保底的重点赛事。每日常规赛需俱乐部提供后补充。</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href={q({ club: undefined })} className={chip(!club)}>全部</Link>
        {withEvents.map((c) => <Link key={c.slug} href={q({ club: c.slug })} className={chip(club === c.slug)}>{c.name}</Link>)}
      </div>
      <div className="flex flex-wrap gap-2">
        {([undefined, "running", "upcoming", "finished"] as const).map((s) => (
          <Link key={s ?? "all"} href={q({ status: s })} className={chip(status === s)}>
            {{ all: "全部状态", running: "进行中", upcoming: "即将开始", finished: "已结束" }[s ?? "all"]}
          </Link>
        ))}
      </div>
      <TournamentTable tournaments={list} clubs={clubs} series={series} showClub={!club} />
    </div>
  );
}
