import { GoogleGenAI } from "@google/genai";

export const getAIResponse = async (userPrompt: string) => {
  // 1. 安全地获取 API KEY，防止在静态环境中因为 process 未定义而崩溃
  let apiKey: string | undefined;
  
  try {
    // 只有在定义了 process 的环境下才尝试读取
    if (typeof process !== 'undefined' && process.env) {
      apiKey = process.env.API_KEY;
    }
  } catch (e) {
    console.warn("Process environment is not accessible.");
  }

  // 2. 检查 Key 是否有效（防止为空字符串或特殊占位符）
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("Gemini API Key is missing. Please configure your environment variables.");
    return "抱歉，AI 助手目前尚未配置 API Key，无法回复。如果是部署在 GitHub Pages，请确保在构建流程中注入了该变量，或联系管理员。";
  }

  try {
    // 3. 在函数内部初始化，避免在模块加载时就抛出异常
    const ai = new GoogleGenAI({ apiKey });
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
    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // 捕获具体的 SDK 错误并返回友好提示
    if (error.message?.includes("API Key")) {
      return "配置错误：检测到 API Key 无效或未设置。";
    }
    return "连接 AI 服务时出现问题，请稍后再试。";
  }
};