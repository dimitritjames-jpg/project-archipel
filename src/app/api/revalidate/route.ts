import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ ok: true, message: "Revalidation endpoint — Phase 2" });
}
