"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme =
  | "emerald"
  | "amber"
  | "sapphire"
  | "rose"
  | "slate"
  | "paper";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: ThemeDefinition[];
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

interface ThemeDefinition {
  name: string;
  value: Theme;
  colors: ThemeColors;
  meta?: {
    isLight?: boolean;
    description?: string;
  };
}

const themes: Record<string, ThemeDefinition> = {
  emerald: {
    name: "Emerald",
    value: "emerald" as Theme,
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
    meta: { description: "Clean dark theme with green accent" },
  },
  amber: {
    name: "Amber",
    value: "amber" as Theme,
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
    meta: { description: "Warm dark theme with golden accent" },
  },
  sapphire: {
    name: "Sapphire",
    value: "sapphire" as Theme,
    colors: {
      background: "#0a0a0a",
      backgroundSecondary: "#111111",
      backgroundTertiary: "#1a1a1a",
      textPrimary: "#ffffff",
      textSecondary: "#e5e5e5",
      textTertiary: "#a3a3a3",
      accent: "#4dabf7",
      accentSecondary: "#ff6b6b",
    },
    meta: { description: "Cool dark theme with blue accent" },
  },
  rose: {
    name: "Rose",
    value: "rose" as Theme,
    colors: {
      background: "#0a0a0a",
      backgroundSecondary: "#111111",
      backgroundTertiary: "#1a1a1a",
      textPrimary: "#ffffff",
      textSecondary: "#e5e5e5",
      textTertiary: "#a3a3a3",
      accent: "#f472b6",
      accentSecondary: "#fbbf24",
    },
    meta: { description: "Soft dark theme with pink accent" },
  },
  slate: {
    name: "Slate",
    value: "slate" as Theme,
    colors: {
      background: "#0f172a",
      backgroundSecondary: "#1e293b",
      backgroundTertiary: "#334155",
      textPrimary: "#f8fafc",
      textSecondary: "#e2e8f0",
      textTertiary: "#94a3b8",
      accent: "#38bdf8",
      accentSecondary: "#f472b6",
    },
    meta: { description: "Modern slate dark theme" },
  },
  paper: {
    name: "Paper",
    value: "paper" as Theme,
    colors: {
      background: "#ffffff",
      backgroundSecondary: "#f8fafc",
      backgroundTertiary: "#f1f5f9",
      textPrimary: "#0f172a",
      textSecondary: "#334155",
      textTertiary: "#64748b",
      accent: "#059669",
      accentSecondary: "#dc2626",
    },
    meta: {
      isLight: true,
      description: "Clean light theme with high contrast",
    },
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("emerald");

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && isValidTheme(savedTheme)) {
      setTheme(savedTheme as Theme);
    }
  }, []);

  useEffect(() => {
    // Save and apply theme
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme]);

  function isValidTheme(t: string): t is Theme {
    return Object.prototype.hasOwnProperty.call(themes, t);
  }

  function applyTheme(targetTheme: Theme) {
    const themeConfig = themes[targetTheme];
    const themeColors = themeConfig.colors;
    const root = document.documentElement;

    if (themeConfig.meta?.isLight) {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }

    root.style.setProperty("--background-primary", themeColors.background);
    root.style.setProperty("--background-secondary", themeColors.backgroundSecondary);
    root.style.setProperty("--background-tertiary", themeColors.backgroundTertiary);
    root.style.setProperty("--text-primary", themeColors.textPrimary);
    root.style.setProperty("--text-secondary", themeColors.textSecondary);
    root.style.setProperty("--text-tertiary", themeColors.textTertiary);
    root.style.setProperty("--accent-primary", themeColors.accent);
    root.style.setProperty("--accent-secondary", themeColors.accentSecondary);
  }

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
