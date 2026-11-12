import { NextResponse } from "next/server";
import { emptyInquiry, validateInquiry, type Inquiry } from "@/lib/inquiry";
import { inquiryOptions } from "@/data/pricing";

/**
 * Приема запитване от формата и го препраща към INQUIRY_WEBHOOK_URL
 * (напр. Make, Zapier, n8n, Formspree или собствен CRM endpoint).
 * Ако променливата не е зададена, връща 503 и клиентът отваря
 * имейл приложението с попълнено запитване като резервен вариант.
 */
export async function POST(req: Request) {
  let body: Partial<Inquiry>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const data: Inquiry = { ...emptyInquiry };
  for (const key of Object.keys(emptyInquiry) as (keyof Inquiry)[]) {
    const v = body[key];
    if (key === "consent") data.consent = v === true;
    else if (typeof v === "string") (data[key] as string) = v.slice(0, 3000);
  }

  const errors = validateInquiry(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const serviceLabel = inquiryOptions().find((o) => o.value === data.service)?.label ?? data.service;

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, serviceLabel, source: "bgplus-reklama", receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook ${res.status}`);
  } catch (err) {
    console.error("Inquiry webhook failed", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
