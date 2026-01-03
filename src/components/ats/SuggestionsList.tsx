"use client";

import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface SuggestionsListProps {
  suggestions: string[];
  matchedKeywords?: string[];
  missingKeywords?: string[];
}

export default function SuggestionsList({
  suggestions,
  matchedKeywords = [],
  missingKeywords = [],
}: SuggestionsListProps) {
  const getIcon = (suggestion: string) => {
    if (suggestion.includes("✅") || suggestion.includes("Great")) {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }
    if (suggestion.includes("🚨") || suggestion.includes("significant")) {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
    return <AlertCircle className="h-5 w-5 text-yellow-500" />;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Improvement Suggestions</h3>

      {/* Suggestions */}
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10"
          >
            {getIcon(suggestion)}
            <p className="flex-1 text-sm text-gray-300">{suggestion}</p>
          </div>
        ))}
      </div>

      {/* Keywords section */}
      {(matchedKeywords.length > 0 || missingKeywords.length > 0) && (
        <div className="space-y-4">
          {matchedKeywords.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-medium text-green-400">
                ✓ Matched Keywords ({matchedKeywords.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {matchedKeywords.slice(0, 10).map((keyword, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {missingKeywords.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-medium text-orange-400">
                ⚠ Missing Keywords ({missingKeywords.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.slice(0, 10).map((keyword, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
