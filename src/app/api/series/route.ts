import { NextResponse } from "next/server";
import { listSeries } from "@/lib/repo";
import type { Status } from "@/lib/types";

export const dynamic = "force-dynamic";

/** GET /api/series?club=&status= */
export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  return NextResponse.json(await listSeries({ clubSlug: sp.get("club") ?? undefined, status: (sp.get("status") as Status | null) ?? undefined }));
}
