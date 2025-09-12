"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Terminal, User, FolderOpen, Settings, Menu, X } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const navigationItems = [
  { name: "home", href: "/", icon: Terminal },
  { name: "projects", href: "/projects", icon: FolderOpen },
  { name: "about", href: "/about", icon: User },
  { name: "uses", href: "/uses", icon: Settings },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
        <nav className="flex items-center justify-between">
          {/* Terminal-style logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-green-400 transition-colors hover:text-green-300"
          >
            <Terminal size={20} />
            <span className="hidden text-lg font-semibold sm:inline">
              beabzk@dev
            </span>
            <span className="text-lg font-semibold sm:hidden">beabzk</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 font-mono text-sm transition-all duration-200 hover:bg-gray-900 ${
                    isActive
                      ? "bg-gray-900 text-green-400"
                      : "text-gray-400 hover:text-gray-200"
                  } `}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="animate-pulse text-green-400">_</span>
                  )}
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
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 font-mono text-sm transition-all duration-200 hover:bg-gray-900 ${
                      isActive
                        ? "bg-gray-900 text-green-400"
                        : "text-gray-400 hover:text-gray-200"
                    } `}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="animate-pulse text-green-400">_</span>
                    )}
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
