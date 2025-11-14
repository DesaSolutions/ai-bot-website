import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { askOpenAI } from "./services/openaiService.js";  
import fs from "fs";
import path from "path";

function logChat(message, reply, site) {
  const logPath = path.join("logs", "chats", `${new Date().toISOString().slice(0,10)}.log`);

  const line = `[${new Date().toISOString()}] (${site}) USER: ${message}\nBOT: ${reply}\n\n`;

  fs.appendFile(logPath, line, err => {
    if (err) console.error("Logging error:", err);
  });
}


function isUnsafeMessage(text) {
  const bannedWords = [
    "sex", "nude", "fuck", "porn", "suicide", "kill", 
    "bomb", "terrorist", "rape", "asshole", "bitch",
    "communal", "hate", "genocide", "drug making"
  ];

  text = text.toLowerCase();

  return bannedWords.some(word => text.includes(word));
}


function isLead(message) {
  const triggers = [
    "price", "pricing", "contact", "hire", 
    "interested", "need help", "need a website",
    "want a website", "want chatbot", "build me",
    "quotation", "quote", "how much", "cost"
  ];

  const text = message.toLowerCase();
  return triggers.some(t => text.includes(t));
}

function logLead(message, site) {
  const leadPath = path.join("logs", "leads.log");

  const entry =
    `\n--- LEAD ---\n` +
    `Date: ${new Date().toISOString()}\n` +
    `Website: ${site}\n` +
    `Message: ${message}\n` +
    `----------------------\n`;

  fs.appendFile(leadPath, entry, err => {
    if (err) console.error("Lead logging failed:", err);
  });
}

if (isLead(message)) {
  logLead(message, site);
}


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve widget + CSS
app.use(express.static("public"));

// 🚀 NEW DESA AI chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, site } = req.body;

    if (!message) {
  return res.status(400).json({ error: "Message is required" });
    }
    
    // 🚨 Safety Check
    if (isUnsafeMessage(message)) {
      return res.json({
        reply: "⚠️ I’m here to keep this space respectful and safe. Please avoid inappropriate or harmful questions."
      });
    }


    // 🔥 Use DESA AI service
    const reply = await askOpenAI(message, site || "desasolutionsindia.com");

    // 📌 Save the chat record
    logChat(message, reply, site);

    res.json({ reply });

  } catch (err) {
    console.error("API ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
