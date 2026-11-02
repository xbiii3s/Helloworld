import { NextResponse } from "next/server";
import { getLiveSnapshot } from "@/lib/live";
import { getTournament } from "@/lib/repo";

export const dynamic = "force-dynamic";

/** GET /api/tournaments/:id/live —— 比赛实况快照（前端轮询使用） */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const t = await getTournament((await params).id);
  if (!t) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(getLiveSnapshot(t), { headers: { "Cache-Control": "no-store" } });
}
