"use client";

import { useState } from "react";
import { Palette, Check } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-400 transition-colors hover:text-gray-200"
        aria-label="Switch theme"
      >
        <Palette size={16} />
        <span className="font-mono text-sm">Theme</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-800 bg-gray-950 shadow-lg">
            <div className="p-2">
              <div className="mb-2 px-2 py-1 font-mono text-xs text-gray-500">
                Choose Theme
              </div>

              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded px-2 py-2 text-sm text-gray-200 transition-colors hover:bg-gray-900"
                >
                  <div className="flex items-center gap-3">
                    {/* Color preview */}
                    <div className="flex gap-1">
                      <div
                        className="h-3 w-3 rounded-full border border-gray-700"
                        style={{
                          backgroundColor: themeOption.colors.background,
                        }}
                      />
                      <div
                        className="h-3 w-3 rounded-full border border-gray-700"
                        style={{ backgroundColor: themeOption.colors.accent }}
                      />
                    </div>

                    <span className="font-mono">{themeOption.name}</span>
                  </div>

                  {theme === themeOption.value && (
                    <Check size={14} className="text-green-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
