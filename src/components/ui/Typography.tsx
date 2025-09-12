import { ReactNode, HTMLAttributes } from "react";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

// Heading components with monospace font
export function H1({ children, className = "", ...props }: TypographyProps) {
  return (
    <h1
      className={`font-mono text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className = "", ...props }: TypographyProps) {
  return (
    <h2
      className={`font-mono text-3xl leading-tight font-semibold text-white md:text-4xl ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className = "", ...props }: TypographyProps) {
  return (
    <h3
      className={`font-mono text-2xl leading-snug font-medium text-white md:text-3xl ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className = "", ...props }: TypographyProps) {
  return (
    <h4
      className={`font-mono text-xl leading-snug font-medium text-white md:text-2xl ${className}`}
      {...props}
    >
      {children}
    </h4>
  );
}

export function H5({ children, className = "", ...props }: TypographyProps) {
  return (
    <h5
      className={`font-mono text-lg leading-snug font-medium text-white md:text-xl ${className}`}
      {...props}
    >
      {children}
    </h5>
  );
}

export function H6({ children, className = "", ...props }: TypographyProps) {
  return (
    <h6
      className={`font-mono text-base leading-snug font-medium text-white md:text-lg ${className}`}
      {...props}
    >
      {children}
    </h6>
  );
}

// Body text components with sans-serif font
export function P({ children, className = "", ...props }: TypographyProps) {
  return (
    <p
      className={`font-sans text-base leading-relaxed text-gray-200 md:text-lg ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function Lead({ children, className = "", ...props }: TypographyProps) {
  return (
    <p
      className={`font-sans text-lg leading-relaxed text-gray-200 md:text-xl ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function Small({ children, className = "", ...props }: TypographyProps) {
  return (
    <small
      className={`font-sans text-sm text-gray-400 ${className}`}
      {...props}
    >
      {children}
    </small>
  );
}

export function Muted({ children, className = "", ...props }: TypographyProps) {
  return (
    <span className={`font-sans text-gray-500 ${className}`} {...props}>
      {children}
    </span>
  );
}

// Code and monospace text
export function Code({ children, className = "", ...props }: TypographyProps) {
  return (
    <code
      className={`rounded bg-gray-900 px-2 py-1 font-mono text-sm text-green-400 ${className}`}
      {...props}
    >
      {children}
    </code>
  );
}

export function Pre({ children, className = "", ...props }: TypographyProps) {
  return (
    <pre
      className={`overflow-x-auto rounded-lg border border-gray-800 bg-gray-950 p-4 font-mono text-sm ${className}`}
      {...props}
    >
      {children}
    </pre>
  );
}

// List components
export function Ul({ children, className = "", ...props }: TypographyProps) {
  return (
    <ul
      className={`list-inside list-disc space-y-2 font-sans text-gray-200 ${className}`}
      {...props}
    >
      {children}
    </ul>
  );
}

export function Ol({ children, className = "", ...props }: TypographyProps) {
  return (
    <ol
      className={`list-inside list-decimal space-y-2 font-sans text-gray-200 ${className}`}
      {...props}
    >
      {children}
    </ol>
  );
}

export function Li({ children, className = "", ...props }: TypographyProps) {
  return (
    <li className={`font-sans text-gray-200 ${className}`} {...props}>
      {children}
    </li>
  );
}
