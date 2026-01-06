import { POST } from "../route";
import { NextRequest } from "next/server";

// Mock dependencies
jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
}));

jest.mock("@/lib/adzuna", () => ({
  searchJobs: jest.fn(),
}));

import { auth } from "@clerk/nextjs/server";
import { searchJobs } from "@/lib/adzuna";

// Helper to create mock request
function createMockRequest(body: unknown): NextRequest {
  return {
    json: () => Promise.resolve(body),
  } as unknown as NextRequest;
}

describe("POST /api/jobs/search", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if not authenticated", async () => {
    (auth as unknown as jest.Mock).mockResolvedValue({ userId: null });
    const req = createMockRequest({ keywords: ["JavaScript"] });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Unauthorized");
  });

  it("should return 400 if keywords are missing", async () => {
    (auth as unknown as jest.Mock).mockResolvedValue({ userId: "user_123" });
    const req = createMockRequest({ keywords: [] });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Keywords are required");
  });

  it("should search jobs with provided keywords", async () => {
    (auth as unknown as jest.Mock).mockResolvedValue({ userId: "user_123" });
    
    const mockJobs = [
      {
        id: "job_1",
        title: "JavaScript Developer",
        company: "Tech Corp",
        location: "San Francisco, CA",
        description: "Great opportunity",
        salary: "$100k - $150k",
        postedDate: new Date(),
        contractType: "Full-time",
        url: "https://example.com/job/1",
      },
    ];

    (searchJobs as jest.Mock).mockResolvedValue({
      jobs: mockJobs,
      totalCount: 100,
    });

    const req = createMockRequest({
      keywords: ["JavaScript", "React"],
      location: "San Francisco",
      page: 1,
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.jobs).toHaveLength(1);
    expect(data.jobs[0].id).toBe("job_1");
    expect(data.jobs[0].title).toBe("JavaScript Developer");
    expect(data.jobs[0].company).toBe("Tech Corp");
    expect(data.totalResults).toBe(100);
    expect(data.page).toBe(1);
    expect(searchJobs).toHaveBeenCalledWith(
      ["JavaScript", "React"],
      expect.objectContaining({
        location: "San Francisco",
        page: 1,
      })
    );
  });

  it("should handle search with filters", async () => {
    (auth as unknown as jest.Mock).mockResolvedValue({ userId: "user_123" });
    (searchJobs as jest.Mock).mockResolvedValue({ jobs: [], totalCount: 0 });

    const req = createMockRequest({
      keywords: ["Python"],
      location: "New York",
      minSalary: 80000,
      maxSalary: 150000,
      contractType: "full_time",
      maxDays: 30,
    });

    await POST(req);

    expect(searchJobs).toHaveBeenCalledWith(
      ["Python"],
      expect.objectContaining({
        location: "New York",
        minSalary: 80000,
        maxSalary: 150000,
        contractType: "full_time",
        maxDays: 30,
      })
    );
  });

  it("should indicate hasMore when results match page size", async () => {
    (auth as unknown as jest.Mock).mockResolvedValue({ userId: "user_123" });
    
    const mockJobs = Array(20).fill(null).map((_, i) => ({
      id: `job_${i}`,
      title: `Job ${i}`,
      company: "Company",
      location: "Location",
      description: "Description",
      salary: null,
      postedDate: new Date(),
      contractType: "Full-time",
      url: `https://example.com/job/${i}`,
    }));

    (searchJobs as jest.Mock).mockResolvedValue({
      jobs: mockJobs,
      totalCount: 50,
    });

    const req = createMockRequest({ keywords: ["Test"], resultsPerPage: 20 });
    const response = await POST(req);
    const data = await response.json();

    expect(data.hasMore).toBe(true);
  });

  it("should handle case-sensitive keyword search", async () => {
    (auth as unknown as jest.Mock).mockResolvedValue({ userId: "user_123" });
    (searchJobs as jest.Mock).mockResolvedValue({ jobs: [], totalCount: 0 });

    const req = createMockRequest({
      keywords: ["JavaScript", "TypeScript", "React"],
    });

    await POST(req);

    // Verify exact keywords are passed (case-sensitive)
    expect(searchJobs).toHaveBeenCalledWith(
      ["JavaScript", "TypeScript", "React"],
      expect.any(Object)
    );
  });

  it("should handle API errors gracefully", async () => {
    (auth as unknown as jest.Mock).mockResolvedValue({ userId: "user_123" });
    (searchJobs as jest.Mock).mockRejectedValue(new Error("API Error"));

    const req = createMockRequest({ keywords: ["Test"] });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Failed to search jobs");
  });
});
