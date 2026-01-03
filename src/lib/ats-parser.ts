import mammoth from "mammoth";

/**
 * Parsed resume structure
 */
export interface ParsedResume {
  text: string;
  sections: ResumeSection[];
  contactInfo: ContactInfo;
  keywords: string[];
  metrics: string[]; // Quantifiable achievements
}

export interface ResumeSection {
  type: "experience" | "education" | "skills" | "summary" | "projects" | "certifications" | "other";
  title: string;
  content: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  name?: string;
  hasLinkedIn?: boolean;
}

/**
 * Extract text from PDF or DOCX file
 * NOTE: PDF parsing requires server-side processing
 */
export async function parseResumeFile(file: Buffer, fileType: "pdf" | "docx"): Promise<string> {
  try {
    if (fileType === "pdf") {
      // For now, we'll use a simpler approach for PDF
      // In production, consider using pdfjs-dist or pdf.js server-side
      throw new Error("PDF parsing is currently not supported. Please upload a DOCX file or use existing resume data.");
    } else if (fileType === "docx") {
      const result = await mammoth.extractRawText({ buffer: file });
      return result.value;
    }
    
    throw new Error("Unsupported file type");
  } catch (error) {
    console.error("Error parsing file:", error);
    throw new Error("Failed to parse resume file");
  }
}

/**
 * Parse resume text into structured sections
 */
export function extractSections(text: string): ResumeSection[] {
  const sections: ResumeSection[] = [];
  
  // Section headers patterns (case-insensitive)
  const sectionPatterns = {
    experience: /(?:^|\n)(work experience|experience|employment|work history)[\s:]/gi,
    education: /(?:^|\n)(education|academic background)[\s:]/gi,
    skills: /(?:^|\n)(skills|technical skills|core competencies|expertise)[\s:]/gi,
    summary: /(?:^|\n)(summary|professional summary|profile|objective)[\s:]/gi,
    projects: /(?:^|\n)(projects|portfolio)[\s:]/gi,
    certifications: /(?:^|\n)(certifications|certificates|licenses)[\s:]/gi,
  };

  const sectionMatches: Array<{ type: keyof typeof sectionPatterns; index: number; title: string }> = [];

  // Find all section headers
  for (const [type, pattern] of Object.entries(sectionPatterns)) {
    const matches = Array.from(text.matchAll(pattern));
    matches.forEach((match) => {
      if (match.index !== undefined) {
        sectionMatches.push({
          type: type as keyof typeof sectionPatterns,
          index: match.index,
          title: match[1],
        });
      }
    });
  }

  // Sort by position
  sectionMatches.sort((a, b) => a.index - b.index);

  // Extract content for each section
  for (let i = 0; i < sectionMatches.length; i++) {
    const current = sectionMatches[i];
    const next = sectionMatches[i + 1];
    const startIndex = current.index;
    const endIndex = next ? next.index : text.length;
    const content = text.slice(startIndex, endIndex).trim();

    sections.push({
      type: current.type as ResumeSection["type"],
      title: current.title,
      content,
    });
  }

  return sections;
}

/**
 * Extract contact information
 */
export function extractContactInfo(text: string): ContactInfo {
  const contactInfo: ContactInfo = {};

  // Email pattern
  const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
  if (emailMatch) {
    contactInfo.email = emailMatch[0];
  }

  // Phone pattern (various formats)
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    contactInfo.phone = phoneMatch[0];
  }

  // LinkedIn
  contactInfo.hasLinkedIn = /linkedin\.com\/in\//i.test(text);

  // Name (first line or first few words)
  const lines = text.split("\n").filter((line) => line.trim());
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    // If first line is short and doesn't contain @, it's likely the name
    if (firstLine.length < 50 && !firstLine.includes("@")) {
      contactInfo.name = firstLine;
    }
  }

  return contactInfo;
}

/**
 * Extract keywords (skills, technologies, tools)
 */
export function extractKeywords(text: string): string[] {
  const commonKeywords = [
    // Programming languages
    "javascript", "typescript", "python", "java", "c++", "c#", "ruby", "go", "rust", "php", "swift", "kotlin",
    // Web technologies
    "react", "vue", "angular", "next.js", "node.js", "express", "django", "flask", "spring", "html", "css", "tailwind",
    // Databases
    "sql", "postgresql", "mysql", "mongodb", "redis", "elasticsearch", "oracle",
    // Cloud/DevOps
    "aws", "azure", "gcp", "docker", "kubernetes", "jenkins", "ci/cd", "terraform", "ansible",
    // Skills
    "agile", "scrum", "leadership", "management", "communication", "problem solving",
    "api", "rest", "graphql", "microservices", "git", "github", "jira",
  ];

  const lowerText = text.toLowerCase();
  const foundKeywords = commonKeywords.filter((keyword) =>
    lowerText.includes(keyword.toLowerCase())
  );

  return [...new Set(foundKeywords)]; // Remove duplicates
}

/**
 * Extract quantifiable metrics (numbers, percentages)
 */
export function extractMetrics(text: string): string[] {
  const metrics: string[] = [];

  // Pattern for numbers with context (e.g., "increased by 30%", "managed 5 developers")
  const metricPatterns = [
    /\b\d+%/g, // Percentages
    /\b\d+[\s-]*(million|billion|thousand|k|m|b)/gi, // Large numbers
    /\b\d+\+?\s*(users|customers|clients|employees|developers|engineers|projects)/gi,
  ];

  metricPatterns.forEach((pattern) => {
    const matches = text.match(pattern);
    if (matches) {
      metrics.push(...matches);
    }
  });

  return [...new Set(metrics)];
}

/**
 * Main function to parse resume
 */
export async function parseResume(file: Buffer, fileType: "pdf" | "docx"): Promise<ParsedResume> {
  const text = await parseResumeFile(file, fileType);
  const sections = extractSections(text);
  const contactInfo = extractContactInfo(text);
  const keywords = extractKeywords(text);
  const metrics = extractMetrics(text);

  return {
    text,
    sections,
    contactInfo,
    keywords,
    metrics,
  };
}
