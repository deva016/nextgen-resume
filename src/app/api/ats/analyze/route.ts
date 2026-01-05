import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parseResume } from "@/lib/ats-parser";
import { calculateATSScore } from "@/lib/ats-scorer";
import { getAISuggestions } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const resumeId = formData.get("resumeId") as string | null;
    const file = formData.get("file") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    if (!file && !resumeId) {
      return NextResponse.json({ error: "Either file or resumeId is required" }, { status: 400 });
    }

    let parsedResume;
    let resume = null;

    // If resumeId is provided, verify ownership and get resume data
    if (resumeId) {
      resume = await prisma.resume.findUnique({
        where: { id: resumeId, userId },
      });

      if (!resume) {
        return NextResponse.json({ error: "Resume not found" }, { status: 404 });
      }
    }

    if (file) {
      // Parse uploaded file
      const fileType = file.name.toLowerCase().endsWith(".pdf") ? "pdf" : "docx";
      const buffer = Buffer.from(await file.arrayBuffer());
      parsedResume = await parseResume(buffer, fileType);
    } else if (resume) {
      // Use existing resume data
      const resumeText = `
${resume.firstName} ${resume.lastName}
${resume.email}
${resume.phone}
${resume.city}, ${resume.country}

${resume.summary || ""}

Skills: ${resume.skills.join(", ")}
Languages: ${resume.languages.join(", ")}
Strengths: ${resume.strengths.join(", ")}
      `.trim();

      parsedResume = {
        text: resumeText,
        sections: [],
        contactInfo: {
          email: resume.email || undefined,
          phone: resume.phone || undefined,
          name: `${resume.firstName} ${resume.lastName}`,
        },
        keywords: resume.skills.map((s) => s.toLowerCase()),
        metrics: [],
      };
    } else {
      return NextResponse.json({ error: "No data to analyze" }, { status: 400 });
    }

    // Calculate ATS score
    const atsScore = calculateATSScore(parsedResume, jobDescription || undefined);

    // Get AI suggestions
    const aiSuggestions = await getAISuggestions(
      parsedResume.text,
      jobDescription || undefined
    );

    // Combine suggestions
    const allSuggestions = [...atsScore.suggestions, ...aiSuggestions];

    // Store in database only if resumeId is provided (existing resume)
    if (resumeId) {
      await prisma.aTSScore.upsert({
        where: { resumeId },
        create: {
          resumeId,
          overallScore: atsScore.overallScore,
          keywordScore: atsScore.keywordScore,
          formattingScore: atsScore.formattingScore,
          contentScore: atsScore.contentScore,
          suggestions: allSuggestions,
          matchedKeywords: atsScore.matchedKeywords,
          missingKeywords: atsScore.missingKeywords,
          jobDescription: jobDescription || undefined,
        },
        update: {
          overallScore: atsScore.overallScore,
          keywordScore: atsScore.keywordScore,
          formattingScore: atsScore.formattingScore,
          contentScore: atsScore.contentScore,
          suggestions: allSuggestions,
          matchedKeywords: atsScore.matchedKeywords,
          missingKeywords: atsScore.missingKeywords,
          jobDescription: jobDescription || undefined,
        },
      });
    }

    return NextResponse.json({
      success: true,
      atsScore: {
        ...atsScore,
        suggestions: allSuggestions,
      },
    });
  } catch (error) {
    console.error("ATS analysis error:", error);
    
    // Check for known errors (like unsupported file type)
    if (error instanceof Error && (error.message.includes("not supported") || error.message.includes("Unsupported"))) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
