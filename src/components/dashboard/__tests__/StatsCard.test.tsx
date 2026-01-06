import { render, screen } from "@testing-library/react";
import StatsCard from "../StatsCard";
import { FileText } from "lucide-react";

describe("StatsCard", () => {
  it("renders title and value correctly", () => {
    render(<StatsCard title="Total Resumes" value={5} />);
    
    expect(screen.getByText("Total Resumes")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(
      <StatsCard
        title="Average Score"
        value={82}
        subtitle="Excellent compatibility"
      />
    );
    
    expect(screen.getByText("Excellent compatibility")).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    const { container } = render(
      <StatsCard title="Test" value={10} icon={FileText} />
    );
    
    // Check if icon container exists
    const iconContainer = container.querySelector(".rounded-xl");
    expect(iconContainer).toBeInTheDocument();
  });

  it("applies correct trend color for 'up'", () => {
    render(
      <StatsCard
        title="Score"
        value={90}
        subtitle="Great"
        trend="up"
      />
    );
    
    const subtitle = screen.getByText("Great");
    expect(subtitle).toHaveClass("text-green-400");
  });

  it("applies correct trend color for 'down'", () => {
    render(
      <StatsCard
        title="Score"
        value={50}
        subtitle="Needs work"
        trend="down"
      />
    );
    
    const subtitle = screen.getByText("Needs work");
    expect(subtitle).toHaveClass("text-red-400");
  });

  it("applies correct trend color for 'neutral'", () => {
    render(
      <StatsCard
        title="Score"
        value={65}
        subtitle="Good"
        trend="neutral"
      />
    );
    
    const subtitle = screen.getByText("Good");
    expect(subtitle).toHaveClass("text-gray-400");
  });

  it("displays string values correctly", () => {
    render(<StatsCard title="Status" value="N/A" />);
    
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it("has glassmorphism styling", () => {
    const { container } = render(<StatsCard title="Test" value={10} />);
    
    const card = container.firstChild;
    expect(card).toHaveClass("backdrop-blur-xl", "bg-white/5");
  });

  it("has hover effects", () => {
    const { container } = render(<StatsCard title="Test" value={10} />);
    
    const card = container.firstChild;
    expect(card).toHaveClass("hover:bg-white/10", "hover:border-white/20");
  });
});
