import { NextRequest } from "next/server";
import { GET } from "@/app/api/jobs/recommendations/route";
import prisma from "@/lib/prisma";
import { searchJobs } from "@/lib/adzuna";

// Mock external dependencies
jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(() => Promise.resolve({ userId: "test_user_123" })),
}));

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    resume: {
      findUnique: jest.fn(),
    },
    jobRecommendation: {
      findFirst: jest.fn(),
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
  },
}));

jest.mock("@/lib/adzuna", () => ({
  searchJobs: jest.fn(),
}));

describe("/api/jobs/recommendations", () => {
  const mockResumeId = "cmk2l6lk9000011vzechlhlzk";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if resumeId is missing", async () => {
    const req = new NextRequest("http://localhost:3000/api/jobs/recommendations");
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Resume ID is required");
  });

  it("should return 404 if resume not found", async () => {
    (prisma.resume.findUnique as jest.Mock).mockResolvedValue(null);

    const req = new NextRequest(
      `http://localhost:3000/api/jobs/recommendations?resumeId=${mockResumeId}`
    );
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe("Resume not found");
  });

  it("should handle resume with rich text skills/strengths/languages", async () => {
    const mockResume = {
      id: mockResumeId,
      userId: "test_user_123",
      title: "Senior Developer Resume",
      firstName: "John",
      lastName: "Doe",
      jobTitle: "Senior Software Engineer",
      city: "San Francisco",
      country: "United States",
      email: "john@example.com",
      phone: "+1234567890",
      summary: "<p>Experienced senior software engineer with 10+ years in JavaScript, React, and Node.js</p>",
      skills: "<p>JavaScript, TypeScript, React, Node.js, AWS, Docker, PostgreSQL</p>",
      strengths: "<p>Problem Solving, Team Leadership, Code Review, Mentoring</p>",
      languages: "<p>English (Native), Spanish (Fluent)</p>",
      colorHex: "#000000",
      borderStyle: "squircle",
      template: "modern",
      description: null,
      photoUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      workExperiences: [],
      educations: [],
      projects: [],
      certifications: [],
      atsScore: {
        overallScore: 85,
        keywordScore: 80,
        formattingScore: 90,
        contentScore: 85,
      },
    };

    const mockJobs = [
      {
        id: "job_1",
        title: "Senior React Developer",
        company: "Tech Corp",
        location: "San Francisco, CA",
        description: "Looking for senior React developer with Node.js experience",
        salary: "$140k - $180k",
        postedDate: new Date(),
        contractType: "Full-time",
        url: "https://example.com/job/1",
        category: "Software Development",
      },
      {
        id: "job_2",
        title: "Full Stack Engineer",
        company: "Startup Inc",
        location: "Remote",
        description: "Full stack engineer needed. TypeScript, React, AWS required.",
        salary: "$120k - $160k",
        postedDate: new Date(),
        contractType: "Full-time",
        url: "https://example.com/job/2",
        category: "Engineering",
      },
    ];

    (prisma.resume.findUnique as jest.Mock).mockResolvedValue(mockResume);
    (searchJobs as jest.Mock).mockResolvedValue({
      jobs: mockJobs,
      totalCount: 2,
    });
    (prisma.jobRecommendation.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });
    (prisma.jobRecommendation.createMany as jest.Mock).mockResolvedValue({ count: 2 });

    const req = new NextRequest(
      `http://localhost:3000/api/jobs/recommendations?resumeId=${mockResumeId}`
    );
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.recommendations).toBeDefined();
    expect(Array.isArray(data.recommendations)).toBe(true);
    expect(data.recommendations.length).toBeGreaterThan(0);

    // Check that keywords were extracted from HTML
    expect(searchJobs).toHaveBeenCalled();
    const searchCall = (searchJobs as jest.Mock).mock.calls[0];
    const keywords = searchCall[0]; // First argument is keywords array
    
    // Should extract from HTML content
    expect(keywords).toContain("javascript");
    expect(keywords).toContain("react");
  });

  it("should extract keywords from HTML rich text properly", async () => {
    const mockResume = {
      id: mockResumeId,
      userId: "test_user_123",
      title: "Data Scientist Resume",
      firstName: "Jane",
      lastName: "Smith",
      jobTitle: "Data Scientist",
      city: "New York",
      country: "United States",
      email: "jane@example.com",
      phone: "+1234567890",
      summary: "<p>Data scientist specializing in machine learning and Python</p>",
      skills: "<ul><li>Python</li><li>Machine Learning</li><li>TensorFlow</li><li>SQL</li></ul>",
      strengths: "<p>Data Analysis, Statistical Modeling</p>",
      languages: "<p>English, Mandarin</p>",
      colorHex: "#000000",
      borderStyle: "squircle",
      template: "modern",
      description: null,
      photoUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      workExperiences: [],
      educations: [],
      projects: [],
      certifications: [],
      atsScore: null,
    };

    (prisma.resume.findUnique as jest.Mock).mockResolvedValue(mockResume);
    (searchJobs as jest.Mock).mockResolvedValue({ jobs: [], totalCount: 0 });
    (prisma.jobRecommendation.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });
    (prisma.jobRecommendation.createMany as jest.Mock).mockResolvedValue({ count: 0 });

    const req = new NextRequest(
      `http://localhost:3000/api/jobs/recommendations?resumeId=${mockResumeId}`
    );
    const response = await GET(req);

    expect(response.status).toBe(200);
    
    // Verify searchJobs was called with keywords from HTML
    expect(searchJobs).toHaveBeenCalled();
    const keywords = (searchJobs as jest.Mock).mock.calls[0][0];
    
    // Keywords should be extracted from HTML list items and paragraphs
    expect(keywords).toContain("python");
    expect(keywords).toContain("machine");
    expect(keywords).toContain("learning");
  });

  it("should handle Adzuna API errors gracefully", async () => {
    const mockResume = {
      id: mockResumeId,
      userId: "test_user_123",
      title: "Test Resume",
      firstName: "Test",
      lastName: "User",
      jobTitle: "Developer",
      city: "Test City",
      country: "Test Country",
      email: "test@example.com",
      phone: "+1234567890",
      summary: "<p>Test summary</p>",
      skills: "<p>Test skills</p>",
      strengths: null,
      languages: null,
      colorHex: "#000000",
      borderStyle: "squircle",
      template: "modern",
      description: null,
      photoUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      workExperiences: [],
      educations: [],
      projects: [],
      certifications: [],
      atsScore: null,
    };

    (prisma.resume.findUnique as jest.Mock).mockResolvedValue(mockResume);
    (searchJobs as jest.Mock).mockRejectedValue(new Error("Adzuna API error"));

    const req = new NextRequest(
      `http://localhost:3000/api/jobs/recommendations?resumeId=${mockResumeId}`
    );
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Failed to get job recommendations");
  });

  it("should handle null skills/strengths/languages gracefully", async () => {
    const mockResume = {
      id: mockResumeId,
      userId: "test_user_123",
      title: "Minimal Resume",
      firstName: "Min",
      lastName: "Resume",
      jobTitle: "Worker",
      city: "City",
      country: "Country",
      email: "min@example.com",
      phone: "+1234567890",
      summary: null,
      skills: null,
      strengths: null,
      languages: null,
      colorHex: "#000000",
      borderStyle: "squircle",
      template: "modern",
      description: null,
      photoUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      workExperiences: [],
      educations: [],
      projects: [],
      certifications: [],
      atsScore: null,
    };

    (prisma.resume.findUnique as jest.Mock).mockResolvedValue(mockResume);
    (searchJobs as jest.Mock).mockResolvedValue({ jobs: [], totalCount: 0 });
    (prisma.jobRecommendation.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });
    (prisma.jobRecommendation.createMany as jest.Mock).mockResolvedValue({ count: 0 });

    const req = new NextRequest(
      `http://localhost:3000/api/jobs/recommendations?resumeId=${mockResumeId}`
    );
    const response = await GET(req);

    expect(response.status).toBe(200);
    expect(searchJobs).toHaveBeenCalled();
    
    // Should still work with empty keywords
    const keywords = (searchJobs as jest.Mock).mock.calls[0][0];
    expect(Array.isArray(keywords)).toBe(true);
  });
});
