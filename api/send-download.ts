import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = typeof req.body === "string"
    ? JSON.parse(req.body)
    : req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await resend.emails.send({
  from: "Amberwood House Press <onboarding@resend.dev>",
  to: "jaylenesantiago24@gmail.com",
  subject: "Your Activity Pack Is Ready",
  template: "free-download-email",
  html: "<!-- fallback -->"
});



    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
