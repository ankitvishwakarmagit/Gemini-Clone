
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

async function getGeminiResponse(prompt) {
  if (!apiKey) {
    throw new Error(
      "Missing VITE_GEMINI_API_KEY. Please add your API key to the .env file."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }]
  });

  return (
    response?.candidates?.[0]?.content?.parts?.[0]?.text ||
    response?.text ||
    "No response"
  );
}

export default getGeminiResponse;