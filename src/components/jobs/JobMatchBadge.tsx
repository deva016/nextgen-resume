interface JobMatchBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export default function JobMatchBadge({ score, size = "md" }: JobMatchBadgeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400 bg-green-500/20 border-green-500/30";
    if (score >= 60) return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
    return "text-orange-400 bg-orange-500/20 border-orange-500/30";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Fair";
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border ${getScoreColor(score)} ${sizeClasses[size]} font-medium backdrop-blur-sm`}
    >
      <div className="flex h-2 w-2 rounded-full bg-current" />
      <span>{score}%</span>
      <span className="text-gray-400">·</span>
      <span>{getScoreLabel(score)}</span>
    </div>
  );
}
