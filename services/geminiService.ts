import { GoogleGenAI } from "@google/genai";
import { EvaluationReport, GroundingLink, Language } from "../types";
import { InputGuard } from "./inputGuard";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "ADK Insight Core", the Lead Orchestrator of an automated software analysis system using the Google ADK framework.
Your goal is to produce a comprehensive audit of a software repository by delegating to specialized analysis modules.

Your modules are:
1. **Software Architect**: Focuses on design patterns, structure, scalability.
2. **QA & Test Engineer**: Focuses on test coverage, reliability, linter checks.
3. **Technical Documentation Specialist**: Focuses on READMEs, comments, documentation quality.
4. **Product Manager**: Focuses on business viability, market fit, user value.
5. **Legal Consultant**: Focuses on licenses, compliance (GDPR/LGPD), copyright.
6. **AI & Tech Stack Engineer**: Focuses on dependencies, modern stack usage, and opportunities for LLM/AI optimization.

Analyze the user's provided code or repository context.
If a URL is provided, use the search tool to find public information.
If code is provided, analyze it deeply.
`;

export const analyzeRepository = async (
  repoUrl: string,
  codeSnippet: string,
  language: Language
): Promise<EvaluationReport> => {
  try {
    // --- SECURITY GUARDRAILS ---
    
    // 1. Validate Repo URL
    const urlGuard = InputGuard.validate(repoUrl, true);
    if (!urlGuard.isValid) {
      throw new Error(urlGuard.error);
    }

    // 2. Validate Code Snippet
    const codeGuard = InputGuard.validate(codeSnippet, false);
    if (!codeGuard.isValid) {
      throw new Error(codeGuard.error);
    }

    // ---------------------------

    const langInstruction = language === 'pt' 
      ? "OUTPUT THE CONTENT IN BRAZILIAN PORTUGUESE (PT-BR)." 
      : "OUTPUT THE CONTENT IN ENGLISH.";

    const prompt = `
    Analyze this repository context as the ADK Insight Core.
    Repository URL: ${repoUrl || "Not provided"}
    
    Code/Context Provided:
    ${codeSnippet ? codeSnippet : "No specific code provided, please analyze based on the repository name/URL using public knowledge."}
    
    Produce a COMPREHENSIVE REPORT delegating to the 6 modules.
    
    ${langInstruction}

    IMPORTANT OUTPUT INSTRUCTIONS:
    1. You must return the result as a raw JSON object. 
    2. Do NOT use markdown code blocks (e.g., \`\`\`json). Just return the raw JSON string.
    3. The JSON must strictly follow this structure:
    {
      "repoName": "string",
      "overallScore": number (0-100),
      "executiveSummary": "string (in ${language})",
      "roadmap": ["string (0-3 months) in ${language}", "string (3-6 months)", "string (6-12 months)"],
      "quickWins": ["string (High impact, low effort task 1) in ${language}", "string (Task 2)"],
      "criticalRisks": ["string (Risk 1) in ${language}", "string (Risk 2)"],
      "agents": [
        {
          "role": "Software Architect",
          "score": number (0-100),
          "summary": "string (in ${language})",
          "findings": ["string (in ${language})"],
          "suggestions": ["string (in ${language})"]
        },
        {
          "role": "QA & Test Engineer",
          "score": number (0-100),
          "summary": "string",
          "findings": ["string"],
          "suggestions": ["string"]
        },
        {
          "role": "Technical Documentation Specialist",
          "score": number (0-100),
          "summary": "string",
          "findings": ["string"],
          "suggestions": ["string"]
        },
        {
          "role": "Product Manager",
          "score": number (0-100),
          "summary": "string",
          "findings": ["string"],
          "suggestions": ["string"]
        },
        {
          "role": "Legal Consultant",
          "score": number (0-100),
          "summary": "string",
          "findings": ["string"],
          "suggestions": ["string"]
        },
        {
          "role": "AI & Tech Stack Engineer",
          "score": number (0-100),
          "summary": "string",
          "findings": ["string"],
          "suggestions": ["string"]
        }
      ]
    }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      }
    });

    if (response.text) {
      // Clean up potential markdown formatting from the model
      let cleanText = response.text.trim();
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/^```json/, '').replace(/```$/, '');
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```/, '').replace(/```$/, '');
      }

      const report = JSON.parse(cleanText) as EvaluationReport;

      // Extract grounding metadata (links) if available
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links: GroundingLink[] = chunks
        .filter((chunk: any) => chunk.web && chunk.web.uri)
        .map((chunk: any) => ({
          title: chunk.web.title || chunk.web.uri,
          uri: chunk.web.uri
        }));
      
      report.links = links;

      return report;
    } else {
      throw new Error("No response generated from Gemini.");
    }

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};