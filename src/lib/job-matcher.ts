/**
 * Resume-to-Job Matching Algorithm
 * 
 * Matches user resumes with job postings using multiple factors
 */

import { Resume, ATSScore } from "@prisma/client";
import { Job } from "./adzuna";

export interface JobMatch {
  job: Job;
  matchScore: number; // 0-100
  matchReasons: string[];
  keywordMatches: string[];
  missingKeywords: string[];
}

export interface ResumeData extends Resume {
  atsScore: ATSScore | null;
}

/**
 * Calculate how well a resume matches a job
 * 
 * Scoring breakdown:
 * - Keywords/Skills (40%): Match resume skills with job requirements
 * - Experience Level (30%): Match years of experience
 * - Location (20%): Geographic proximity or remote compatibility
 * - ATS Score (10%): Higher ATS scores get bonus points
 */
export function calculateMatchScore(
  resume: ResumeData,
  job: Job
): { score: number; reasons: string[]; keywordMatches: string[]; missingKeywords: string[] } {
  const reasons: string[] = [];
  let totalScore = 0;

  // 1. KEYWORD MATCHING (40 points max)
  const resumeKeywords = extractResumeKeywords(resume);
  const jobKeywords = extractJobKeywords(job);
  
  const { matched, missing, matchPercentage } = compareKeywords(
    resumeKeywords,
    jobKeywords
  );

  const keywordScore = Math.round(matchPercentage * 0.4);
  totalScore += keywordScore;

  if (matchPercentage >= 80) {
    reasons.push(`${Math.round(matchPercentage)}% keyword match - Excellent fit!`);
  } else if (matchPercentage >= 60) {
    reasons.push(`${Math.round(matchPercentage)}% keyword match - Good fit`);
  } else if (matchPercentage >= 40) {
    reasons.push(`${Math.round(matchPercentage)}% keyword match - Partial fit`);
  }

  // 2. EXPERIENCE LEVEL MATCHING (30 points max)
  const experienceScore = calculateExperienceMatch(resume, job);
  totalScore += experienceScore;

  if (experienceScore >= 25) {
    reasons.push("Experience level matches job requirements");
  } else if (experienceScore >= 15) {
    reasons.push("Experience level somewhat matches");
  }

  // 3. LOCATION MATCHING (20 points max)
  const locationScore = calculateLocationMatch(resume, job);
  totalScore += locationScore;

  if (locationScore >= 15) {
    reasons.push("Location is a great match");
  } else if (locationScore >= 10 && job.location.toLowerCase().includes("remote")) {
    reasons.push("Remote opportunity available");
  }

  // 4. ATS SCORE BONUS (10 points max)
  if (resume.atsScore) {
    const atsBonus = Math.round((resume.atsScore.overallScore / 100) * 10);
    totalScore += atsBonus;
    
    if (resume.atsScore.overallScore >= 80) {
      reasons.push("Your resume has a strong ATS score");
    }
  }

  return {
    score: Math.min(100, totalScore),
    reasons,
    keywordMatches: matched,
    missingKeywords: missing,
  };
}

/**
 * Extract keywords from resume
 */
export function extractResumeKeywords(resume: ResumeData): string[] {
  const keywords = new Set<string>();

  // Add keywords from skills (HTML text)
  if (resume.skills) {
    extractKeywordsFromText(resume.skills as string).forEach((kw) => keywords.add(kw));
  }

  // Add keywords from languages (HTML text)
  if (resume.languages) {
    extractKeywordsFromText(resume.languages as string).forEach((kw) => keywords.add(kw));
  }

  // Add keywords from strengths (HTML text)
  if (resume.strengths) {
    extractKeywordsFromText(resume.strengths as string).forEach((kw) => keywords.add(kw));
  }

  // Extract keywords from summary
  if (resume.summary) {
    extractKeywordsFromText(resume.summary).forEach((kw) => keywords.add(kw));
  }

  return Array.from(keywords);
}

/**
 * Extract keywords from job posting
 */
export function extractJobKeywords(job: Job): string[] {
  const keywords = new Set<string>();

  // Extract from title
  extractKeywordsFromText(job.title).forEach((kw) => keywords.add(kw));

  // Extract from description
  extractKeywordsFromText(job.description).forEach((kw) => keywords.add(kw));

  // Common tech/skill keywords to prioritize
  const techKeywords = [
    "javascript", "typescript", "python", "java", "react", "node",
    "sql", "aws", "docker", "kubernetes", "api", "agile", "scrum",
    "frontend", "backend", "fullstack", "mobile", "cloud", "devops"
  ];

  techKeywords.forEach((tech) => {
    if (job.description.toLowerCase().includes(tech) || 
        job.title.toLowerCase().includes(tech)) {
      keywords.add(tech);
    }
  });

  return Array.from(keywords);
}

/**
 * Compare resume keywords with job keywords
 */
function compareKeywords(
  resumeKeywords: string[],
  jobKeywords: string[]
): { matched: string[]; missing: string[]; matchPercentage: number } {
  const matched: string[] = [];
  const missing: string[] = [];

  const resumeSet = new Set(resumeKeywords.map((k) => k.toLowerCase()));

  jobKeywords.forEach((jobKw) => {
    const jobKwLower = jobKw.toLowerCase();
    
    // Exact match
    if (resumeSet.has(jobKwLower)) {
      matched.push(jobKw);
    } 
    // Partial match (e.g., "javascript" matches "java")
    else if (Array.from(resumeSet).some((rk) => rk.includes(jobKwLower) || jobKwLower.includes(rk))) {
      matched.push(jobKw);
    } else {
      missing.push(jobKw);
    }
  });

  const matchPercentage =
    jobKeywords.length > 0 ? (matched.length / jobKeywords.length) * 100 : 0;

  return { matched, missing, matchPercentage };
}

/**
 * Calculate experience level match
 */
function calculateExperienceMatch(resume: ResumeData, job: Job): number {
  // This is a simplified version - you could enhance it by:
  // 1. Parsing job description for required years
  // 2. Calculating total years from resume work history
  // 3. Matching seniority levels (junior, mid, senior)

  const jobTitle = job.title.toLowerCase();

  // Detect seniority from job
  const isSenior = jobTitle.includes("senior") || jobTitle.includes("lead") || jobTitle.includes("principal");
  const isJunior = jobTitle.includes("junior") || jobTitle.includes("entry");
  const isMid = !isSenior && !isJunior;

  // Estimate resume experience from summary
  const resumeText = (resume.summary || "").toLowerCase();
  const hasSeniorKeywords = resumeText.includes("senior") || resumeText.includes("lead") || resumeText.includes("10+ years");
  const hasJuniorKeywords = resumeText.includes("junior") || resumeText.includes("entry") || resumeText.includes("recent graduate");

  // Simple matching logic
  if (isSenior && hasSeniorKeywords) return 30;
  if (isJunior && hasJuniorKeywords) return 30;
  if (isMid && !hasSeniorKeywords && !hasJuniorKeywords) return 30;
  
  // Partial match
  if (isSenior && !hasJuniorKeywords) return 20;
  if (isJunior) return 15;
  
  return 15; // Default mid-level match
}

/**
 * Calculate location match
 */
function calculateLocationMatch(resume: ResumeData, job: Job): number {
  const resumeLocation = `${resume.city} ${resume.country}`.toLowerCase();
  const jobLocation = job.location.toLowerCase();

  // Remote job - always good match
  if (jobLocation.includes("remote") || jobLocation.includes("anywhere")) {
    return 20;
  }

  // Exact city match
  if (resume.city && jobLocation.includes(resume.city.toLowerCase())) {
    return 20;
  }

  // Same country
  if (resume.country && jobLocation.includes(resume.country.toLowerCase())) {
    return 15;
  }

  // Same state/region (US specific)
  const usStates = ["california", "new york", "texas", "florida"];
  for (const state of usStates) {
    if (resumeLocation.includes(state) && jobLocation.includes(state)) {
      return 12;
    }
  }

  // Default - location doesn't match well
  return 5;
}

/**
 * Extract meaningful keywords from text
 */
function extractKeywordsFromText(text: string): string[] {
  const commonWords = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "up", "about", "into", "through", "during",
    "is", "are", "was", "were", "be", "been", "being", "have", "has", "had",
    "will", "would", "should", "could", "can", "may", "might", "must",
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !commonWords.has(word));

  return Array.from(new Set(words));
}

/**
 * Match a resume to multiple jobs and sort by score
 */
export function matchResumeToJobs(
  resume: ResumeData,
  jobs: Job[]
): JobMatch[] {
  const matches: JobMatch[] = jobs.map((job) => {
    const { score, reasons, keywordMatches, missingKeywords } =
      calculateMatchScore(resume, job);

    return {
      job,
      matchScore: score,
      matchReasons: reasons,
      keywordMatches,
      missingKeywords,
    };
  });

  // Sort by match score (highest first)
  return matches.sort((a, b) => b.matchScore - a.matchScore);
}
