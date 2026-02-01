export default async function handler(req: any, res: any) {
  console.log("API HIT", req.method, req.body);

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await resend.emails.send({
      from: "Amberwood House Press <dream@amberwoodhousepress.com>",
      to: email,
      subject: "Your Activity Pack Is Ready",
      template_id: "5c8d9c8a-bb98-4f41-917b-bb420ffcec0e",
      text: "Your activity pack is ready.",
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
