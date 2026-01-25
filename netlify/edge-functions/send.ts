import type { Config } from "@netlify/edge-functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export default async (req: Request) => {
  try {
    const body = await req.json();
    console.log("Received body:", body);
    if (!body.name || !body.email || !body.message) {
      throw new Error("Missing required fields");
    }
    const sender = process.env.SENDER_EMAIL;
    const receiver = process.env.RECEIVER_EMAIL;

    if (!sender || !receiver) {
      throw new Error("Sender or receiver email not configured");
    }

    await resend.emails.send({
      from: `Psychologie Katka <${sender}>`,
      to: [receiver],
      replyTo: body.email,
      subject: `Kontakt z webu: ${body.name}`,
      html: `<html><body><div><h1>Kontakt z webu: ${body.name}</h1><div>E-mail: ${body.email}</div><div>Zpráva: ${body.message}</div></div></body></html>`,
    });
    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.log("Error sending email:", error);
    return new Response(JSON.stringify({ success: false }));
  }
};

export const config: Config = { path: "/send", method: "POST" };
