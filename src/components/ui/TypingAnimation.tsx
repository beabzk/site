"use client";

import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  onComplete?: () => void;
  className?: string;
}

export default function TypingAnimation({
  text,
  speed = 50,
  delay = 0,
  showCursor = true,
  onComplete,
  className = "",
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(
        () => {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        },
        currentIndex === 0 ? delay : speed
      );

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, delay, isComplete, onComplete]);

  return (
    <span className={`font-mono ${className}`}>
      {displayText}
      {showCursor && <span className="animate-pulse text-green-400">_</span>}
    </span>
  );
}

// Multi-line typing animation
interface MultiLineTypingProps {
  lines: string[];
  speed?: number;
  lineDelay?: number;
  showCursor?: boolean;
  onComplete?: () => void;
  className?: string;
}

export function MultiLineTyping({
  lines,
  speed = 50,
  lineDelay = 1000,
  showCursor = true,
  onComplete,
  className = "",
}: MultiLineTypingProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleLineComplete = () => {
    setCompletedLines((prev) => [...prev, lines[currentLineIndex]]);

    if (currentLineIndex < lines.length - 1) {
      setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
      }, lineDelay);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  };

  return (
    <div className={`font-mono ${className}`}>
      {completedLines.map((line, index) => (
        <div key={index} className="text-gray-200">
          {line}
        </div>
      ))}

      {currentLineIndex < lines.length && (
        <div>
          <TypingAnimation
            text={lines[currentLineIndex]}
            speed={speed}
            showCursor={showCursor && currentLineIndex === lines.length - 1}
            onComplete={handleLineComplete}
          />
        </div>
      )}
    </div>
  );
}
