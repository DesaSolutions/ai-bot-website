import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { askOpenAI } from "./services/openaiService.js";  // <-- MUST BE HERE

function isUnsafeMessage(text) {
  const bannedWords = [
    "sex", "nude", "fuck", "porn", "suicide", "kill", 
    "bomb", "terrorist", "rape", "asshole", "bitch",
    "communal", "hate", "genocide", "drug making"
  ];

  text = text.toLowerCase();

  return bannedWords.some(word => text.includes(word));
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

    res.json({ reply });

  } catch (err) {
    console.error("API ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
