import { POST } from "../route";
import { NextRequest } from "next/server";

// Mock dependencies
jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  resume: {
    findUnique: jest.fn(),
  },
  aTSScore: {
    upsert: jest.fn(),
  },
}));

jest.mock("@/lib/ats-parser", () => ({
  parseResume: jest.fn(),
}));

jest.mock("@/lib/ats-scorer", () => ({
  calculateATSScore: jest.fn(),
}));

jest.mock("@/lib/gemini", () => ({
  getAISuggestions: jest.fn(),
}));

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { parseResume } from "@/lib/ats-parser";
import { calculateATSScore } from "@/lib/ats-scorer";
import { getAISuggestions } from "@/lib/gemini";

// Helper to create mock request with FormData
function createMockRequest(formDataMap: Record<string, unknown>): NextRequest {
  return {
    formData: () => Promise.resolve({
      get: (key: string) => formDataMap[key] || null,
    }),
  } as unknown as NextRequest;
}

// Mock File class
class MockFile {
  name: string;
  type: string;
  content: string;

  constructor(content: string[], name: string, options: { type: string }) {
    this.name = name;
    this.type = options.type;
    this.content = content[0];
  }

  arrayBuffer() {
    return Promise.resolve(Buffer.from(this.content));
  }
}

describe("POST /api/ats/analyze", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if not authenticated", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: null });
    const req = createMockRequest({});

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Unauthorized");
  });

  it("should return 400 if resumeId is missing", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: "user_123" });
    const req = createMockRequest({});

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Resume ID is required");
  });

  it("should return 404 if resume not found", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: "user_123" });
    const req = createMockRequest({ resumeId: "resume_123" });

    (prisma.resume.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe("Resume not found");
  });

  it("should handle error with unsupported file type (TXT)", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: "user_123" });
    
    // Mock file upload
    const file = new MockFile(["fake txt content"], "resume.txt", { type: "text/plain" });
    const req = createMockRequest({ 
      resumeId: "resume_123",
      file: file 
    });

    (prisma.resume.findUnique as jest.Mock).mockResolvedValue({ id: "resume_123" });
    
    // Mock parser throwing error for TXT
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    (parseResume as jest.Mock).mockRejectedValue(new Error("Unsupported file type"));

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400); 
    expect(data.error).toContain("supported"); 

    consoleSpy.mockRestore();
  });

  it("should successfully analyze resume with file upload (DOCX)", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: "user_123" });
    
    const file = new MockFile(["fake docx content"], "resume.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    const req = createMockRequest({
      resumeId: "resume_123",
      file: file
    });

    (prisma.resume.findUnique as jest.Mock).mockResolvedValue({ id: "resume_123" });
    
    // Mock parser response (success)
    const mockParsedResume = {
      text: "Parsed text",
      sections: [],
      contactInfo: {},
      keywords: [],
      metrics: [],
    };
    (parseResume as jest.Mock).mockResolvedValue(mockParsedResume);
    
    // Mock scorer response
    const mockScore = {
      overallScore: 80,
      keywordScore: 70,
      formattingScore: 90,
      contentScore: 80,
      suggestions: ["Suggestion 1"],
      matchedKeywords: [],
      missingKeywords: [],
    };
    (calculateATSScore as jest.Mock).mockReturnValue(mockScore);
    
    // Mock AI suggestions
    (getAISuggestions as jest.Mock).mockResolvedValue(["AI Suggestion 1"]);
    
    // Mock DB upsert
    (prisma.aTSScore.upsert as jest.Mock).mockResolvedValue({});

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.atsScore.overallScore).toBe(80);
    expect(parseResume).toHaveBeenCalled();
    expect(calculateATSScore).toHaveBeenCalled();
  });
});
