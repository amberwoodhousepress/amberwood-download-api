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
      subject: "Your Free Activity Pack 🌿",
      html: `
        <p>Thanks for downloading!</p>
        <p>
          <a href="https://YOUR_DOWNLOAD_LINK_HERE">
            Click here to download your activity pack
          </a>
        </p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send email" });
  }
}
