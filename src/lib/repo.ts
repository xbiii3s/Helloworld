import { clubs } from "./data/clubs";
import { buildSeed } from "./data/seed";
import { dayKey } from "./format";
import { getLiveSnapshot } from "./live";
import type { Club, Series, Tournament, TournamentStatus } from "./types";

/**
 * 数据访问层（Repository）。页面和 API 只通过这里取数据。
 * 将来换成数据库（如 PostgreSQL + Prisma）或 Headless CMS 时，只需要改这个文件。
 */

let cache: { day: string; series: Series[]; tournaments: Tournament[] } | null = null;

function seed() {
  const day = dayKey(new Date().toISOString());
  if (!cache || cache.day !== day) cache = { day, ...buildSeed(day) };
  return cache;
}

export type TournamentWithStatus = Tournament & { liveStatus: TournamentStatus };

function withStatus(t: Tournament): TournamentWithStatus {
  return { ...t, liveStatus: t.status === "finished" ? "finished" : getLiveSnapshot(t).status };
}

const byStart = (a: Tournament, b: Tournament) => +new Date(a.startTime) - +new Date(b.startTime);

export async function listClubs(): Promise<Club[]> {
  return clubs;
}

export async function getClub(slug: string): Promise<Club | undefined> {
  return clubs.find((c) => c.slug === slug);
}

export async function listSeries(clubSlug?: string): Promise<Series[]> {
  return seed().series.filter((s) => !clubSlug || s.clubSlug === clubSlug);
}

export async function getSeries(slug: string): Promise<Series | undefined> {
  return seed().series.find((s) => s.slug === slug);
}

export interface TournamentFilter {
  clubSlug?: string;
  seriesSlug?: string;
  gameType?: string;
  status?: TournamentStatus | "active";
  from?: string;
}

export async function listTournaments(f: TournamentFilter = {}): Promise<TournamentWithStatus[]> {
  return seed()
    .tournaments.filter((t) => !f.clubSlug || t.clubSlug === f.clubSlug)
    .filter((t) => !f.seriesSlug || t.seriesSlug === f.seriesSlug)
    .filter((t) => !f.gameType || t.gameType === f.gameType)
    .filter((t) => !f.from || +new Date(t.startTime) >= +new Date(f.from))
    .sort(byStart)
    .map(withStatus)
    .filter((t) => {
      if (!f.status) return true;
      if (f.status === "active") return t.liveStatus === "live" || t.liveStatus === "break";
      return t.liveStatus === f.status;
    });
}

export async function getTournament(id: string): Promise<TournamentWithStatus | undefined> {
  const t = seed().tournaments.find((x) => x.id === id);
  return t && withStatus(t);
}
