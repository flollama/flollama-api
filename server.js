import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `You are flollama, a helpful AI chatbot created by Pratyush Kumar.
Be clear, accurate, and neutral. Do not generate harmful or false information.`;

// -----------------------------
// GET /api/chat → Joke
// -----------------------------
app.get("/api/chat", async (req, res) => {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=txt&type=single"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch joke");
    }

    const joke = await response.text();

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(joke);
  } catch (err) {
    console.error("Joke error:", err);
    res.status(500).send("Failed to fetch joke");
  }
});

// -----------------------------
// POST /api/chat → AI
// -----------------------------
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !messages.length) {
      return res.status(400).json({ error: "Missing messages array" });
    }

    const prompt = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ]
      .map((m) => m.content)
      .join("\n");

    const stream = await ai.models.generateContentStream({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
    });

    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    for await (const chunk of stream) {
      if (chunk?.text) {
        res.write(chunk.text);
      }
    }

    res.end();
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Flollama API running on port ${PORT}`);
});
