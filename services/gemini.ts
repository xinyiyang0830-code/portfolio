
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (userPrompt: string) => {
  // Use process.env.API_KEY directly as it's guaranteed to be available
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: `You are an AI assistant for Yang Xinyi's professional design portfolio. 
        Yang Xinyi is a designer and researcher focusing on Digital Media Arts and Cultural Heritage Digitalization.
        Key areas of work include:
        1. Music Visualization (e.g., Suzhou Code in Subway Stations, Xiaoshi lantern visualization, Xian drum music).
        2. Virtual Reality (e.g., Taihu Lake Stone VR space).
        3. Motion Video (e.g., 24 Solar Terms posters, Hidden Eyes animation).
        4. Theme and Image Design (e.g., National Art Fund visual design, Banpo Culture IP).
        
        Answer questions about their design philosophy (traditional culture heritage combined with digital art) and projects. 
        Keep responses professional, creative, and concise. Encourage visitors to explore the 'Work' page or 'About' page.`,
        temperature: 0.7,
      },
    });
    // Use .text property directly (not a method)
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a bit of trouble thinking right now. Please try again later!";
  }
};
