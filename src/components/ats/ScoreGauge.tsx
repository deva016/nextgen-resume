"use client";

interface ScoreGaugeProps {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
}

export default function ScoreGauge({ score, label, size = "md" }: ScoreGaugeProps) {
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
  };

  const textSizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  // Color based on score
  const getColor = () => {
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Background circle */}
        <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-white/10"
          />
          {/* Progress circle */}
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={`text-transparent ${getColor()}`} />
              <stop offset="100%" className={`text-transparent ${getColor()}`} />
            </linearGradient>
          </defs>
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${textSizes[size]} font-bold bg-gradient-to-r ${getColor()} bg-clip-text text-transparent`}>
            {score}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}
