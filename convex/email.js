import { v } from "convex/values";
import { action } from "./_generated/server";
import { Resend } from "resend";

export const sendEmail = action({
  args: {
    to: v.string(),
    subject: v.string(),
    html: v.string(),
    text: v.optional(v.string()),
    apiKey: v.string(),
    from: v.optional(v.string()), // allow custom from
  },
  handler: async (ctx, args) => {
    const resend = new Resend(args.apiKey);

    const fallbackFrom = "Splitwiser <onboarding@resend.dev>";
    const fromAddress = args.from || fallbackFrom;

    const plainText = args.text || args.html.replace(/<[^>]+>/g, " ");

    try {
      const result = await resend.emails.send({
        from: fromAddress,
        to: args.to,
        subject: args.subject,
        html: args.html,
        text: plainText,
      });

      console.log("✅ Email sent to:", args.to, "Result:", result);

      return {
        success: true,
        id: result.id,
        result,
      };
    } catch (error) {
      console.error("❌ Failed to send email to:", args.to, "Error:", error);

      return {
        success: false,
        error: error.message,
      };
    }
  },
});
