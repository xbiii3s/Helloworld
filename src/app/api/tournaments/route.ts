import { NextResponse } from "next/server";
import { listTournaments } from "@/lib/repo";
import type { Status } from "@/lib/types";

export const dynamic = "force-dynamic";

/** GET /api/tournaments?club=&series=&status=running|upcoming|finished */
export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const data = await listTournaments({
    clubSlug: sp.get("club") ?? undefined,
    seriesSlug: sp.get("series") ?? undefined,
    status: (sp.get("status") as Status | null) ?? undefined,
  });
  return NextResponse.json(data);
}
