"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const navigationItems = [
  { name: "home", href: "/" },
  { name: "projects", href: "/projects" },
  { name: "articles", href: "/articles" },
  { name: "about", href: "/about" },
  { name: "uses", href: "/uses" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
        <nav className="flex items-center justify-between">
          {/* Minimal text-based logo */}
          <Link
            href="/"
            className="font-mono text-lg font-bold transition-colors hover:opacity-80"
            style={{ color: "var(--accent-primary)" }}
          >
            beabzk
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-900 ${isActive
                    ? "bg-gray-900 font-medium"
                    : "text-gray-400 hover:text-gray-200"
                    } `}
                  style={isActive ? { color: "var(--accent-primary)" } : {}}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Theme switcher */}
            <ThemeSwitcher />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-400 transition-colors hover:text-gray-200 md:hidden"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="mt-4 border-t border-gray-800 pb-4 md:hidden">
            <div className="mt-4 flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-900 ${isActive
                      ? "bg-gray-900 font-medium"
                      : "text-gray-400 hover:text-gray-200"
                      } `}
                    style={isActive ? { color: "var(--accent-primary)" } : {}}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Mobile theme switcher */}
              <div className="border-t border-gray-800 pt-2">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
