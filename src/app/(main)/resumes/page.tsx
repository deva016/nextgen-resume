import { canCreateResume } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import CreateResumeButton from "./CreateResumeButton";
import ResumeItem from "./ResumeItem";
import { FileText, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Your resumes",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-6 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
            <FileText className="h-3 w-3" />
            Resume Dashboard
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Your Resumes
          </h1>
          <p className="text-gray-400">
            {totalCount === 0 
              ? "Create your first resume to get started" 
              : `You have ${totalCount} resume${totalCount === 1 ? "" : "s"}`
            }
          </p>
        </div>
        <CreateResumeButton canCreate={canCreateResume()} />
      </div>

      {/* Resumes Grid */}
      {resumes.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {resumes.map((resume) => (
            <ResumeItem key={resume.id} resume={resume} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-purple-400" />
            <h2 className="mb-2 text-xl font-semibold">No resumes yet</h2>
            <p className="mb-6 text-gray-400">
              Create your first AI-powered resume and land your dream job
            </p>
            <CreateResumeButton canCreate={canCreateResume()} />
          </div>
        </div>
      )}
    </main>
  );
}
