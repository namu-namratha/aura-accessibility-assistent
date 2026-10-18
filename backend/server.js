
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5000);

// Middleware
app.use(cors());
app.use(express.json({ limit: "20kb" }));

// MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "aura_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// OpenAI client
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

// Health check: verify MySQL and report AI configuration
app.get("/api/health", async (req, res) => {
  let database = "connected";

  try {
    await db.query("SELECT 1");
  } catch (error) {
    database = "disconnected";
    console.error("AURA database connection error:", error.message);
  }

  const success = database === "connected";

  res.status(success ? 200 : 503).json({
    success,
    project: "AURA",
    status: "online",
    aiConfigured: Boolean(openai),
    database
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
        message:
          "AI is not configured yet. Add OPENAI_API_KEY to your backend .env file."
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

    return res.json({
      success: true,
      answer
    });
  } catch (error) {
    console.error("AURA AI error:", {
      name: error.name,
      status: error.status,
      code: error.code,
      message: error.message
    });

    return res.status(500).json({
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

// Start backend
app.listen(PORT, () => {
  console.log(`AURA backend running at http://localhost:${PORT}`);
});

// Check MySQL pool on shutdown
async function shutdown() {
  try {
    await db.end();
  } catch (error) {
    console.error("Error closing MySQL pool:", error.message);
  } finally {
    process.exit(0);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);