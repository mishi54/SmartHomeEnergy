import { sequelize } from "../models/index.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const processChatPrompt = async (userId, question) => {
  const records = await sequelize.models.telemetrydata.findAll({
    where: { userId },
    raw: true,
  });

  if (!records.length) return "No telemetry data found for your account.";

  const grouped = {};
  for (const record of records) {
    if (!grouped[record.deviceName]) grouped[record.deviceName] = [];
    grouped[record.deviceName].push(record.energyWatts);
  }

  const summary = Object.entries(grouped).map(([name, watts]) => {
    const total = watts.reduce((a, b) => a + b, 0).toFixed(2);
    const avg = (watts.reduce((a, b) => a + b, 0) / watts.length).toFixed(2);
    return `${name}: total ${total}W, average ${avg}W`;
  }).join("\n");

//   const prompt = `
// You are an energy assistant in a smart home web application.

// A user sent the following message: "${question}"

// Context – this is their summarized energy usage data:
// ${summary}

// Instructions:
// - Respond in clear, professional, and natural text — like a real human chat.
// - Keep the tone direct and on-topic. This is a dashboard assistant, not a general AI.
// - Avoid any off-topic or filler phrases like: "I see", "Understood", "Certainly", "Happy to help", etc.
// - Only answer based on the energy usage data above. If the question is off-topic, politely say it's unrelated.

// Response format:
// - Return the reply as a styled HTML snippet.
// - Use <ul> with <li> for each insight.
// - Apply light inline styling (e.g., font size, spacing, and bold labels) for clarity.

// Strictly stay within the topic of energy usage.
// `;
const prompt = `
You are an energy assistant in a smart home web application.

A user sent the following message: "${question}"

Context – this is their summarized energy usage data:
${summary}

Instructions:
- Respond in clear, professional, and natural text — like a real human chat.
- For each relevant device, mention both total energy usage and average energy usage.
- Only show the top 1 or 2 highest energy-using devices based on total usage.
- Use exact watt values where available.
- Do not skip average usage unless specifically asked.
- Return the reply as a styled HTML snippet.
- Use <ul> with <li> for each insight.
- Apply light inline styling (e.g., font size, spacing, and bold labels) for clarity.
- Strictly stay within the topic of energy usage.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content.trim();
};
