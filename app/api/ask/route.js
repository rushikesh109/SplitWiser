import { internal } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function POST(req) {
  const { question } = await req.json();

  try {
    const { reply, error } = await convex.action(internal.ai.askGemini, {
      question,
    });

    return Response.json({ reply, error });
  } catch (err) {
    console.error("Error calling Gemini action:", err);
    return Response.json({ error: "Server error while contacting Gemini." }, { status: 500 });
  }
}
