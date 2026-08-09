import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SENDER_ACCOUNT = "rikk.haq@gmail.com";
const NOTIFY_TO = "plusev.blr@gmail.com";

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SENDER_ACCOUNT,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const honeypot = typeof body?.company === "string" ? body.company.trim() : "";

  // Honeypot: bots fill every field, real visitors never see this one.
  // Report success without sending anything, so the bot doesn't learn it failed.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  if (!process.env.GMAIL_APP_PASSWORD) {
    console.error("GMAIL_APP_PASSWORD is not set");
    return NextResponse.json({ ok: false, error: "Signup is temporarily unavailable." }, { status: 500 });
  }

  const transporter = getTransporter();

  try {
    await transporter.sendMail({
      from: `PlusEV Site <${SENDER_ACCOUNT}>`,
      to: NOTIFY_TO,
      replyTo: email,
      subject: "New newsletter signup",
      text: `New signup: ${email}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter signup failed:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
