import { Config } from "../config.js";

export const GeminiService = {
  async generateInsight(transactions) {
    const GEMINI_KEY = Config.GEMINI_KEY;
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

    if (transactions.length === 0) return "Add some transactions first!";

    const historySummary = transactions
      .map((t) => `${t.type}: ${t.name} ($${t.amount})`)
      .join(", ");

    const prompt = {
      contents: [
        {
          parts: [
            {
              text: `You are a witty financial coach. Analyze these: [${historySummary}]. Give a 3-sentence witty insight.`,
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prompt),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Gemini Error Details:", data);
        throw new Error(data.error?.message || "API Request Failed");
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini Service Error:", error);
      return "The Financial Fortune is currently unavailable. Please try again later.";
    }
  },
};
