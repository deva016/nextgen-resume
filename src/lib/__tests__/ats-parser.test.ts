import { parseResumeFile, extractSections, extractContactInfo, extractKeywords, extractMetrics } from "../ats-parser";

describe("ATS Parser", () => {
  describe("extractSections", () => {
    it("should extract experience section", () => {
      const text = `
John Doe
john@example.com

WORK EXPERIENCE:
Software Engineer at Google
Built amazing products

EDUCATION:
BS Computer Science
      `;

      const sections = extractSections(text);
      const experienceSection = sections.find((s) => s.type === "experience");

      expect(sections.length).toBeGreaterThan(0);
      expect(experienceSection).toBeDefined();
      expect(experienceSection?.content).toContain("Software Engineer");
    });

    it("should extract education section", () => {
      const text = `
EDUCATION:
Bachelor of Science in Computer Science
University of Technology

SKILLS:
JavaScript, Python
      `;

      const sections = extractSections(text);
      const educationSection = sections.find((s) => s.type === "education");

      expect(educationSection).toBeDefined();
      expect(educationSection?.content).toContain("Bachelor of Science");
    });

    it("should extract skills section", () => {
      const text = `
SKILLS:
JavaScript, TypeScript, React, Node.js

EXPERIENCE:
Developer at Tech Corp
      `;

      const sections = extractSections(text);
      const skillsSection = sections.find((s) => s.type === "skills");

      expect(skillsSection).toBeDefined();
      expect(skillsSection?.content).toContain("JavaScript");
    });
  });

  describe("extractContactInfo", () => {
    it("should extract email address", () => {
      const text = "John Doe\njohn.doe@example.com\n555-123-4567";
      const contactInfo = extractContactInfo(text);

      expect(contactInfo.email).toBe("john.doe@example.com");
    });

    it("should extract phone number", () => {
      const text = "John Doe\\n555-123-4567\\njohn@example.com";
      const contactInfo = extractContactInfo(text);

      expect(contactInfo.phone).toBeDefined();
      expect(contactInfo.phone).toContain("555");
    });

    it("should detect LinkedIn presence", () => {
      const text = "John Doe\\nlinkedin.com/in/johndoe\\njohn@example.com";
      const contactInfo = extractContactInfo(text);

      expect(contactInfo.hasLinkedIn).toBe(true);
    });

    it("should extract name from first line", () => {
      const text = "Jane Smith\njane@example.com\n555-987-6543";
      const contactInfo = extractContactInfo(text);

      expect(contactInfo.name).toBe("Jane Smith");
    });

    it("should handle missing contact info gracefully", () => {
      const text = "Some random text without contact information";
      const contactInfo = extractContactInfo(text);

      expect(contactInfo.email).toBeUndefined();
      expect(contactInfo.phone).toBeUndefined();
      expect(contactInfo.hasLinkedIn).toBe(false);
    });
  });

  describe("extractKeywords", () => {
    it("should extract programming language keywords", () => {
      const text = "Experienced with JavaScript, Python, and React development";
      const keywords = extractKeywords(text);

      expect(keywords).toContain("javascript");
      expect(keywords).toContain("python");
      expect(keywords).toContain("react");
    });

    it("should extract cloud platform keywords", () => {
      const text = "Deployed applications on AWS and Azure cloud platforms";
      const keywords = extractKeywords(text);

      expect(keywords).toContain("aws");
      expect(keywords).toContain("azure");
    });

    it("should extract database keywords", () => {
      const text = "Worked with PostgreSQL, MongoDB, and Redis databases";
      const keywords = extractKeywords(text);

      expect(keywords).toContain("postgresql");
      expect(keywords).toContain("mongodb");
      expect(keywords).toContain("redis");
    });

    it("should not have duplicate keywords", () => {
      const text = "JavaScript expert, JavaScript developer, focused on JavaScript";
      const keywords = extractKeywords(text);

      const jsCount = keywords.filter((k) => k === "javascript").length;
      expect(jsCount).toBe(1);
    });
  });

  describe("extractMetrics", () => {
    it("should extract percentages", () => {
      const text = "Improved performance by 30% and increased revenue by 50%";
      const metrics = extractMetrics(text);

      expect(metrics).toContain("30%");
      expect(metrics).toContain("50%");
    });

    it("should extract large numbers with context", () => {
      const text = "Managed 5 developers and served 10 million users";
      const metrics = extractMetrics(text);

      expect(metrics.some((m) => m.includes("5"))).toBe(true);
      expect(metrics.some((m) => m.includes("million"))).toBe(true);
    });

    it("should not have duplicate metrics", () => {
      const text = "Achieved 30% growth, sustained 30% margin";
      const metrics = extractMetrics(text);

      const count30 = metrics.filter((m) => m === "30%").length;
      expect(count30).toBe(1);
    });
  });

  describe("parseResumeFile", () => {
    it("should reject PDF files with helpful error message", async () => {
      const buffer = Buffer.from("fake pdf content");

      await expect(parseResumeFile(buffer, "pdf")).rejects.toThrow(
        "Failed to parse resume file"
      );
    });
  });
});
