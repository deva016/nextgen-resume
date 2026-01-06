import { render, screen } from "@testing-library/react";
import EmptyState from "../EmptyState";

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = "Link";
  return MockLink;
});

describe("EmptyState", () => {
  it("renders empty state message", () => {
    render(<EmptyState />);
    
    expect(screen.getByText("No resumes yet")).toBeInTheDocument();
  });

  it("renders descriptive text", () => {
    render(<EmptyState />);
    
    expect(
      screen.getByText(/Create your first AI-powered resume/i)
    ).toBeInTheDocument();
  });

  it("renders create resume button", () => {
    render(<EmptyState />);
    
    const button = screen.getByRole("link", {
      name: /Create Your First Resume/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/editor");
  });

  it("displays FileText icon", () => {
    const { container } = render(<EmptyState />);
    
    // Check for icon container
    const iconContainer = container.querySelector(".rounded-full");
    expect(iconContainer).toBeInTheDocument();
  });

  it("has glassmorphism styling", () => {
    const { container } = render(<EmptyState />);
    
    const mainContainer = container.querySelector(".backdrop-blur-xl");
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass("bg-white/5");
  });

  it("has gradient button styling", () => {
    render(<EmptyState />);
    
    const button = screen.getByRole("link", {
      name: /Create Your First Resume/i,
    });
    expect(button).toHaveClass(
      "bg-gradient-to-r",
      "from-purple-600",
      "to-pink-600"
    );
  });

  it("has dashed border styling", () => {
    const { container } = render(<EmptyState />);
    
    const mainContainer = container.querySelector(".border-dashed");
    expect(mainContainer).toBeInTheDocument();
  });
});
