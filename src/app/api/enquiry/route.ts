import { NextResponse } from "next/server";
import { enquirySummary, normalise, validate } from "@/lib/enquiry";
import { business } from "@/content/business";

/**
 * Enquiry endpoint.
 *
 * Delivery: set ENQUIRY_WEBHOOK_URL (e.g. a Slack/Teams/Zapier/Make webhook, or your CRM)
 * and each valid enquiry is POSTed there as JSON. Without it, enquiries are validated and
 * acknowledged but NOT delivered anywhere — fine for a demo, not for launch.
 * Submitted details are never written to logs.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ ok: false, message: "Unsupported request." }, { status: 415 });
  }
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > 10_000) {
    return NextResponse.json({ ok: false, message: "That enquiry is too long." }, { status: 413 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many enquiries from this connection. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "We couldn't read that enquiry." }, { status: 400 });
  }
  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ ok: false, message: "We couldn't read that enquiry." }, { status: 400 });
  }

  const input = normalise(raw as Record<string, unknown>);

  // Honeypot filled → silently accept so bots learn nothing.
  if (input.company) return NextResponse.json({ ok: true });

  const errors = validate(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors, message: "Please correct the highlighted fields." }, { status: 422 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[enquiry] ENQUIRY_WEBHOOK_URL is not set — enquiry validated but not delivered.");
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { company: _honeypot, ...fields } = input;
    void _honeypot;
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: business.name, receivedAt: new Date().toISOString(), text: enquirySummary(input), ...fields }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[enquiry] delivery failed:", err instanceof Error ? err.message : "unknown error");
    return NextResponse.json(
      { ok: false, message: "Our enquiry system is temporarily unavailable. Please try again shortly or contact us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
