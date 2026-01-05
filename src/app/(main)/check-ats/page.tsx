"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BarChart3, Upload, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import ScoreGauge from "@/components/ats/ScoreGauge";
import ScoreBreakdown from "@/components/ats/ScoreBreakdown";
import SuggestionsList from "@/components/ats/SuggestionsList";

interface ATSResult {
  overallScore: number;
  keywordScore: number;
  formattingScore: number;
  contentScore: number;
  suggestions: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

export default function CheckATSPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    if (!file) {
      setError("Please upload a resume file");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
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

      <main className="relative mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20">
            <BarChart3 className="h-8 w-8 text-purple-400" />
          </div>
          <h1 className="mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-4xl font-bold text-transparent">
            Check ATS Compatibility
          </h1>
          <p className="text-gray-400">
            Upload your resume to analyze its compatibility with Applicant Tracking Systems
          </p>
        </div>

        {result ? (
          /* Results Display */
          <div className="space-y-8">
            {/* Back Button */}
            <button
              onClick={() => setResult(null)}
              className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Check Another Resume
            </button>

            {/* Score Display */}
            <ScoreGauge score={result.overallScore} label="Overall ATS Score" />
            
            <ScoreBreakdown
              keywordScore={result.keywordScore}
              formattingScore={result.formattingScore}
              contentScore={result.contentScore}
            />
            
            <SuggestionsList
              suggestions={result.suggestions}
              matchedKeywords={result.matchedKeywords}
              missingKeywords={result.missingKeywords}
            />
          </div>
        ) : (
          /* Upload Form */
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <Label htmlFor="file-upload" className="mb-2 block text-sm font-medium">
                Upload Resume *
              </Label>
              <label
                htmlFor="file-upload"
                className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/20 bg-white/5 p-12 transition-all hover:border-purple-500/50 hover:bg-white/10"
              >
                <Upload className="h-8 w-8 text-purple-400" />
                <div className="text-center">
                  <p className="font-medium">
                    {file ? file.name : "Choose PDF or DOCX"}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Click to browse or drag and drop (Max 5MB)
                  </p>
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
              />
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
              <p className="mt-2 text-xs text-gray-400">
                Adding a job description will provide more specific keyword matching
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Analyze Resume
                </>
              )}
            </Button>
          </div>
        </div>
        )}
      </main>
    </div>
  );
}
