import { render, screen } from "@testing-library/react";
import ResumeCard from "../ResumeCard";

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = "Link";
  return MockLink;
});

describe("ResumeCard", () => {
  const mockResume = {
    id: "test-id-123",
    title: "Software Engineer Resume",
    updatedAt: new Date("2026-01-05T10:00:00Z"),
    atsScore: {
      overallScore: 85,
    },
  };

  it("renders resume title", () => {
    render(<ResumeCard resume={mockResume} />);
    
    expect(screen.getByText("Software Engineer Resume")).toBeInTheDocument();
  });

  it("renders 'Untitled Resume' when title is null", () => {
    const resumeWithoutTitle = { ...mockResume, title: null };
    render(<ResumeCard resume={resumeWithoutTitle} />);
    
    expect(screen.getByText("Untitled Resume")).toBeInTheDocument();
  });

  it("displays ATS score with green color for score >= 80", () => {
    render(<ResumeCard resume={mockResume} />);
    
    const scoreElement = screen.getByText("ATS: 85");
    expect(scoreElement).toBeInTheDocument();
    expect(scoreElement).toHaveClass("text-green-400");
  });

  it("displays ATS score with yellow color for score 60-79", () => {
    const resume = {
      ...mockResume,
      atsScore: { overallScore: 70 },
    };
    render(<ResumeCard resume={resume} />);
    
    const scoreElement = screen.getByText("ATS: 70");
    expect(scoreElement).toHaveClass("text-yellow-400");
  });

  it("displays ATS score with red color for score < 60", () => {
    const resume = {
      ...mockResume,
      atsScore: { overallScore: 45 },
    };
    render(<ResumeCard resume={resume} />);
    
    const scoreElement = screen.getByText("ATS: 45");
    expect(scoreElement).toHaveClass("text-red-400");
  });

  it("displays 'Not checked' when no ATS score", () => {
    const resumeWithoutScore = {
      ...mockResume,
      atsScore: null,
    };
    render(<ResumeCard resume={resumeWithoutScore} />);
    
    expect(screen.getByText("Not checked")).toBeInTheDocument();
  });

  it("renders edit button with correct link", () => {
    render(<ResumeCard resume={mockResume} />);
    
    const editLink = screen.getByRole("link", { name: /edit resume/i });
    expect(editLink).toHaveAttribute("href", "/editor?resumeId=test-id-123");
  });

  it("renders check ATS button with correct link", () => {
    render(<ResumeCard resume={mockResume} />);
    
    const checkATSLink = screen.getByRole("link", { name: /check ats/i });
    expect(checkATSLink).toHaveAttribute("href", "/resumes/test-id-123/ats");
  });

  it("displays relative time since update", () => {
    render(<ResumeCard resume={mockResume} />);
    
    // Should display something like "Updated X ago"
    expect(screen.getByText(/Updated .* ago/)).toBeInTheDocument();
  });

  it("has glassmorphism styling", () => {
    const { container } = render(<ResumeCard resume={mockResume} />);
    
    const card = container.firstChild;
    expect(card).toHaveClass("backdrop-blur-xl", "bg-white/5");
  });

  it("has hover effects", () => {
    const { container } = render(<ResumeCard resume={mockResume} />);
    
    const card = container.firstChild;
    expect(card).toHaveClass("hover:bg-white/10");
  });
});
