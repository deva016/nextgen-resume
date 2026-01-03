import { ParsedResume } from "./ats-parser";

export interface ATSScores {
  overallScore: number; // 0-100
  keywordScore: number; // 0-100
  formattingScore: number; // 0-100
  contentScore: number; // 0-100
  suggestions: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

/**
 * Calculate keyword score based on resume content and optional job description
 */
export function calculateKeywordScore(
  resume: ParsedResume,
  jobDescription?: string
): { score: number; matched: string[]; missing: string[] } {
  const resumeKeywords = new Set(resume.keywords.map((k) => k.toLowerCase()));
  let targetKeywords: string[] = [];

  if (jobDescription) {
    // Extract keywords from job description
    const jobText = jobDescription.toLowerCase();
    const commonJobKeywords = [
      "experience", "years", "bachelor", "master", "degree",
      "javascript", "typescript", "python", "java", "react", "node",
      "aws", "azure", "docker", "kubernetes",
      "agile", "scrum", "leadership", "team",
      "api", "database", "sql", "nosql",
    ];

    targetKeywords = commonJobKeywords.filter((kw) => jobText.includes(kw));
  } else {
    // General industry keywords
    targetKeywords = [
      "experience", "management", "leadership", "communication",
      "agile", "scrum", "api", "database", "cloud",
    ];
  }

  const matched = targetKeywords.filter((kw) => resumeKeywords.has(kw.toLowerCase()));
  const missing = targetKeywords.filter((kw) => !resumeKeywords.has(kw.toLowerCase()));

  const matchRate = targetKeywords.length > 0 ? matched.length / targetKeywords.length : 0.5;
  const score = Math.round(matchRate * 100);

  return {
    score: Math.min(100, score),
    matched,
    missing: missing.slice(0, 10), // Top 10 missing keywords
  };
}

/**
 * Calculate formatting score
 */
export function calculateFormattingScore(resume: ParsedResume): { score: number; issues: string[] } {
  let score = 100;
  const issues: string[] = [];

  // Check for essential sections
  const hasSections = {
    experience: resume.sections.some((s) => s.type === "experience"),
    education: resume.sections.some((s) => s.type === "education"),
    skills: resume.sections.some((s) => s.type === "skills"),
  };

  if (!hasSections.experience) {
    score -= 20;
    issues.push("Missing 'Work Experience' section");
  }
  if (!hasSections.education) {
    score -= 15;
    issues.push("Missing 'Education' section");
  }
  if (!hasSections.skills) {
    score -= 15;
    issues.push("Missing 'Skills' section");
  }

  // Check text length (1-2 pages is ~500-1500 words)
  const wordCount = resume.text.split(/\s+/).length;
  if (wordCount < 300) {
    score -= 10;
    issues.push("Resume might be too short (less than 300 words)");
  } else if (wordCount > 2000) {
    score -= 10;
    issues.push("Resume might be too long (more than 2000 words)");
  }

  // Check for bullet points
  const hasBullets = /[•●○]\s/.test(resume.text) || /^\s*[-*]\s/m.test(resume.text);
  if (!hasBullets) {
    score -= 10;
    issues.push("Use bullet points to improve readability");
  }

  return { score: Math.max(0, score), issues };
}

/**
 * Calculate content score
 */
export function calculateContentScore(resume: ParsedResume): { score: number; issues: string[] } {
  let score = 100;
  const issues: string[] = [];

  // Contact information
  if (!resume.contactInfo.email) {
    score -= 20;
    issues.push("Missing email address");
  }
  if (!resume.contactInfo.phone) {
    score -= 10;
    issues.push("Missing phone number");
  }
  if (!resume.contactInfo.name) {
    score -= 10;
    issues.push("Name not found at the top");
  }

  // Quantifiable achievements
  if (resume.metrics.length === 0) {
    score -= 20;
    issues.push("Add quantifiable achievements (numbers, percentages, metrics)");
  } else if (resume.metrics.length < 3) {
    score -= 10;
    issues.push("Include more quantifiable achievements to strengthen your impact");
  }

  // Action verbs check (sample list)
  const actionVerbs = [
    "led", "managed", "developed", "created", "implemented", "designed",
    "increased", "reduced", "improved", "achieved", "delivered", "launched",
  ];
  const hasActionVerbs = actionVerbs.some((verb) =>
    resume.text.toLowerCase().includes(verb)
  );
  if (!hasActionVerbs) {
    score -= 15;
    issues.push("Use strong action verbs (led, managed, developed, etc.)");
  }

  // LinkedIn presence
  if (!resume.contactInfo.hasLinkedIn) {
    score -= 5;
    issues.push("Consider adding LinkedIn profile URL");
  }

  return { score: Math.max(0, score), issues };
}

/**
 * Generate improvement suggestions
 */
export function generateSuggestions(
  scores: Omit<ATSScores, "suggestions">,
  formattingIssues: string[],
  contentIssues: string[]
): string[] {
  const suggestions: string[] = [];

  // Keyword suggestions
  if (scores.keywordScore < 70) {
    suggestions.push(`🔑 Add relevant keywords from the job description (matched ${scores.matchedKeywords.length} of ${scores.matchedKeywords.length + scores.missingKeywords.length})`);
    if (scores.missingKeywords.length > 0) {
      suggestions.push(`📝 Consider adding: ${scores.missingKeywords.slice(0, 5).join(", ")}`);
    }
  }

  // Formatting suggestions
  formattingIssues.forEach((issue) => {
    suggestions.push(`📐 ${issue}`);
  });

  // Content suggestions
  contentIssues.forEach((issue) => {
    suggestions.push(`✍️ ${issue}`);
  });

  // Overall suggestions
  if (scores.overallScore >= 80) {
    suggestions.push("✅ Great job! Your resume is highly ATS-compatible");
  } else if (scores.overallScore >= 60) {
    suggestions.push("⚠️ Your resume is decent but has room for improvement");
  } else {
    suggestions.push("🚨 Your resume needs significant improvements to pass ATS screening");
  }

  return suggestions;
}

/**
 * Main scoring function
 */
export function calculateATSScore(
  resume: ParsedResume,
  jobDescription?: string
): ATSScores {
  // Calculate individual scores
  const keywordResult = calculateKeywordScore(resume, jobDescription);
  const formattingResult = calculateFormattingScore(resume);
  const contentResult = calculateContentScore(resume);

  // Weights: keyword (30%), formatting (25%), content (45%)
  const overallScore = Math.round(
    keywordResult.score * 0.3 +
    formattingResult.score * 0.25 +
    contentResult.score * 0.45
  );

  const suggestions = generateSuggestions(
    {
      overallScore,
      keywordScore: keywordResult.score,
      formattingScore: formattingResult.score,
      contentScore: contentResult.score,
      matchedKeywords: keywordResult.matched,
      missingKeywords: keywordResult.missing,
    },
    formattingResult.issues,
    contentResult.issues
  );

  return {
    overallScore,
    keywordScore: keywordResult.score,
    formattingScore: formattingResult.score,
    contentScore: contentResult.score,
    suggestions,
    matchedKeywords: keywordResult.matched,
    missingKeywords: keywordResult.missing,
  };
}
