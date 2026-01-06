import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { FileText, BarChart3, Plus } from "lucide-react";
import prisma from "@/lib/prisma";
import StatsCard from "@/components/dashboard/StatsCard";
import ResumeCard from "@/components/dashboard/ResumeCard";
import EmptyState from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import JobRecommendationsSection from "./JobRecommendationsSection";

export const metadata: Metadata = {
  title: "Dashboard - NextGen Resume",
};

async function getDashboardData(userId: string) {
  const [resumes, totalResumes] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      include: { atsScore: true },
      orderBy: { updatedAt: "desc" },
      take: 5, // Show recent 5 resumes
    }),
    prisma.resume.count({
      where: { userId },
    }),
  ]);

  // Calculate average ATS score
  const resumesWithScores = resumes.filter((r) => r.atsScore);
  const avgScore =
    resumesWithScores.length > 0
      ? Math.round(
          resumesWithScores.reduce(
            (sum, r) => sum + (r.atsScore?.overallScore || 0),
            0
          ) / resumesWithScores.length
        )
      : null;

  return { resumes, totalResumes, avgScore };
}

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const { resumes, totalResumes, avgScore } = await getDashboardData(userId);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-4xl font-bold text-transparent">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-400">
            Track your resume performance and ATS scores
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Link href="/editor">
            <Plus className="mr-2 size-4" />
            Create Resume
          </Link>
        </Button>
      </div>

      {totalResumes === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <StatsCard
              title="Total Resumes"
              value={totalResumes}
              icon={FileText}
              subtitle={`${totalResumes} ${totalResumes === 1 ? "resume" : "resumes"} created`}
            />

            <StatsCard
              title="Average ATS Score"
              value={avgScore !== null ? avgScore : "N/A"}
              icon={BarChart3}
              subtitle={
                avgScore !== null
                  ? avgScore >= 80
                    ? "Excellent compatibility"
                    : avgScore >= 60
                    ? "Good compatibility"
                    : "Needs improvement"
                  : "Check your resumes"
              }
              trend={
                avgScore !== null
                  ? avgScore >= 80
                    ? "up"
                    : avgScore >= 60
                    ? "neutral"
                    : "down"
                  : undefined
              }
            />
          </div>

          {/* Recent Resumes */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Recent Resumes</h2>
              {resumes.length > 5 && (
                <Link
                  href="/resumes"
                  className="text-sm text-purple-400 transition-colors hover:text-purple-300"
                >
                  View All →
                </Link>
              )}
            </div>

            <div className="space-y-4">
              {resumes.map((resume) => (
                <ResumeCard
                  key={resume.id}
                  resume={{
                    id: resume.id,
                    title: resume.title,
                    updatedAt: resume.updatedAt,
                    atsScore: resume.atsScore
                      ? { overallScore: resume.atsScore.overallScore }
                      : null,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Job Recommendations - Show if user has resumes */}
          {resumes.length > 0 && <JobRecommendationsSection resumeId={resumes[0].id} />}

          {/* Quick Actions */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-white">Quick Actions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/editor"
                className="group rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-1 font-semibold text-white">Create New Resume</h3>
                <p className="text-sm text-gray-400">
                  Start building a professional resume
                </p>
              </Link>

              <Link
                href="/check-ats"
                className="group rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-600 to-red-600">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-1 font-semibold text-white">Check ATS Score</h3>
                <p className="text-sm text-gray-400">
                  Analyze resume compatibility
                </p>
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
