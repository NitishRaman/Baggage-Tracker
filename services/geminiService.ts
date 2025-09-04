
import { GoogleGenAI } from "@google/genai";
import type { Baggage } from '../types';

// IMPORTANT: Do NOT expose this key publicly.
// It is assumed that process.env.API_KEY is configured in the build environment.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. Chatbot will be disabled.");
} else {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}


export const getChatbotResponse = async (
  userMessage: string,
  baggage: Baggage
): Promise<string> => {
  if (!ai) {
    return "I am currently offline as my AI configuration is missing. Please check your baggage location above.";
  }
  
  const model = 'gemini-2.5-flash';

  const systemInstruction = `You are a friendly and professional airline baggage assistant for FlyRight Airlines. 
  Your goal is to provide helpful and concise information about the passenger's baggage. 
  Be reassuring and polite. Do not invent information.
  The current baggage location is provided to you.`;

  const prompt = `A passenger has asked: "${userMessage}".

  Here is their baggage information:
  - Baggage ID: ${baggage.id}
  - Current Location: ${baggage.location}
  - Last Seen: ${new Date(baggage.lastSeen).toLocaleString()}

  Based ONLY on this information, provide a helpful response. If the user asks for an ETA, state that you cannot provide an exact ETA but can confirm its current location.
  `;
  
  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.5,
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm sorry, I'm having trouble connecting to my systems right now. Please try again in a moment.";
  }
};
