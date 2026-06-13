import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { recordAnalyticsVisit } from "@/lib/cms";

function cleanString(value: unknown, fallback = "", maxLength = 300) {
  return typeof value === "string" ? value.slice(0, maxLength) : fallback;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const path = cleanString(body.path, "/", 500);

  if (!path.startsWith("/") || path.startsWith("/admin") || path.startsWith("/api")) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const headerList = await headers();
  const visitorId = cleanString(body.visitorId, crypto.randomUUID(), 120);

  await recordAnalyticsVisit({
    id: crypto.randomUUID(),
    visitorId,
    path,
    title: cleanString(body.title, path, 180),
    referrer: cleanString(body.referrer, "", 500),
    userAgent: cleanString(headerList.get("user-agent"), "", 500),
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
