// import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Mock the library at the top level
jest.mock("@google/generative-ai");

describe("Gemini AI Integration", () => {
  let mockGenerateContent: jest.Mock;
  let mockText: jest.Mock;

  beforeEach(() => {
    // 2. Clear module cache to reset gemini.ts singleton `genAI`
    jest.resetModules();
    jest.clearAllMocks();

    process.env.GEMINI_API_KEY = "test_key";

    // 3. Setup fresh mock implementations
    mockText = jest.fn();
    mockGenerateContent = jest.fn().mockResolvedValue({
      response: {
        text: mockText,
      },
    });

    // Mock the constructor behavior for THIS test run
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    GoogleGenerativeAI.mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: mockGenerateContent,
      }),
    }));
  });

  describe("enhanceBulletPoint", () => {
    it("should return enhanced text on success", async () => {
      // 4. Require the module dynamically AFTER setting up mocks
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { enhanceBulletPoint } = require("../gemini");

      mockText.mockReturnValue("Enhanced bullet point");
      const result = await enhanceBulletPoint("Original point");
      
      expect(result).toBe("Enhanced bullet point");
      expect(mockGenerateContent).toHaveBeenCalledWith(expect.stringContaining("Original point"));
    });

    it("should return original text on failure", async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { enhanceBulletPoint } = require("../gemini");

      mockGenerateContent.mockRejectedValue(new Error("API Error"));
      const result = await enhanceBulletPoint("Original point");
      
      expect(result).toBe("Original point");
    });
  });

  describe("generateSummaryAI", () => {
    it("should return generated summary", async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { generateSummaryAI } = require("../gemini");

      mockText.mockReturnValue("Professional summary");
      const result = await generateSummaryAI("Dev", "Exp", "Edu", "Skills");
      
      expect(result).toBe("Professional summary");
      expect(mockGenerateContent).toHaveBeenCalled();
    });

    it("should throw error on failure", async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { generateSummaryAI } = require("../gemini");

      mockGenerateContent.mockRejectedValue(new Error("API Error"));
      await expect(generateSummaryAI("Dev", "", "", "")).rejects.toThrow("Failed to generate summary");
    });
  });

  describe("generateWorkExperienceAI", () => {
    it("should return structured work experience", async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { generateWorkExperienceAI } = require("../gemini");

      const mockJson = JSON.stringify({
        position: "Engineer",
        company: "Tech Co",
        description: "• Did stuff",
      });
      mockText.mockReturnValue(mockJson);
      
      const result = await generateWorkExperienceAI("I worked at Tech Co");
      
      expect(result).toEqual({
        position: "Engineer",
        company: "Tech Co",
        description: "• Did stuff",
      });
    });

    it("should handle markdown code blocks in response", async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { generateWorkExperienceAI } = require("../gemini");

      const mockJson = JSON.stringify({
        position: "Engineer",
        company: "Tech Co",
      });
      mockText.mockReturnValue("```json\n" + mockJson + "\n```");
      
      const result = await generateWorkExperienceAI("desc");
      
      expect(result).toHaveProperty("position", "Engineer");
    });

    it("should throw error on failure", async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { generateWorkExperienceAI } = require("../gemini");

      mockGenerateContent.mockRejectedValue(new Error("API Error"));
      await expect(generateWorkExperienceAI("desc")).rejects.toThrow("Failed to generate work experience");
    });
  });
});
