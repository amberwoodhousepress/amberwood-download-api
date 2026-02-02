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

  let email: string | undefined;

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    email = body?.email;
  } catch {
    return res.status(400).json({ error: "Invalid request body" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await resend.emails.send({
      from: "Amberwood House Press <dream@amberwoodhousepress.com>",
      to: email,
      subject: "✨ Your Activity Pack Is Ready ✨",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="width=device-width" name="viewport" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta
      content="telephone=no,address=no,email=no,date=no,url=no"
      name="format-detection" />
  </head>
  <body>
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
      ✨ Your Activity Pack is Ready ✨
    </div>
    <table border="0" width="100%" cellpadding="0" cellspacing="0" align="center">
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              width="100%"
              cellpadding="0"
              cellspacing="0"
              style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;line-height:155%;max-width:600px;">
              <tbody>
                <tr>
                  <td>
                    <p>We’re so happy you’re here! 🤍</p>
                    <p>
                      As promised, here’s your free printable activity pack,
                      created with intention, imagination, and gentle learning
                      in mind.
                    </p>
                    <p>
                      <strong>👇 Download your activity pack here 👇</strong>
                    </p>
                    <p>
                      <a
                        href="https://drive.google.com/file/d/1NSobW1R5LC5ipjj-iiJVYROzVgd7oLBA/view?usp=drive_link"
                        target="_blank"
                        style="color:#0670DB;text-decoration:underline">
                        https://drive.google.com/file/d/1NSobW1R5LC5ipjj-iiJVYROzVgd7oLBA/view?usp=drive_link
                      </a>
                    </p>
                    <p>
                      If you enjoyed this printable, you’ll love what we’re
                      creating at Amberwood House Press. Thoughtfully made
                      stories and resources that invite children to slow down,
                      wonder, and learn with heart.
                    </p>
                    <p>We’re glad to share this with you!</p>
                    <p>Stay on the lookout for more resources.</p>
                    <p>
                      Warmly,<br />
                      <strong>Amberwood House Press</strong><br />
                      Amberwoodhousepress.com
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
