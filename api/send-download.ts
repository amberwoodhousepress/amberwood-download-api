import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const email =
    req.body?.email ||
    req.body?.Email ||
    req.body?.data?.email ||
    req.body?.data?.Email;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await resend.emails.send({
      from: "Amberwood House Press <dream@amberwoodhousepress.com>",
      to: email,
      subject: "✨ Your Activity Pack is Ready ✨",
      template_id: "free-download-email",
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
