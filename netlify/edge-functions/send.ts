import type { Config } from "@netlify/edge-functions";

export default async (req: Request) => {
  const body = await req.json();
  console.log("Received body:", body);
  return new Response(JSON.stringify({ success: true }));
};

export const config: Config = { path: "/send", method: "POST" };
