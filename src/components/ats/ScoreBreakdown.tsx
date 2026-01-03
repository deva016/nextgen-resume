"use client";

interface ScoreBreakdownProps {
  keywordScore: number;
  formattingScore: number;
  contentScore: number;
}

export default function ScoreBreakdown({
  keywordScore,
  formattingScore,
  contentScore,
}: ScoreBreakdownProps) {
  const getBarColor = (score: number) => {
    if (score >= 80) return "bg-gradient-to-r from-green-500 to-emerald-500";
    if (score >= 60) return "bg-gradient-to-r from-yellow-500 to-orange-500";
    return "bg-gradient-to-r from-red-500 to-pink-500";
  };

  const categories = [
    { label: "Keywords", score: keywordScore, icon: "🔑" },
    { label: "Formatting", score: formattingScore, icon: "📐" },
    { label: "Content", score: contentScore, icon: "✍️" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Score Breakdown</h3>
      
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium">
                <span>{category.icon}</span>
                {category.label}
              </span>
              <span className="text-sm font-bold">{category.score}/100</span>
            </div>
            
            {/* Progress bar */}
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full ${getBarColor(category.score)} transition-all duration-1000 ease-out`}
                style={{ width: `${category.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
