import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { FileText, BarChart3, Plus, ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import StatsCard from "@/components/dashboard/StatsCard";
import ResumeCard from "@/components/dashboard/ResumeCard";
import EmptyState from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";

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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Recent Resumes</h2>
              {totalResumes > 5 && (
                <Button asChild variant="ghost" className="text-purple-400">
                  <Link href="/resumes">
                    View All
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-xl font-bold text-white">Quick Actions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="justify-start border-white/10 bg-white/5 hover:bg-white/10"
              >
                <Link href="/editor">
                  <Plus className="mr-2 size-4" />
                  Create New Resume
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="justify-start border-white/10 bg-white/5 hover:bg-white/10"
              >
                <Link href="/check-ats">
                  <BarChart3 className="mr-2 size-4" />
                  Check ATS Score
                </Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
