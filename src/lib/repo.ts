import { clubs } from "./data/clubs";
import { liveSnapshots } from "./data/live";
import { series } from "./data/series";
import { tournaments } from "./data/tournaments";
import { todayVN } from "./format";
import type { Club, LiveSnapshot, Series, Status, Tournament } from "./types";

/**
 * 数据访问层。页面和 API 只通过这里取数据；
 * 以后换成数据库 / 后台录入，只需要改这个文件。
 */

export function statusOf(start: string, end: string | undefined, today = todayVN()): Status {
  if (today < start) return "upcoming";
  if (today > (end ?? start)) return "finished";
  return "running";
}

export type SeriesWithStatus = Series & { status: Status };
export type TournamentWithStatus = Tournament & { status: Status };

const ws = (s: Series): SeriesWithStatus => ({ ...s, status: statusOf(s.startDate, s.endDate) });
const wt = (t: Tournament): TournamentWithStatus => ({ ...t, status: statusOf(t.startDate, t.endDate) });

export async function listClubs(): Promise<Club[]> {
  return clubs;
}

export async function getClub(slug: string): Promise<Club | undefined> {
  return clubs.find((c) => c.slug === slug);
}

export async function listSeries(f: { clubSlug?: string; status?: Status } = {}): Promise<SeriesWithStatus[]> {
  return series
    .map(ws)
    .filter((s) => !f.clubSlug || s.clubSlug === f.clubSlug)
    .filter((s) => !f.status || s.status === f.status)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export async function getSeries(slug: string): Promise<SeriesWithStatus | undefined> {
  const s = series.find((x) => x.slug === slug);
  return s && ws(s);
}

export async function listTournaments(
  f: { clubSlug?: string; seriesSlug?: string; status?: Status } = {},
): Promise<TournamentWithStatus[]> {
  return tournaments
    .map(wt)
    .filter((t) => !f.clubSlug || t.clubSlug === f.clubSlug)
    .filter((t) => !f.seriesSlug || t.seriesSlug === f.seriesSlug)
    .filter((t) => !f.status || t.status === f.status)
    .sort((a, b) => a.startDate.localeCompare(b.startDate) || (a.eventNo ?? 0) - (b.eventNo ?? 0));
}

export async function getTournament(id: string): Promise<TournamentWithStatus | undefined> {
  const t = tournaments.find((x) => x.id === id);
  return t && wt(t);
}

export async function getLive(id: string): Promise<LiveSnapshot | undefined> {
  return liveSnapshots[id];
}
