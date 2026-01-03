"use server";

import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { generateSummaryAI, generateWorkExperienceAI, enhanceBulletPoint } from "@/lib/gemini";

export async function generateSummary(input: GenerateSummaryInput): Promise<string> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { jobTitle, workExperiences, educations, skills } = generateSummarySchema.parse(input);

  const experienceString = workExperiences
    ?.map(
      (exp) => `Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} (${exp.startDate || "N/A"} - ${exp.endDate || "Present"})\n${exp.description || ""}`
    )
    .join("\n\n") || "None";

  const educationString = educations
    ?.map(
      (edu) => `Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} (${edu.startDate || "N/A"} - ${edu.endDate || "N/A"})`
    )
    .join("\n\n") || "None";

  return generateSummaryAI(
    jobTitle || "Job Seeker",
    experienceString,
    educationString,
    Array.isArray(skills) ? skills.join(", ") : (skills || "None")
  );
}

export async function generateWorkExperience(input: GenerateWorkExperienceInput): Promise<WorkExperience> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { description } = generateWorkExperienceSchema.parse(input);

  return generateWorkExperienceAI(description);
}

export async function enhanceContent(text: string): Promise<string> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return enhanceBulletPoint(text);
}
