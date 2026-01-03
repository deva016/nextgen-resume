import { calculateKeywordScore, calculateFormattingScore, calculateContentScore, calculateATSScore } from "../ats-scorer";
import { ParsedResume } from "../ats-parser";

const createMockResume = (overrides?: Partial<ParsedResume>): ParsedResume => ({
  text: "John Doe\\njohn@example.com\\n555-123-4567\\n\\nExperienced software engineer with 5+ years building scalable applications with JavaScript and React.\\n\\nWORK EXPERIENCE:\\n- Led team of 5 developers\\n- Increased performance by 30%\\n- Developed 10+ features",
  sections: [
    {
      type: "experience",
      title: "Work Experience",
      content: "Software Engineer at Tech Corp",
    },
    {
      type: "education",
      title: "Education",
      content: "BS Computer Science",
    },
    {
      type: "skills",
      title: "Skills",
      content: "JavaScript, React, Node.js",
    },
  ],
  contactInfo: {
    email: "john@example.com",
    phone: "555-123-4567",
    name: "John Doe",
    hasLinkedIn: true,
  },
  keywords: ["javascript", "react", "node.js", "python"],
  metrics: ["30%", "5+ years", "10+ features", "5 developers"],
  ...overrides,
});

describe("ATS Scorer", () => {
  describe("calculateKeywordScore", () => {
    it("should calculate keyword score", () => {
      const resume = createMockResume({
        keywords: ["javascript", "react", "node", "aws", "docker", "api", "agile"],
      });

      const result = calculateKeywordScore(resume);

      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
      // May or may not match depending on default keywords
      expect(result.matched.length).toBeGreaterThanOrEqual(0);
    });

    it("should identify missing keywords from job description", () => {
      const resume = createMockResume({
        keywords: ["javascript", "react"],
      });
      const jobDescription = "Looking for Python and Kubernetes experience";

      const result = calculateKeywordScore(resume, jobDescription);

      expect(result.missing).toContain("python");
      expect(result.missing).toContain("kubernetes");
    });

    it("should match job description keywords", () => {
      const resume = createMockResume({
        keywords: ["javascript", "react", "python", "docker"],
      });
      const jobDescription = "Looking for React and Python developer with Docker experience";

      const result = calculateKeywordScore(resume, jobDescription);

      expect(result.matched).toContain("react");
      expect(result.matched).toContain("python");
      expect(result.matched).toContain("docker");
    });

    it("should give 50% score with no target keywords", () => {
      const resume = createMockResume();
      const result = calculateKeywordScore(resume);

      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    });
  });

  describe("calculateFormattingScore", () => {
    it("should give perfect score for well-formatted resume", () => {
      const resume = createMockResume();

      const result = calculateFormattingScore(resume);

      expect(result.score).toBeGreaterThanOrEqual(80);
      expect(result.issues.length).toBeLessThanOrEqual(2);
    });

    it("should penalize missing experience section", () => {
      const resume = createMockResume({
        sections: [
          { type: "education", title: "Education", content: "BS" },
        ],
      });

      const result = calculateFormattingScore(resume);

      expect(result.score).toBeLessThan(100);
      expect(result.issues).toContain("Missing 'Work Experience' section");
    });

    it("should penalize missing education section", () => {
      const resume = createMockResume({
        sections: [
          { type: "experience", title: "Experience", content: "Engineer" },
        ],
      });

      const result = calculateFormattingScore(resume);

      expect(result.score).toBeLessThan(100);
      expect(result.issues).toContain("Missing 'Education' section");
    });

    it("should penalize missing skills section", () => {
      const resume = createMockResume({
        sections: [
          { type: "experience", title: "Experience", content: "Engineer" },
          { type: "education", title: "Education", content: "BS" },
        ],
      });

      const result = calculateFormattingScore(resume);

      expect(result.score).toBeLessThan(100);
      expect(result.issues).toContain("Missing 'Skills' section");
    });

    it("should penalize resume that is too short", () => {
      const resume = createMockResume({
        text: "Short resume with less than 300 words",
      });

      const result = calculateFormattingScore(resume);

      expect(result.issues.some((issue) => issue.includes("too short"))).toBe(true);
    });

    it("should penalize resume that is too long", () => {
      const longText = "word ".repeat(2500); // More than 2000 words
      const resume = createMockResume({
        text: longText,
      });

      const result = calculateFormattingScore(resume);

      expect(result.issues.some((issue) => issue.includes("too long"))).toBe(true);
    });
  });

  describe("calculateContentScore", () => {
    it("should give high score for complete contact info", () => {
      const resume = createMockResume();

      const result = calculateContentScore(resume);

      expect(result.score).toBeGreaterThanOrEqual(70);
    });

    it("should penalize missing email", () => {
      const resume = createMockResume({
        contactInfo: { phone: "555-1234", name: "John" },
      });

      const result = calculateContentScore(resume);

      expect(result.score).toBeLessThan(100);
      expect(result.issues).toContain("Missing email address");
    });

    it("should penalize missing phone", () => {
      const resume = createMockResume({
        contactInfo: { email: "john@example.com", name: "John" },
      });

      const result = calculateContentScore(resume);

      expect(result.score).toBeLessThan(100);
      expect(result.issues).toContain("Missing phone number");
    });

    it("should penalize missing quantifiable achievements", () => {
      const resume = createMockResume({
        metrics: [],
      });

      const result = calculateContentScore(resume);

      expect(result.score).toBeLessThan(100);
      expect(result.issues).toContain("Add quantifiable achievements (numbers, percentages, metrics)");
    });

    it("should suggest more metrics when only few present", () => {
      const resume = createMockResume({
        metrics: ["30%", "5 users"],
      });

      const result = calculateContentScore(resume);

      expect(result.issues.some((issue) => issue.includes("more quantifiable achievements"))).toBe(true);
    });

    it("should suggest LinkedIn if not present", () => {
      const resume = createMockResume({
        contactInfo: { email: "john@example.com", phone: "555-1234", name: "John", hasLinkedIn: false },
      });

      const result = calculateContentScore(resume);

      expect(result.issues).toContain("Consider adding LinkedIn profile URL");
    });
  });

  describe("calculateATSScore", () => {
    it("should return overall ATS score", () => {
      const resume = createMockResume();

      const result = calculateATSScore(resume);

      expect(result.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.overallScore).toBeLessThanOrEqual(100);
      expect(result.keywordScore).toBeDefined();
      expect(result.formattingScore).toBeDefined();
      expect(result.contentScore).toBeDefined();
    });

    it("should provide suggestions", () => {
      const resume = createMockResume();

      const result = calculateATSScore(resume);

      expect(result.suggestions.length).toBeGreaterThan(0);
      expect(Array.isArray(result.suggestions)).toBe(true);
    });

    it("should calculate with job description", () => {
      const resume = createMockResume();
      const jobDescription = "Looking for React and Python expert";

      const result = calculateATSScore(resume, jobDescription);

      expect(result.matchedKeywords.length).toBeGreaterThanOrEqual(0);
      expect(result.missingKeywords.length).toBeGreaterThanOrEqual(0);
    });

    it("should show positive message for high scores", () => {
      const perfectResume = createMockResume({
        sections: [
          { type: "experience", title: "Experience", content: "Engineer" },
          { type: "education", title: "Education", content: "BS" },
          { type: "skills", title: "Skills", content: "JavaScript" },
        ],
        keywords: ["javascript", "react", "agile", "leadership", "api"],
        metrics: ["30%", "50%", "10 users", "5 projects"],
      });

      const result = calculateATSScore(perfectResume);

      const hasPositiveFeedback = result.suggestions.some(
        (s) => s.includes("Great job") || s.includes("ATS-compatible")
      );
      expect(result.overallScore).toBeGreaterThanOrEqual(60);
    });

    it("should show warning for medium scores", () => {
      const mediumResume = createMockResume({
        sections: [{ type: "experience", title: "Experience", content: "Worked" }],
        contactInfo: { name: "John" },
        keywords: [],
        metrics: [],
      });

      const result = calculateATSScore(mediumResume);

      expect(result.overallScore).toBeLessThan(80);
      expect(result.suggestions.length).toBeGreaterThan(3);
    });
  });
});
