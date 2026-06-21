
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyCxNmmOItdaR7NbRfNj0di5HyuwdFb1-tQ" });

async function getGeminiResponse(prompt) {
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