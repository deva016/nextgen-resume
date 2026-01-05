import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}: StatsCardProps) {
  const trendColors = {
    up: "text-green-400",
    down: "text-red-400",
    neutral: "text-gray-400",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10">
      {/* Gradient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-400">{title}</p>
            <p className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-3xl font-bold text-transparent">
              {value}
            </p>
            {subtitle && (
              <p className={cn("text-xs", trend && trendColors[trend])}>
                {subtitle}
              </p>
            )}
          </div>

          {Icon && (
            <div className="rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3">
              <Icon className="size-6 text-purple-400" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
