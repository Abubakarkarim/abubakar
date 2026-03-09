import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function buildHtmlEmail(name: string, email: string, message: string): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  const portfolioName = escapeHtml(siteConfig.name);
  const mailtoHref = `mailto:${email.replace(/"/g, "&quot;")}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New message from portfolio</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9; color: #0f172a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); overflow: hidden;">
          <tr>
            <td style="padding: 28px 24px 20px; border-bottom: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #64748b;">New message</p>
              <h1 style="margin: 6px 0 0; font-size: 20px; font-weight: 700; color: #0f172a;">${portfolioName} Portfolio</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px;">
              <p style="margin: 0 0 16px; font-size: 14px; color: #475569; line-height: 1.5;">Someone sent you a message from your portfolio contact form.</p>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #0f172a;">${safeMessage}</p>
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0 0 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #64748b;">From</p>
                    <p style="margin: 0; font-size: 15px; font-weight: 600; color: #0f172a;">${safeName}</p>
                    <p style="margin: 4px 0 0;">
                      <a href="${mailtoHref}" style="font-size: 14px; color: #6366f1; text-decoration: none;">${safeEmail}</a>
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin: 20px 0 0; font-size: 13px; color: #64748b;">Reply to this email to respond directly to the sender.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 24px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">Sent via ${portfolioName} portfolio contact form</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(request: Request) {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    return NextResponse.json(
      {
        error:
          "Email is not configured. Set SMTP_USER and SMTP_PASS in your environment (e.g. .env.local locally or Vercel Project Settings → Environment Variables for production). Redeploy after adding variables.",
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || typeof name !== "string" || !email || typeof email !== "string" || !message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_EMAIL ?? siteConfig.email;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? `"${siteConfig.name} Portfolio" <${user}>`,
      to,
      replyTo: trimmedEmail,
      subject: `Portfolio contact from ${trimmedName}`,
      text: `You received a new message from your portfolio.\n\nMessage:\n${trimmedMessage}\n\n---\nFrom: ${trimmedName} <${trimmedEmail}>\nReply to this email to respond.`,
      html: buildHtmlEmail(trimmedName, trimmedEmail, trimmedMessage),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : String(err);
    const errorCode =
      err && typeof err === "object" && "code" in err
        ? String((err as { code: string }).code)
        : "";
    console.error("Contact form error:", {
      message: errorMessage,
      code: errorCode,
      full: err,
    });
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email directly." },
      { status: 500 }
    );
  }
}
