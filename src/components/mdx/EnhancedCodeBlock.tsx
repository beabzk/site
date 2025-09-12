"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface EnhancedCodeBlockProps {
  children: React.ReactNode;
  className?: string;
  "data-language"?: string;
  "data-theme"?: string;
}

export default function EnhancedCodeBlock({
  children,
  className = "",
  "data-language": language,
  "data-theme": _theme,
  ...props
}: EnhancedCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      // Extract text content from the code block
      const textContent =
        typeof children === "string"
          ? children
          : (children as React.ReactElement<{ children?: string }>)?.props
              ?.children || "";

      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="group relative my-6">
      {/* Header with language and copy button */}
      {language && (
        <div className="flex items-center justify-between rounded-t-lg border-b border-gray-700 bg-gray-900 px-4 py-2">
          <span className="rounded bg-gray-800 px-2 py-1 font-mono text-xs text-gray-400">
            {language}
          </span>
          <button
            onClick={copyToClipboard}
            className="rounded p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-800"
            title="Copy code"
          >
            {copied ? (
              <Check size={16} className="text-green-400" />
            ) : (
              <Copy size={16} className="text-gray-400" />
            )}
          </button>
        </div>
      )}

      {/* Code content */}
      <pre
        className={`overflow-x-auto bg-gray-950 p-4 font-mono text-sm leading-relaxed ${language ? "rounded-b-lg" : "rounded-lg"} ${className} `}
        {...props}
      >
        {children}
      </pre>

      {/* Copy button (when no header) */}
      {!language && (
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 rounded p-2 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-800"
          title="Copy code"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} className="text-gray-400" />
          )}
        </button>
      )}
    </div>
  );
}

// Component for inline code
export function InlineCode({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={`rounded bg-gray-800 px-1.5 py-0.5 font-mono text-sm text-green-400 ${className}`}
      {...props}
    >
      {children}
    </code>
  );
}
