"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "terminal";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-mono transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-green-400 text-black hover:bg-green-300 active:bg-green-500",
    secondary:
      "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-600",
    ghost: "text-gray-400 hover:text-gray-200 hover:bg-gray-900",
    terminal:
      "bg-black border border-green-400 text-green-400 hover:bg-green-400 hover:text-black",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded",
    md: "px-4 py-2 text-sm rounded-md",
    lg: "px-6 py-3 text-base rounded-lg",
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === "left" && (
        <Icon size={iconSizes[size]} className="mr-2" />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon size={iconSizes[size]} className="ml-2" />
      )}
    </button>
  );
}

// Link button variant
export function LinkButton({
  href,
  external = false,
  children,
  className = "",
  ...props
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ButtonProps, "children">) {
  const Component = external ? "a" : "a"; // We'll use Next.js Link in practice

  return (
    <Component
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`no-underline ${className}`}
    >
      <Button {...props}>{children}</Button>
    </Component>
  );
}
