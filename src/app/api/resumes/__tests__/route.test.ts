import { GET } from "../route";

// Mock dependencies
jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  resume: {
    findMany: jest.fn(),
  },
}));

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

describe("GET /api/resumes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if not authenticated", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: null });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Unauthorized");
  });

  it("should return resumes list if authenticated", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: "user_123" });
    const mockResumes = [
      { id: "1", title: "Resume 1", description: "Desc 1", updatedAt: new Date() },
      { id: "2", title: "Resume 2", description: "Desc 2", updatedAt: new Date() },
    ];
    (prisma.resume.findMany as jest.Mock).mockResolvedValue(mockResumes);

    const response = await GET();
    const data = await response.json();

    expect(prisma.resume.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { userId: "user_123" },
      orderBy: { updatedAt: "desc" },
    }));
    expect(data).toHaveLength(2);
    expect(data[0].id).toBe("1");
    expect(data[0].title).toBe("Resume 1");
  });

  it("should handle database errors", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: "user_123" });
    (prisma.resume.findMany as jest.Mock).mockRejectedValue(new Error("DB Error"));

    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Failed to fetch resumes");

    consoleSpy.mockRestore();
  });
});
