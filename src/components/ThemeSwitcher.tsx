"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Monitor, Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="flex items-center gap-0.5 rounded-full bg-black/70 dark:bg-white/10 backdrop-blur-md border border-white/10 p-0.5 shadow-lg">
        <button
          onClick={() => setTheme("light")}
          className={`
            relative p-1.5 rounded-full transition-all duration-200
            ${
              theme === "light"
                ? "bg-white text-gray-900 shadow-md"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }
          `}
          title="Light mode"
          aria-label="Switch to light mode"
        >
          <Sun className="size-3.5" />
        </button>

        <button
          onClick={() => setTheme("system")}
          className={`
            relative p-1.5 rounded-full transition-all duration-200
            ${
              theme === "system"
                ? "bg-white text-gray-900 shadow-md"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }
          `}
          title="System theme"
          aria-label="Use system theme"
        >
          <Monitor className="size-3.5" />
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`
            relative p-1.5 rounded-full transition-all duration-200
            ${
              theme === "dark"
                ? "bg-white text-gray-900 shadow-md"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }
          `}
          title="Dark mode"
          aria-label="Switch to dark mode"
        >
          <Moon className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
