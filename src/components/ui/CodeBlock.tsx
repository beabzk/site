"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export default function CodeBlock({
  code,
  language = "text",
  filename,
  showLineNumbers = false,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const lines = code.split("\n");

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-800 bg-gray-950 ${className}`}
    >
      {/* Header */}
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-2">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="font-mono text-sm text-gray-300">
                {filename}
              </span>
            )}
            {language && (
              <span className="rounded bg-gray-800 px-2 py-1 font-mono text-xs text-gray-500">
                {language}
              </span>
            )}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-gray-400 transition-colors hover:text-gray-200"
            aria-label="Copy code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      )}

      {/* Code content */}
      <div className="relative">
        <pre className="overflow-x-auto p-4">
          <code className="font-mono text-sm text-gray-200">
            {showLineNumbers ? (
              <div className="table w-full">
                {lines.map((line, index) => (
                  <div key={index} className="table-row">
                    <div className="table-cell w-8 pr-4 text-right text-gray-500 select-none">
                      {index + 1}
                    </div>
                    <div className="table-cell">{line || "\u00A0"}</div>
                  </div>
                ))}
              </div>
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
