import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  company: z.string().optional(),
  message: z.string().min(10),
});


export async function POST(request: Request) {
  try {

    const body = await request.json();
    const payload = contactSchema.parse(body);

    const sesClient = new SESClient({
      region: process.env.AWS_REGION || "eu-north-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY ?? "",
        secretAccessKey: process.env.AWS_SECRET_KEY ?? "",
      },
    });

    const subject = `New voyage inquiry: ${payload.fullName} from ${payload.company}`;
    const textBody = [
      "New contact request received.",
      "",
      `Full name: ${payload.fullName}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Company: ${payload.company}`,
      "",
      "Message:",
      payload.message,
    ].join("\n");

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; color: #0b0b0b;">
        <h2 style="margin-bottom: 4px;">New contact request</h2>
        <p style="margin-top: 0; color: #444;">A new inquiry has arrived from the contact page.</p>
        <p style="margin-top: 0; color: #444;">Website: https://yachts.thedxberience.com</p>
        <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
          <tr>
            <td style="padding: 6px 0; font-weight: 600;">Full name</td>
            <td style="padding: 6px 0;">${payload.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 600;">Email</td>
            <td style="padding: 6px 0;">${payload.email}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 600;">Phone</td>
            <td style="padding: 6px 0;">${payload.phone}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 600;">Company</td>
            <td style="padding: 6px 0;">${payload.company}</td>
          </tr>
        </table>
        <div style="margin-top: 16px;">
          <div style="font-weight: 600; margin-bottom: 6px;">Message</div>
          <div style="white-space: pre-wrap; border-left: 3px solid #111; padding-left: 10px;">
            ${payload.message}
          </div>
        </div>
      </div>
    `;

    const command = new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL ?? "info@thedxberience.com",
      Destination: {
        ToAddresses: [process.env.SES_TO_EMAIL ?? "support@thedxberience.com"],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          Text: { Data: textBody, Charset: "UTF-8" },
          Html: { Data: htmlBody, Charset: "UTF-8" },
        },
      },
      ReplyToAddresses: [payload.email],
    });

    await sesClient.send(command);

    return Response.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof z.ZodError
        ? "Invalid form data. Please check your inputs."
        : "Unable to send message right now.";

    return Response.json(
      {
        ok: false,
        error: message,
      },
      { status: 400 }
    );
  }
}
