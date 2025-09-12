"use client";

import { ReactNode, useState } from "react";
import { Minimize2, Maximize2 } from "lucide-react";

interface TerminalProps {
  title?: string;
  children: ReactNode;
  className?: string;
  showControls?: boolean;
}

export default function Terminal({
  title = "terminal",
  children,
  className = "",
  showControls = true,
}: TerminalProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-800 bg-gray-950 ${className}`}
    >
      {/* Terminal header */}
      {showControls && (
        <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-2">
          <div className="flex items-center gap-2">
            {/* Traffic light buttons */}
            <div className="flex items-center gap-2">
              <button
                className="h-3 w-3 rounded-full bg-red-500 transition-colors hover:bg-red-400"
                aria-label="Close"
              />
              <button
                className="h-3 w-3 rounded-full bg-yellow-500 transition-colors hover:bg-yellow-400"
                onClick={() => setIsMinimized(!isMinimized)}
                aria-label="Minimize"
              />
              <button
                className="h-3 w-3 rounded-full bg-green-500 transition-colors hover:bg-green-400"
                aria-label="Maximize"
              />
            </div>

            {/* Terminal title */}
            <span className="ml-4 font-mono text-sm text-gray-400">
              {title}
            </span>
          </div>

          {/* Window controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-500 transition-colors hover:text-gray-300"
            >
              {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
            </button>
          </div>
        </div>
      )}

      {/* Terminal content */}
      {!isMinimized && <div className="p-4 font-mono text-sm">{children}</div>}
    </div>
  );
}
