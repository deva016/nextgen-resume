import { formatDistanceToNow } from "date-fns";
import { Building2, MapPin, DollarSign, ExternalLink } from "lucide-react";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string | null;
    postedDate: Date;
    url: string;
  };
  matchScore: number;
  matchReasons: string[];
}

export default function JobCard({ job, matchScore, matchReasons }: JobCardProps) {
  // Color code match score like ATS
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-orange-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500/20 border-green-500/30";
    if (score >= 60) return "bg-yellow-500/20 border-yellow-500/30";
    return "bg-orange-500/20 border-orange-500/30";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent Match";
    if (score >= 60) return "Good Match";
    return "Fair Match";
  };

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10">
      <div className="flex items-start justify-between gap-4">
        {/* Job Info */}
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-orange-400 group-hover:bg-clip-text group-hover:text-transparent">
            {job.title}
          </h3>

          <div className="mb-3 space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Building2 className="h-4 w-4" />
              {job.company}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4" />
              {job.location}
            </div>

            {job.salary && (
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <DollarSign className="h-4 w-4" />
                {job.salary}
              </div>
            )}

            <p className="text-xs text-gray-500">
              Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
            </p>
          </div>

          {/* Match Reasons */}
          {matchReasons.length > 0 && (
            <div className="space-y-1">
              {matchReasons.slice(0, 2).map((reason, idx) => (
                <p key={idx} className="text-xs text-gray-400">
                  ✓ {reason}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Match Score Badge */}
        <div className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-3 ${getScoreBg(matchScore)}`}>
          <div className={`text-2xl font-bold ${getScoreColor(matchScore)}`}>
            {matchScore}%
          </div>
          <div className="text-xs text-gray-400">
            {getScoreLabel(matchScore)}
          </div>
        </div>
      </div>

      {/* View Job Button */}
      <div className="mt-4 flex gap-3">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-pink-700"
        >
          <ExternalLink className="h-4 w-4" />
          View Job
        </a>
      </div>
    </div>
  );
}
