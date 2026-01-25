import type { Config } from "@netlify/edge-functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

const sender = "info@psychologie-katka.cz";
const receiver = "mladek.milan@gmail.com"; //"katerina.taranzova@gmail.com";

export default async (req: Request) => {
  try {
    const body = await req.json();
    console.log("Received body:", body);
    if (!body.name || !body.email || !body.message) {
      throw new Error("Missing required fields");
    }
    await resend.emails.send({
      from: `Psychologie Katka <${sender}>`,
      to: [receiver],
      replyTo: body.email,
      subject: `Kontakt z webu: ${body.name}`,
      html: `<div><h1>Kontakt z webu: ${body.name}</h1><div>E-mail: ${body.email}</div><div>Zpráva: ${body.message}</div></div>`,
    });
  } catch (error) {
    console.log("Error sending email:", error);
  }
  return new Response(JSON.stringify({ success: true }));
};

export const config: Config = { path: "/send", method: "POST" };
