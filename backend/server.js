import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "node:path";
import fs from "node:fs";

// Load environment variables from backend/.env or root .env
dotenv.config({ path: path.resolve(import.meta.dirname, ".env") });
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5000);
const JWT_SECRET = process.env.JWT_SECRET || "aura_jwt_secret_key_2026_supersecure";

// Middleware
app.use(cors());
app.use(express.json({ limit: "50kb" }));

// Local JSON fallback store for users when MySQL is not running
const LOCAL_DATA_DIR = path.resolve(import.meta.dirname, "data");
const LOCAL_USERS_FILE = path.join(LOCAL_DATA_DIR, "users.json");

function ensureLocalDataDir() {
  if (!fs.existsSync(LOCAL_DATA_DIR)) {
    fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_USERS_FILE)) {
    fs.writeFileSync(LOCAL_USERS_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

function readLocalUsers() {
  ensureLocalDataDir();
  try {
    const data = fs.readFileSync(LOCAL_USERS_FILE, "utf8");
    return JSON.parse(data) || [];
  } catch (error) {
    console.error("Error reading local users file:", error.message);
    return [];
  }
}

function writeLocalUsers(users) {
  ensureLocalDataDir();
  fs.writeFileSync(LOCAL_USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

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

let dbConnected = false;

// Attempt database connection and table initialization
async function initDatabase() {
  try {
    const connection = await db.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    connection.release();
    dbConnected = true;
    console.log("Connected to MySQL and initialized 'users' table.");
  } catch (error) {
    dbConnected = false;
    console.warn("MySQL not reachable. Using local user fallback storage. Reason:", error.message);
  }
}

initDatabase();

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
  let database = "disconnected";

  try {
    await db.query("SELECT 1");
    database = "connected";
    dbConnected = true;
  } catch (error) {
    database = "disconnected (fallback storage active)";
    dbConnected = false;
  }

  res.status(200).json({
    success: true,
    project: "AURA",
    status: "online",
    aiConfigured: Boolean(openai),
    database,
    storage: dbConnected ? "mysql" : "local_fallback"
  });
});

// ----------------------------------------------------
// AUTHENTICATION ROUTES
// ----------------------------------------------------

// User Registration
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter your full name."
      });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
      });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long."
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    let existingUser = false;

    if (dbConnected) {
      try {
        const [rows] = await db.query("SELECT id FROM users WHERE email = ? LIMIT 1", [cleanEmail]);
        if (rows.length > 0) existingUser = true;
      } catch (dbErr) {
        console.warn("MySQL query error, checking fallback store:", dbErr.message);
        dbConnected = false;
      }
    }

    if (!dbConnected) {
      const localUsers = readLocalUsers();
      if (localUsers.some(u => u.email.toLowerCase() === cleanEmail)) {
        existingUser = true;
      }
    }

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists."
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    let userId = Date.now();

    if (dbConnected) {
      try {
        const [result] = await db.query(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [cleanName, cleanEmail, hashedPassword]
        );
        userId = result.insertId;
      } catch (dbErr) {
        console.warn("MySQL insert error, saving to fallback store:", dbErr.message);
        dbConnected = false;
      }
    }

    if (!dbConnected) {
      const localUsers = readLocalUsers();
      const newUser = {
        id: userId,
        name: cleanName,
        email: cleanEmail,
        password: hashedPassword,
        created_at: new Date().toISOString()
      };
      localUsers.push(newUser);
      writeLocalUsers(localUsers);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: userId, email: cleanEmail, name: cleanName },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
      user: {
        id: userId,
        name: cleanName,
        email: cleanEmail
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating your account. Please try again."
    });
  }
});

// User Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || typeof email !== "string" || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email and password."
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    let foundUser = null;

    if (dbConnected) {
      try {
        const [rows] = await db.query(
          "SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1",
          [cleanEmail]
        );
        if (rows.length > 0) foundUser = rows[0];
      } catch (dbErr) {
        console.warn("MySQL query error, checking fallback store:", dbErr.message);
        dbConnected = false;
      }
    }

    if (!dbConnected) {
      const localUsers = readLocalUsers();
      foundUser = localUsers.find(u => u.email.toLowerCase() === cleanEmail) || null;
    }

    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const passwordMatches = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email, name: foundUser.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during sign in. Please try again."
    });
  }
});

// Get current user profile (JWT protected)
app.get("/api/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Authentication required." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({
      success: true,
      user: {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email
      }
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired session." });
  }
});

// ----------------------------------------------------
// AI CHAT ROUTE
// ----------------------------------------------------

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

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    if (!apiKey) {
      return res.status(503).json({
        success: false,
        message: "Gemini is not configured. Check your backend .env file."
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text:
                  "You are AURA, a friendly voice-controlled accessibility assistant. " +
                  "Answer general questions like a helpful AI assistant. " +
                  "Help users understand technology and navigate websites. " +
                  "Give clear, accessible answers that sound natural when read aloud. " +
                  "Use plain language and explain technical terms simply. " +
                  "Do not claim to have performed actions you did not perform."
              }
            ]
          },
          contents: [
            {
              role: "user",
              parts: [{ text: question.trim() }]
            }
          ],
          generationConfig: {
            maxOutputTokens: 500
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", {
        status: response.status,
        message: data.error?.message || "Unknown Gemini API error"
      });

      return res.status(502).json({
        success: false,
        message:
          response.status === 429
            ? "Gemini usage limit reached. Check your API quota."
            : "Gemini could not process the question. Check your API configuration."
      });
    }

    const answer = data.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("")
      .trim();

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
    console.error("AURA Gemini error:", error.message);

    return res.status(500).json({
      success: false,
      message: "AURA could not answer right now. Please try again."
    });
  }
});
+                                                                   ~
// Start AURA backend server
app.listen(PORT, () => {
  console.log(`AURA backend running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});