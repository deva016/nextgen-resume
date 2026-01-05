import Link from "next/link";
import { Calendar, FileText, Pencil } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface ResumeCardProps {
  resume: {
    id: string;
    title: string | null;
    updatedAt: Date;
    atsScore?: {
      overallScore: number;
    } | null;
  };
}

export default function ResumeCard({ resume }: ResumeCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (score >= 60) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  const score = resume.atsScore?.overallScore;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10">
      {/* Gradient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-purple-400" />
            <h3 className="font-semibold text-white">
              {resume.title || "Untitled Resume"}
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="size-3" />
              <span>
                Updated {formatDistanceToNow(new Date(resume.updatedAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* ATS Score Badge */}
          {score !== undefined && score !== null ? (
            <div
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm font-semibold",
                getScoreColor(score)
              )}
            >
              ATS: {score}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-500/30 bg-gray-500/10 px-3 py-1.5 text-sm text-gray-400">
              Not checked
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-1">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="size-8 hover:bg-white/10"
            >
              <Link href={`/editor?resumeId=${resume.id}`}>
                <Pencil className="size-4" />
                <span className="sr-only">Edit resume</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="icon"
              className="size-8 hover:bg-white/10"
            >
              <Link href={`/resumes/${resume.id}/ats`}>
                <FileText className="size-4" />
                <span className="sr-only">Check ATS</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
