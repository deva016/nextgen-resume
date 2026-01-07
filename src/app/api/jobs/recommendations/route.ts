import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { searchJobs, getAdzunaCountryCode } from "@/lib/adzuna";
import { matchResumeToJobs, extractResumeKeywords } from "@/lib/job-matcher";

/**
 * GET /api/jobs/recommendations?resumeId={id}
 * Get personalized job recommendations for a resume
 */
export async function GET(req: NextRequest) {
  let resumeId: string | null = null;
  
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    resumeId = searchParams.get("resumeId");

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
    const countryCode = getAdzunaCountryCode(resume.country);
    
    const { jobs } = await searchJobs(searchKeywords, {
      location: resume.city || undefined,
      countryCode,
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
            resumeId: resumeId!, // Non-null assertion - checked earlier
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
              resumeId: resumeId!, // Non-null assertion - checked earlier
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
      resumeId: resumeId!, // Non-null assertion - checked earlier
      matchCount: topMatches.length,
    });
  } catch (error) {
    console.error("Job recommendations error:", error);
    
    // Check if this is an Adzuna API credential/access issue
    const errorMessage = error instanceof Error ? error.message : String(error);
    const isAdzunaAuthIssue = errorMessage.includes('400') || 
                               errorMessage.includes('credentials') || 
                               errorMessage.includes('nginx');
    
    if (isAdzunaAuthIssue) {
      // Return empty recommendations instead of error for credential issues
      console.log("Adzuna API credentials appear invalid or restricted. Returning empty recommendations.");
      return NextResponse.json({
        recommendations: [],
        resumeId,
        matchCount: 0,
        message: "Job recommendations temporarily unavailable. Please check Adzuna API credentials.",
      });
    }
    
    return NextResponse.json(
      { 
        error: "Failed to get job recommendations",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
