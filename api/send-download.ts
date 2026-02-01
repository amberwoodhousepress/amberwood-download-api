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
  from: "Amberwood House Press <dream@amberwoodhousepress.com>",
  to: email,
  subject: "Your Activity Pack Is Ready",
  template_id: "5c8d9c8a-bb98-4f4f-917b-bb420ffcec0e",
  html: "<!-- required by sdk -->"
});


 return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
