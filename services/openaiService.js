import dotenv from "dotenv";
dotenv.config();   

import OpenAI from "openai";
import fs from "fs";
import path from "path";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function loadKnowledge(product) {
  try {
    const filePath = path.join("knowledge", `${product}.txt`);
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    return "";
  }
}

export async function generateReply(message, product) {
  const knowledge = loadKnowledge(product);

  const systemPrompt = `
You are an AI support chatbot. Use the following product knowledge when answering:

${knowledge}

If unsure or not found in knowledge base, answer naturally without making up facts.
  `;

  const completion = await client.chat.completions.create({
    model: process.env.MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ]
  });

  return completion.choices[0].message.content;
}
