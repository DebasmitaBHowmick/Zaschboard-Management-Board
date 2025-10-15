import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

export const useAISummary = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSummary = async (text) => {
    if (!text?.trim()) {
      setError("Please enter some notes or details to summarize.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const ai = new GoogleGenerativeAI(apiKey);
      const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `
        Summarize the following text in 2–3 concise, professional sentences.
        Focus on key actions, outcomes, and results:
        
        ${text}
      `;

      const result = await model.generateContent(prompt);


      const aiText = result.response.text();
      //console.log("AI Summary:", aiText);

      setSummary(aiText || "No summary generated.");
      return aiText;
    } catch (err) {
      console.error("AI Summary Error:", err);
      setError("Failed to generate AI summary. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { summary, setSummary, loading, error, generateSummary };
};



