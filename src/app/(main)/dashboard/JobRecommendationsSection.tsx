"use client";

import { useEffect, useState } from "react";
import { Briefcase, TrendingUp } from "lucide-react";
import JobCard from "@/components/jobs/JobCard";
import Link from "next/link";

interface JobRecommendationsSectionProps {
  resumeId: string;
}

interface JobMatch {
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

export default function JobRecommendationsSection({ resumeId }: JobRecommendationsSectionProps) {
  const [recommendations, setRecommendations] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await fetch(`/api/jobs/recommendations?resumeId=${resumeId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data = await response.json();
        setRecommendations(data.recommendations.slice(0, 3)); // Top 3 only
      } catch (err) {
        console.error("Error fetching job recommendations:", err);
        setError("Failed to load job recommendations");
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [resumeId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recommended Jobs</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-2xl border border-white/10 bg-white/5"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || recommendations.length === 0) {
    return null; // Don't show section if no recommendations
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
            <Briefcase className="h-5 w-5 text-purple-400" />
            Recommended Jobs
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Personalized matches based on your resume
          </p>
        </div>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1 text-sm text-purple-400 transition-colors hover:text-purple-300"
        >
          <TrendingUp className="h-4 w-4" />
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {recommendations.map((match) => (
          <JobCard
            key={match.job.id}
            job={match.job}
            matchScore={match.matchScore}
            matchReasons={match.matchReasons}
          />
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-white transition-all hover:bg-white/10"
        >
          Explore More Jobs
        </Link>
      </div>
    </div>
  );
}
