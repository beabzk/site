"use client";

import { ReactNode } from "react";

interface CommandPromptProps {
  user?: string;
  host?: string;
  path?: string;
  children?: ReactNode;
  showCursor?: boolean;
  className?: string;
}

export default function CommandPrompt({
  user = "beabzk",
  host = "dev",
  path = "~",
  children,
  showCursor = true,
  className = "",
}: CommandPromptProps) {
  return (
    <div className={`font-mono text-sm ${className}`}>
      <div className="flex items-center gap-1">
        {/* User@host */}
        <span className="text-green-400">
          {user}@{host}
        </span>
        <span className="text-gray-400">:</span>

        {/* Current path */}
        <span className="text-blue-400">{path}</span>
        <span className="text-gray-400">$</span>

        {/* Command content */}
        {children && <span className="ml-1 text-gray-200">{children}</span>}

        {/* Blinking cursor */}
        {showCursor && (
          <span className="ml-1 animate-pulse text-green-400">_</span>
        )}
      </div>
    </div>
  );
}

// Utility component for command output
export function CommandOutput({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mt-1 font-mono text-sm text-gray-300 ${className}`}>
      {children}
    </div>
  );
}
