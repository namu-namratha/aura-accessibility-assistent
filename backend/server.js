
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "20kb" }));

// OpenAI client is initialized only when an API key is configured.
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    project: "AURA",
    message: "AURA backend is running successfully!"
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    project: "AURA",
    status: "online",
    aiConfigured: Boolean(openai),
    database: "not connected yet"
  });
});

// AI chat route
app.post("/api/chat", async (req, res) => {
  try {
    const question = req.body?.message;

    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a question."
      });
    }

    if (question.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Please keep your question under 2000 characters."
      });
    }

    if (!openai) {
      return res.status(503).json({
        success: false,
        message: "AI is not configured yet. Add OPENAI_API_KEY to your .env file."
      });
    }

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      instructions:
        "You are AURA, a friendly voice-controlled accessibility assistant. " +
        "Help users understand technology and navigate websites. " +
        "Give clear, accessible, concise answers that sound natural when read aloud. " +
        "Use plain language and explain technical terms simply. " +
        "Do not claim to have performed actions you did not perform.",
      input: question.trim()
    });

    const answer = response.output_text?.trim();

    if (!answer) {
      return res.status(502).json({
        success: false,
        message: "AURA could not generate an answer. Please try again."
      });
    }

    res.json({
      success: true,
      answer
    });
  } catch (error) {
    console.error("AURA AI error:", error.message);

    res.status(500).json({
      success: false,
      message: "AURA could not answer right now. Please try again."
    });
  }
});

// Unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`AURA backend running at http://localhost:${PORT}`);
});