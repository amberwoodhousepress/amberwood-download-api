const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = req.body;

  if (typeof body === "string") {
    body = JSON.parse(body);
  }

  const email = body.email;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await resend.emails.send({
      from: "Amberwood House Press <onboarding@resend.dev>",
      to: email,
      subject: "Your Activity Pack Is Ready",
      html: "<p>Test email</p>",
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
};
