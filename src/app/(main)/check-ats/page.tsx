"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, Loader2, FileText } from "lucide-react";
import Link from "next/link";

interface Resume {
  id: string;
  title: string | null;
  description: string | null;
  updatedAt: Date;
}

export default function CheckATSPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resumes")
      .then((res) => res.json())
      .then((data) => {
        setResumes(data);
        setLoading(false);
        
        // If user has exactly one resume, redirect directly to its ATS page
        if (data.length === 1) {
          router.push(`/resumes/${data[0].id}/ats`);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        {/* Animated Background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-600/30 blur-[120px]" />
          <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-pink-600/20 blur-[120px]" />
        </div>

        <div className="relative flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
        </div>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        {/* Animated Background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-600/30 blur-[120px]" />
          <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-pink-600/20 blur-[120px]" />
        </div>

        <main className="relative mx-auto max-w-4xl px-6 py-20">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/20">
              <BarChart3 className="h-10 w-10 text-purple-400" />
            </div>
            <h1 className="mb-4 text-3xl font-bold">No Resumes Found</h1>
            <p className="mb-8 text-gray-400">
              You need to create a resume before you can check its ATS compatibility.
            </p>
            <Link
              href="/resumes"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold transition-all hover:from-purple-700 hover:to-pink-700"
            >
              Create Resume
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-pink-600/20 blur-[120px]" />
      </div>

      <main className="relative mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20">
            <BarChart3 className="h-8 w-8 text-purple-400" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">Check ATS Compatibility</h1>
          <p className="text-gray-400">
            Select a resume to analyze its compatibility with Applicant Tracking Systems
          </p>
        </div>

        {/* Resume List */}
        <div className="space-y-4">
          {resumes.map((resume) => (
            <Link
              key={resume.id}
              href={`/resumes/${resume.id}/ats`}
              className="block rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20">
                  <FileText className="h-6 w-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {resume.title || "Untitled Resume"}
                  </h3>
                  {resume.description && (
                    <p className="text-sm text-gray-400">{resume.description}</p>
                  )}
                </div>
                <BarChart3 className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
