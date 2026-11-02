import { NextResponse } from "next/server";
import { getLive, getTournament } from "@/lib/repo";

export const dynamic = "force-dynamic";

/** GET /api/tournaments/:id/live —— 真实录入的实况快照；未接入时返回 404 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await getTournament(id))) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const snap = await getLive(id);
  if (!snap) return NextResponse.json({ error: "no_live_data" }, { status: 404 });
  return NextResponse.json(snap, { headers: { "Cache-Control": "no-store" } });
}
