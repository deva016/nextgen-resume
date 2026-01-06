import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { searchJobs } from "@/lib/adzuna";
import { matchResumeToJobs, extractResumeKeywords } from "@/lib/job-matcher";

/**
 * GET /api/jobs/recommendations?resumeId={id}
 * Get personalized job recommendations for a resume
 */
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const resumeId = searchParams.get("resumeId");

    if (!resumeId) {
      return NextResponse.json(
        { error: "Resume ID is required" },
        { status: 400 }
      );
    }

    // Fetch resume with ATS score
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId, userId },
      include: { atsScore: true },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    // Extract keywords from resume for job search
    const keywords = extractResumeKeywords(resume);
    const searchKeywords = keywords.slice(0, 10); // Top 10 keywords

    // Search for jobs
    const { jobs } = await searchJobs(searchKeywords, {
      location: resume.city || resume.country || undefined,
      resultsPerPage: 50, // Get more jobs for better matching
      maxDays: 30, // Last 30 days
    });

    // Match resume to jobs
    const matches = matchResumeToJobs(resume, jobs);

    // Take top 20 matches
    const topMatches = matches.slice(0, 20);

    // Save recommendations to database
    // Note: Since we don't have a unique constraint on (resumeId, jobId),
    // we'll use findFirst + create/update pattern
    await Promise.all(
      topMatches.map(async (match) => {
        const existing = await prisma.jobRecommendation.findFirst({
          where: {
            resumeId,
            jobId: match.job.id,
          },
        });

        if (existing) {
          // Update existing
          await prisma.jobRecommendation.update({
            where: { id: existing.id },
            data: {
              matchScore: match.matchScore,
              matchReasons: match.matchReasons,
              keywordMatches: match.keywordMatches,
              missingKeywords: match.missingKeywords,
            },
          });
        } else {
          // Create new
          await prisma.jobRecommendation.create({
            data: {
              userId,
              resumeId,
              jobId: match.job.id,
              title: match.job.title,
              company: match.job.company,
              location: match.job.location,
              salary: match.job.salary,
              description: match.job.description,
              url: match.job.url,
              postedDate: match.job.postedDate,
              contractType: match.job.contractType,
              category: match.job.category,
              matchScore: match.matchScore,
              matchReasons: match.matchReasons,
              keywordMatches: match.keywordMatches,
              missingKeywords: match.missingKeywords,
            },
          });
        }
      })
    );

    return NextResponse.json({
      recommendations: topMatches,
      resumeId,
      matchCount: topMatches.length,
    });
  } catch (error) {
    console.error("Job recommendations error:", error);
    return NextResponse.json(
      { 
        error: "Failed to get job recommendations",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
