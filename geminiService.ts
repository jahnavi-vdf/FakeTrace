
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, DetectionType } from "./types";

// Always use the process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMedia = async (
  fileBase64: string,
  mimeType: string,
  type: DetectionType
): Promise<AnalysisResult> => {
  // Using gemini-3-pro-preview for advanced reasoning and artifact detection
  const model = "gemini-3-pro-preview";
  
  const systemInstruction = `
    You are a Forensic Investigator trained in Neural Media Authenticity.
    Your mission is to find PROOF of human recording OR proof of synthetic generation.
    
    KEY TRAINING DATA:
    1. REAL MEDIA: Often contains sensor noise (random grain), JPEG compression artifacts (blocks), and motion blur. THESE DO NOT MEAN IT IS FAKE. In fact, a lack of sensor noise is often suspicious.
    2. FAKE MEDIA: Look for 'Diffusion Smoothing' (skin looks like wax), 'Spectral Inconsistency' (reflections don't match light sources), and 'Neural Hallucinations' (warped lines in backgrounds).
    
    VERDICT LOGIC:
    - If you see clear camera noise and organic imperfections: REAL.
    - If you see repetitive AI patterns or unnatural smoothing: FAKE.
    - If media is too low quality to tell: SUSPICIOUS.
    
    BE OBJECTIVE. Do not label things as FAKE just because they look high quality.
  `;

  const prompt = `Conduct a technical audit of this ${type.toUpperCase()}. 
  Search for neural signatures vs camera noise. 
  Output ONLY a valid JSON object matching the provided schema.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { data: fileBase64.split(',')[1], mimeType } },
          { text: prompt }
        ]
      },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            confidence: { type: Type.NUMBER, description: "Confidence score 0-100" },
            label: { type: Type.STRING, description: "REAL, FAKE, or SUSPICIOUS" },
            findings: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific forensic markers found" },
            summary: { type: Type.STRING, description: "Technical summary of analysis" },
            detectionMethodology: { type: Type.STRING, description: "Methodologies applied (e.g. Spectral Noise Analysis)" }
          },
          required: ["confidence", "label", "findings", "summary", "detectionMethodology"]
        }
      }
    });

    const resultText = response.text || '{}';
    return JSON.parse(resultText) as AnalysisResult;
  } catch (error) {
    console.error("Forensic Engine Error:", error);
    throw new Error("Neural Audit failed. Please provide a high-fidelity file.");
  }
};
