import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/site-url";

export async function GET() {
  return NextResponse.redirect(new URL(absoluteUrl("/")));
}
