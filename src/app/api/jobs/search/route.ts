import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { searchJobs } from "@/lib/adzuna";

/**
 * POST /api/jobs/search
 * Search for jobs using Adzuna API
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      keywords = [],
      location,
      page = 1,
      resultsPerPage = 20,
      maxDays,
      minSalary,
      maxSalary,
      contractType,
      category,
    } = body;

    if (!keywords || keywords.length === 0) {
      return NextResponse.json(
        { error: "Keywords are required" },
        { status: 400 }
      );
    }

    // Search jobs
    const { jobs, totalCount } = await searchJobs(keywords, {
      location,
      page,
      resultsPerPage,
      maxDays,
      minSalary,
      maxSalary,
      contractType,
      category,
    });

    return NextResponse.json({
      jobs,
      totalResults: totalCount,
      page,
      hasMore: jobs.length === resultsPerPage,
    });
  } catch (error) {
    console.error("Job search error:", error);
    return NextResponse.json(
      { error: "Failed to search jobs" },
      { status: 500 }
    );
  }
}
