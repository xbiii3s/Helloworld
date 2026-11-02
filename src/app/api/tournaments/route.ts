import { NextResponse } from "next/server";
import { listTournaments } from "@/lib/repo";
import type { TournamentStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

/** GET /api/tournaments?club=&series=&game=&status= —— 赛程查询（可供 App / 小程序复用） */
export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const data = await listTournaments({
    clubSlug: sp.get("club") ?? undefined,
    seriesSlug: sp.get("series") ?? undefined,
    gameType: sp.get("game") ?? undefined,
    status: (sp.get("status") as TournamentStatus | "active" | null) ?? undefined,
  });
  return NextResponse.json(data);
}
