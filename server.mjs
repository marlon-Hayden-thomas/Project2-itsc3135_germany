import "dotenv/config";

import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = 3001;

// Allow frontend (Vite dev server) to call this API
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/translate", async (req, res) => {
  try {
    const { text, sourceLang, targetLang } = req.body || {};

    if (!text || !sourceLang || !targetLang) {
      return res.status(400).json({
        error: "Missing text, sourceLang, or targetLang",
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set.");
      return res.status(500).json({ error: "Server not configured with API key." });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a translation engine. Translate the user's text from ${sourceLang} to ${targetLang}. Reply with only the translated text, no explanations.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const translated =
      completion.choices?.[0]?.message?.content?.trim() ?? text;

    res.json({ translatedText: translated });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Translation failed." });
  }
});

app.listen(port, () => {
  console.log(`Translation server running on http://localhost:${port}`);
});
