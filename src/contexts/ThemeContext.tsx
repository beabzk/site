"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme =
  | "github-dark"
  | "dracula"
  | "monokai"
  | "terminal-green"
  | "terminal-amber";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { name: string; value: Theme; colors: ThemeColors }[];
}

interface ThemeColors {
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  accent: string;
  accentSecondary: string;
}

const themes = {
  "github-dark": {
    name: "GitHub Dark",
    value: "github-dark" as Theme,
    colors: {
      background: "#0d1117",
      backgroundSecondary: "#161b22",
      backgroundTertiary: "#21262d",
      textPrimary: "#f0f6fc",
      textSecondary: "#e6edf3",
      textTertiary: "#7d8590",
      accent: "#238636",
      accentSecondary: "#f85149",
    },
  },
  dracula: {
    name: "Dracula",
    value: "dracula" as Theme,
    colors: {
      background: "#282a36",
      backgroundSecondary: "#44475a",
      backgroundTertiary: "#6272a4",
      textPrimary: "#f8f8f2",
      textSecondary: "#e6e6e6",
      textTertiary: "#6272a4",
      accent: "#50fa7b",
      accentSecondary: "#ff5555",
    },
  },
  monokai: {
    name: "Monokai",
    value: "monokai" as Theme,
    colors: {
      background: "#272822",
      backgroundSecondary: "#3e3d32",
      backgroundTertiary: "#49483e",
      textPrimary: "#f8f8f2",
      textSecondary: "#e6e6e6",
      textTertiary: "#75715e",
      accent: "#a6e22e",
      accentSecondary: "#f92672",
    },
  },
  "terminal-green": {
    name: "Terminal Green",
    value: "terminal-green" as Theme,
    colors: {
      background: "#0a0a0a",
      backgroundSecondary: "#111111",
      backgroundTertiary: "#1a1a1a",
      textPrimary: "#ffffff",
      textSecondary: "#e5e5e5",
      textTertiary: "#a3a3a3",
      accent: "#00ff88",
      accentSecondary: "#ff6b6b",
    },
  },
  "terminal-amber": {
    name: "Terminal Amber",
    value: "terminal-amber" as Theme,
    colors: {
      background: "#0a0a0a",
      backgroundSecondary: "#111111",
      backgroundTertiary: "#1a1a1a",
      textPrimary: "#ffffff",
      textSecondary: "#e5e5e5",
      textTertiary: "#a3a3a3",
      accent: "#ffd43b",
      accentSecondary: "#ff6b6b",
    },
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("terminal-green");

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme &&
      Object.prototype.hasOwnProperty.call(themes, savedTheme)
    ) {
      setTheme(savedTheme as Theme);
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage and apply CSS variables
    localStorage.setItem("theme", theme);
    const themeColors = themes[theme].colors;

    const root = document.documentElement;
    // Add dark class for consistent styling (preserve existing classes)
    root.classList.add("dark");
    root.style.setProperty("--background-primary", themeColors.background);
    root.style.setProperty(
      "--background-secondary",
      themeColors.backgroundSecondary
    );
    root.style.setProperty(
      "--background-tertiary",
      themeColors.backgroundTertiary
    );
    root.style.setProperty("--text-primary", themeColors.textPrimary);
    root.style.setProperty("--text-secondary", themeColors.textSecondary);
    root.style.setProperty("--text-tertiary", themeColors.textTertiary);
    root.style.setProperty("--accent-primary", themeColors.accent);
    root.style.setProperty("--accent-secondary", themeColors.accentSecondary);
  }, [theme]);

  const value = {
    theme,
    setTheme,
    themes: Object.values(themes),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
