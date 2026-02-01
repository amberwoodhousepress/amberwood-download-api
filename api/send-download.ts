import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

console.log("Incoming body:", JSON.stringify(req.body, null, 2));

const email =
  req.body?.email ??
  req.body?.Email ??
  req.body?.data?.email ??
  req.body?.data?.Email ??
  req.body?.data?.fields?.email ??
  req.body?.data?.fields?.Email;


  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await resend.emails.send({
  from: "Amberwood House Press <onboarding@resend.dev>",

  to: email,
  subject: "✨ Your Activity Pack Is Ready ✨",
  template_id: "5c8d9c8a-bb98-4f4f-917b-bb420ffcec0e",
});


    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
