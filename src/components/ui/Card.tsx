"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  hover = true,
  glow = false,
  onClick,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`rounded-lg border border-gray-800 bg-gray-950 p-6 transition-all duration-200 ${hover ? "hover:border-gray-700 hover:bg-gray-900" : ""} ${glow && isHovered ? "shadow-lg shadow-green-400/10" : ""} ${onClick ? "cursor-pointer" : ""} ${className} `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.div>
  );
}

// Project card variant
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  external?: boolean;
  size?: string;
  date?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  href,
  external = false,
  className = "",
}: ProjectCardProps) {
  const cardContent = (
    <Card className={`group ${className}`} hover glow>
      <div className="space-y-3">
        {/* Project info */}
        <div>
          <h3
            className="text-lg font-semibold text-white transition-colors"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="group-hover:text-[var(--accent-primary)] transition-colors">
              {title}
            </span>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            {description}
          </p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400 border border-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Link indicator */}
        {href && (
          <div className="flex items-center gap-2 text-sm text-gray-500 transition-colors group-hover:text-[var(--accent-primary)]">
            <span>→</span>
            <span>{external ? "External link" : "View project"}</span>
          </div>
        )}
      </div>
    </Card>
  );

  // If href is provided, wrap in Link component
  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {cardContent}
        </a>
      );
    } else {
      return (
        <Link href={href} className="block">
          {cardContent}
        </Link>
      );
    }
  }

  // If no href, return card without link
  return cardContent;
}
