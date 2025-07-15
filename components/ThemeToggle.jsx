"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Laptop } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const themes = ["system", "light", "dark"];

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  const getIcon = (theme) => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      case "system":
      default:
        return <Laptop className="h-4 w-4" />;
    }
  };

  const getLabel = (theme) => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
      default:
        return "System";
    }
  };

  const cycleTheme = () => {
    const next = themes[(themes.indexOf(theme || "system") + 1) % themes.length];
    setTheme(next);
  };

  return (
    <button
      onClick={cycleTheme}
      aria-label="Toggle Theme"
      className="flex items-center gap-2 px-4 h-10 rounded-md text-sm font-medium border transition-all
                 bg-gray-100 text-black border-gray-300 hover:bg-gray-200
                 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
    >
      {getIcon(theme || "system")}
      <span className="hidden sm:inline">{getLabel(theme || "system")} Mode</span>
    </button>
  );
}
