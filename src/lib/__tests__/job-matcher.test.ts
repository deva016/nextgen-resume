import { calculateMatchScore, extractResumeKeywords, extractJobKeywords, matchResumeToJobs } from "../job-matcher";
import { Resume, ATSScore } from "@prisma/client";
import { Job } from "../adzuna";

// Mock resume data
const mockResume: Resume & { atsScore: ATSScore | null } = {
  id: "resume_123",
  userId: "user_123",
  title: "Senior Software Engineer Resume",
  description: null,
  photoUrl: null,
  colorHex: "#000000",
  borderStyle: "squircle",
  template: "modern",
  summary: "Experienced senior software engineer with 10+ years in JavaScript, React, and Node.js",
  firstName: "John",
  lastName: "Doe",
  jobTitle: "Senior Software Engineer",
  city: "San Francisco",
  country: "United States",
  phone: "+1234567890",
  email: "john@example.com",
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "AWS", "Docker"],
  strengths: ["Problem Solving", "Team Leadership", "Code Review"],
  languages: ["English", "Spanish"],
  createdAt: new Date(),
  updatedAt: new Date(),
  atsScore: {
    id: "ats_123",
    resumeId: "resume_123",
    overallScore: 85,
    keywordScore: 80,
    formattingScore: 90,
    contentScore: 85,
    suggestions: [],
    matchedKeywords: [],
    missingKeywords: [],
    jobDescription: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

// Mock job data
const mockJob: Job = {
  id: "job_123",
  title: "Senior JavaScript Developer",
  company: "Tech Corp",
  location: "San Francisco, CA",
  description: "Looking for a senior JavaScript developer with React and Node.js experience. Must have AWS knowledge.",
  salary: "$120,000 - $160,000",
  postedDate: new Date(),
  contractType: "Full-time",
  url: "https://example.com/job/123",
  category: "Software Development",
};

describe("Job Matcher", () => {
  describe("extractResumeKeywords", () => {
    it("should extract keywords from resume skills (case-insensitive)", () => {
      const keywords = extractResumeKeywords(mockResume);
      
      expect(keywords).toContain("javascript");
      expect(keywords).toContain("typescript");
      expect(keywords).toContain("react");
      expect(keywords).toContain("node.js");
    });

    it("should extract keywords from languages", () => {
      const keywords = extractResumeKeywords(mockResume);
      
      expect(keywords).toContain("english");
      expect(keywords).toContain("spanish");
    });

    it("should extract keywords from strengths", () => {
      const keywords = extractResumeKeywords(mockResume);
      
      expect(keywords).toContain("problem solving");
      expect(keywords).toContain("team leadership");
    });

    it("should extract keywords from summary", () => {
      const keywords = extractResumeKeywords(mockResume);
      
      expect(keywords).toContain("experienced");
      expect(keywords).toContain("senior");
    });

    it("should normalize keywords to lowercase", () => {
      const keywords = extractResumeKeywords(mockResume);
      
      // All keywords should be lowercase
      keywords.forEach((kw) => {
        expect(kw).toBe(kw.toLowerCase());
      });
    });
  });

  describe("extractJobKeywords", () => {
    it("should extract keywords from job title (case-sensitive source)", () => {
      const keywords = extractJobKeywords(mockJob);
      
      // Keywords extracted should preserve original casing from source
      expect(keywords.some(k => k.toLowerCase() === "javascript")).toBe(true);
      expect(keywords.some(k => k.toLowerCase() === "senior")).toBe(true);
    });

    it("should extract tech keywords from description", () => {
      const keywords = extractJobKeywords(mockJob);
      
      expect(keywords).toContain("react");
      expect(keywords).toContain("node");
      expect(keywords).toContain("aws");
    });

    it("should include common tech stack keywords", () => {
      const jobWithPython: Job = {
        ...mockJob,
        description: "Python developer needed for backend work with Docker and Kubernetes",
      };
      
      const keywords = extractJobKeywords(jobWithPython);
      
      expect(keywords).toContain("python");
      expect(keywords).toContain("docker");
      expect(keywords).toContain("kubernetes");
    });
  });

  describe("calculateMatchScore", () => {
    it("should calculate high score for well-matched resume and job", () => {
      const result = calculateMatchScore(mockResume, mockJob);
      
      expect(result.score).toBeGreaterThan(60);
      expect(result.keywordMatches.length).toBeGreaterThan(0);
      expect(result.reasons.length).toBeGreaterThan(0);
    });

    it("should include keyword match reason for high keyword overlap", () => {
      const result = calculateMatchScore(mockResume, mockJob);
      
      const hasKeywordReason = result.reasons.some((r) =>
        r.toLowerCase().includes("keyword match")
      );
      expect(hasKeywordReason).toBe(true);
    });

    it("should give experience match bonus for senior roles", () => {
      const seniorJob: Job = {
        ...mockJob,
        title: "Senior Lead Engineer",
      };
      
      const result = calculateMatchScore(mockResume, seniorJob);
      
      // Should get experience points for senior-to-senior match
      expect(result.reasons.some((r) => r.includes("Experience"))).toBe(true);
    });

    it("should give location match bonus for same city", () => {
      const result = calculateMatchScore(mockResume, mockJob);
      
      // San Francisco matches
      expect(result.reasons.some((r) => r.toLowerCase().includes("location"))).toBe(true);
    });

    it("should give ATS score bonus for high ATS scores", () => {
      const result = calculateMatchScore(mockResume, mockJob);
      
      // Resume has 85 ATS score
      expect(result.reasons.some((r) => r.includes("ATS"))).toBe(true);
    });

    it("should cap score at 100", () => {
      const perfectResume = {
        ...mockResume,
        atsScore: {
          ...mockResume.atsScore!,
          overallScore: 100,
        },
      };
      
      const result = calculateMatchScore(perfectResume, mockJob);
      
      expect(result.score).toBeLessThanOrEqual(100);
    });

    it("should identify missing keywords", () => {
      const jobRequiringPython: Job = {
        ...mockJob,
        description: "Python and Go developer needed",
      };
      
      const result = calculateMatchScore(mockResume, jobRequiringPython);
      
      // Resume doesn't have Python or Go
      expect(result.missingKeywords.length).toBeGreaterThan(0);
    });
  });

  describe("matchResumeToJobs", () => {
    const jobs: Job[] = [
      mockJob,
      {
        ...mockJob,
        id: "job_456",
        title: "Junior Developer",
        description: "Entry level position",
      },
      {
        ...mockJob,
        id: "job_789",
        title: "Senior React Engineer",
        location: "Remote",
      },
    ];

    it("should return matches sorted by score (highest first)", () => {
      const matches = matchResumeToJobs(mockResume, jobs);
      
      expect(matches.length).toBe(3);
      
      // Scores should be descending
      for (let i = 0; i < matches.length - 1; i++) {
        expect(matches[i].matchScore).toBeGreaterThanOrEqual(matches[i + 1].matchScore);
      }
    });

    it("should include job details in matches", () => {
      const matches = matchResumeToJobs(mockResume, jobs);
      
      matches.forEach((match) => {
        expect(match.job.id).toBeDefined();
        expect(match.job.title).toBeDefined();
        expect(match.job.company).toBeDefined();
      });
    });

    it("should include match metadata", () => {
      const matches = matchResumeToJobs(mockResume, jobs);
      
      matches.forEach((match) => {
        expect(match.matchScore).toBeGreaterThanOrEqual(0);
        expect(match.matchScore).toBeLessThanOrEqual(100);
        expect(Array.isArray(match.matchReasons)).toBe(true);
        expect(Array.isArray(match.keywordMatches)).toBe(true);
        expect(Array.isArray(match.missingKeywords)).toBe(true);
      });
    });
  });

  describe("Case Sensitivity", () => {
    it("should handle case-insensitive keyword matching", () => {
      const resumeWithMixedCase = {
        ...mockResume,
        skills: ["JavaScript", "REACT", "node.js"],
      };
      
      const jobWithMixedCase: Job = {
        ...mockJob,
        description: "We need javascript and React developers",
      };
      
      const result = calculateMatchScore(resumeWithMixedCase, jobWithMixedCase);
      
      // Should match despite different casing
      expect(result.keywordMatches.length).toBeGreaterThan(0);
    });

    it("should normalize all resume keywords to lowercase", () => {
      const resumeWithUpperCase = {
        ...mockResume,
        skills: ["JAVASCRIPT", "TYPESCRIPT", "REACT"],
      };
      
      const keywords = extractResumeKeywords(resumeWithUpperCase);
      
      keywords.forEach((kw) => {
        expect(kw).toBe(kw.toLowerCase());
      });
    });
  });
});
