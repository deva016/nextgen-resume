import { GoogleGenerativeAI } from "@google/generative-ai";

// Lazy initialization to avoid build-time errors
let genAI: GoogleGenerativeAI | null = null;

export function getGenAI() {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

export async function getAISuggestions(
  resumeText: string,
  jobDescription?: string
): Promise<string[]> {
  try {
    const model = getGenAI().getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = jobDescription
      ? `Analyze this resume and provide 5 specific, actionable suggestions to improve it for this job description. Focus on keywords, skills, and experience alignment.

Resume:
${resumeText}

Job Description:
${jobDescription}

Provide exactly 5 bullet-point suggestions.`
      : `Analyze this resume and provide 5 specific, actionable suggestions to improve its ATS compatibility and overall quality.

Resume:
${resumeText}

Provide exactly 5 bullet-point suggestions focusing on:
1. Keywords and skills
2. Quantifiable achievements
3. Clear formatting
4. Action verbs
5. Overall impact`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse suggestions from response
    const suggestions = text
      .split("\n")
      .filter((line) => line.trim().match(/^[-*•]\s/))
      .map((line) => line.replace(/^[-*•]\s/, "").trim())
      .filter((s) => s.length > 0)
      .slice(0, 5);

    return suggestions.length > 0
      ? suggestions
      : ["Ensure contact information is complete", "Add quantifiable achievements", "Use strong action verbs"];
  } catch (error) {
    console.error("Gemini AI error:", error);
    // Return fallback suggestions if AI fails
    return [
      "Ensure your contact information is complete and up-to-date",
      "Add quantifiable achievements with numbers and metrics",
      "Use strong action verbs at the beginning of bullet points",
      "Tailor your resume to match the job description keywords",
      "Keep formatting simple and ATS-friendly",
    ];
  }
}

export async function enhanceBulletPoint(bulletPoint: string): Promise<string> {
  try {
    const model = getGenAI().getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Improve this resume bullet point to be more impactful and ATS-friendly. Make it start with a strong action verb and include quantifiable results if possible.

Original: ${bulletPoint}

Return ONLY the improved bullet point, nothing else.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhanced = response.text().trim();

    return enhanced || bulletPoint;
  } catch (error) {
    console.error("Gemini AI error:", error);
    return bulletPoint;
  }
}

export async function generateSummaryAI(
  jobTitle: string,
  workExperiences: string,
  educations: string,
  skills: string
): Promise<string> {
  try {
    const model = getGenAI().getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a professional resume writer. Write a compelling professional profile summary for a resume based on the following details. Keep it concise (3-4 sentences), impactful, and ATS-friendly.

Job Title: ${jobTitle}
Skills: ${skills}
Work Experience:
${workExperiences}
Education:
${educations}

Return ONLY the summary text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini AI error:", error);
    throw new Error("Failed to generate summary");
  }
}

export async function generateWorkExperienceAI(description: string): Promise<{
  position: string;
  company: string;
  startDate?: string;
  endDate?: string;
  description: string;
}> {
  try {
    const model = getGenAI().getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Parse the following work experience description and format it into a structured entry. also rewrite the description to be professional bullet points.
    
    Input: "${description}"
    
    Return a JSON object with the following structure (do not include markdown formatting like \`\`\`json):
    {
      "position": "Job Title",
      "company": "Company Name",
      "startDate": "YYYY-MM-DD" (or null if not found),
      "endDate": "YYYY-MM-DD" (or null if not found),
      "description": "• Bullet point 1\n• Bullet point 2"
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini AI error:", error);
    throw new Error("Failed to generate work experience");
  }
}
