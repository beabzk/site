"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">
            © {currentYear} beabzk. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/beabzk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-[var(--accent-primary)]"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/beabzk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-[var(--accent-primary)]"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:beabzk@proton.me"
              className="text-gray-500 transition-colors hover:text-[var(--accent-primary)]"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
