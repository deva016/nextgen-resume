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
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="flex items-center gap-1 rounded-full bg-black/80 dark:bg-white/10 backdrop-blur-xl border border-white/10 p-1.5 shadow-2xl">
        <button
          onClick={() => setTheme("light")}
          className={`
            relative p-2.5 rounded-full transition-all duration-300
            ${
              theme === "light"
                ? "bg-white text-gray-900 shadow-lg scale-110"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }
          `}
          title="Light mode"
          aria-label="Switch to light mode"
        >
          <Sun className="size-4" />
          {theme === "light" && (
            <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
          )}
        </button>

        <button
          onClick={() => setTheme("system")}
          className={`
            relative p-2.5 rounded-full transition-all duration-300
            ${
              theme === "system"
                ? "bg-white text-gray-900 shadow-lg scale-110"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }
          `}
          title="System theme"
          aria-label="Use system theme"
        >
          <Monitor className="size-4" />
          {theme === "system" && (
            <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
          )}
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`
            relative p-2.5 rounded-full transition-all duration-300
            ${
              theme === "dark"
                ? "bg-white text-gray-900 shadow-lg scale-110"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }
          `}
          title="Dark mode"
          aria-label="Switch to dark mode"
        >
          <Moon className="size-4" />
          {theme === "dark" && (
            <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
          )}
        </button>
      </div>
    </div>
  );
}
