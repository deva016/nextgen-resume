"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BarChart3, Upload, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import ScoreGauge from "@/components/ats/ScoreGauge";
import ScoreBreakdown from "@/components/ats/ScoreBreakdown";
import SuggestionsList from "@/components/ats/SuggestionsList";
import Link from "next/link";

interface ATSCheckPageProps {
  params: Promise<{ id: string }>;
}

interface ATSResult {
  overallScore: number;
  keywordScore: number;
  formattingScore: number;
  contentScore: number;
  suggestions: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

export default function ATSCheckPage({ params }: ATSCheckPageProps) {
  const router = useRouter();
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Unwrap params
  useEffect(() => {
    params.then((p) => setResumeId(p.id));
  }, [params]);

  // Auto-analyze resume when page loads with a resume ID
  useEffect(() => {
    if (resumeId && !result && !loading) {
      handleAnalyze();
    }
  }, [resumeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!validTypes.includes(selectedFile.type)) {
        setError("Please upload a PDF or DOCX file");
        return;
      }
      // Validate file size (5MB max)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setFile(selectedFile);
      setError("");
    }
  };

  const handleAnalyze = async () => {
    if (!resumeId) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      if (file) {
        formData.append("file", file);
      }
      if (jobDescription.trim()) {
        formData.append("jobDescription", jobDescription.trim());
      }

      const response = await fetch("/api/ats/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setResult(data.atsScore);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-pink-600/20 blur-[120px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/resumes"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resumes
          </Link>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-500/20 p-3">
              <BarChart3 className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">ATS Compatibility Check</h1>
              <p className="text-gray-400">
                Analyze your resume against Applicant Tracking Systems
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          /* Loading Skeleton */
          <div className="space-y-8">
            {/* Score Gauge Skeleton */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="relative flex flex-col items-center gap-6">
                <div className="h-48 w-48 animate-pulse rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                <div className="space-y-2 text-center">
                  <div className="mx-auto h-12 w-32 animate-pulse rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30" />
                  <div className="mx-auto h-5 w-48 animate-pulse rounded bg-white/10" />
                </div>
              </div>
            </div>

            {/* Score Breakdown Skeleton */}
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative space-y-3">
                    <div className="h-5 w-32 animate-pulse rounded bg-white/20" />
                    <div className="h-10 w-20 animate-pulse rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30" />
                    <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions Skeleton */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="relative space-y-6">
                <div className="h-7 w-64 animate-pulse rounded-lg bg-white/20" />
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex gap-3">
                      <div className="h-6 w-6 flex-shrink-0 animate-pulse rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-full animate-pulse rounded bg-white/15" />
                        <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : !result ? (
          /* Upload Form */
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <Label htmlFor="file-upload" className="mb-2 block text-sm font-medium">
                  Upload Resume (Optional)
                </Label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="file-upload"
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-3 transition-all hover:bg-white/10"
                  >
                    <Upload className="h-5 w-5" />
                    <span className="text-sm">
                      {file ? file.name : "Choose PDF or DOCX"}
                    </span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Upload a resume file (PDF or DOCX) or we&apos;ll use your current resume data (Max 5MB)
                </p>
              </div>

              {/* Job Description */}
              <div>
                <Label htmlFor="job-description" className="mb-2 block text-sm font-medium">
                  Job Description (Optional)
                </Label>
                <Textarea
                  id="job-description"
                  placeholder="Paste the job description here to get tailored feedback..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={6}
                  className="resize-none border-white/20 bg-white/5 focus:border-purple-500/50"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Adding a job description will provide more specific keyword matching
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                disabled={loading || !resumeId}
                className="w-full gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-6 text-lg font-semibold shadow-lg shadow-purple-500/25 transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          /* Results */
          <div className="space-y-8">
            {/* Overall Score */}
            <div className="flex justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <ScoreGauge score={result.overallScore} label="Overall ATS Score" size="lg" />
            </div>

            {/* Breakdown and Suggestions */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Score Breakdown */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <ScoreBreakdown
                  keywordScore={result.keywordScore}
                  formattingScore={result.formattingScore}
                  contentScore={result.contentScore}
                />
              </div>

              {/* Suggestions */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <SuggestionsList
                  suggestions={result.suggestions}
                  matchedKeywords={result.matchedKeywords}
                  missingKeywords={result.missingKeywords}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={() => setResult(null)}
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10"
              >
                Analyze Again
              </Button>
              <Button
                onClick={() => router.push(`/editor?resumeId=${resumeId}`)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Edit Resume
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
