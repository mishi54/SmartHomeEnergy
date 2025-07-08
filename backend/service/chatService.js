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
  const lowerQuestion = question.toLowerCase();
const relevantDevices = Object.entries(grouped).filter(([name]) => {
  const deviceKeywords = name.toLowerCase().split(" ");
  return deviceKeywords.some(word => lowerQuestion.includes(word));
});

  const devicesToUse = (relevantDevices.length ? relevantDevices : Object.entries(grouped))
    .map(([name, watts]) => {
      const total = watts.reduce((a, b) => a + b, 0);
      const avg = total / watts.length;
      return { name, total, avg };
    })
    .sort((a, b) => b.total - a.total) 
    .slice(0, 2); 

  const summary = devicesToUse.map(
    ({ name, total, avg }) =>
      `${name}: total ${total.toFixed(2)}W, average ${avg.toFixed(2)}W`
  ).join("\n");

  const prompt = `
You are an energy assistant in a smart home web application.

A user sent the following message: "${question}"

Context – this is their summarized energy usage data:
${summary}

Instructions:
- Respond in clear, professional, and natural text — like a real human chat.
- Mention both total and average energy usage for each shown device.
- Only respond based on the data above — do not guess or fabricate values.
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
