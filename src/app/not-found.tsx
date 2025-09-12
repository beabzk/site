"use client";

import Link from "next/link";
import MainLayout from "../components/layout/MainLayout";
import Terminal from "../components/ui/Terminal";
import CommandPrompt from "../components/ui/CommandPrompt";
import TypingAnimation from "../components/ui/TypingAnimation";
import Button from "../components/ui/Button";
import { H2, P } from "../components/ui/Typography";
import { Home, ArrowLeft, Search, FileX } from "lucide-react";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="space-y-8 text-center">
        {/* Terminal Error */}
        <Terminal
          title="error"
          showControls={false}
          className="mx-auto max-w-2xl"
        >
          <div className="space-y-3">
            <CommandPrompt showCursor={false}>
              <TypingAnimation text="cd /requested-page" speed={100} />
            </CommandPrompt>
            <div className="font-mono text-sm text-red-400">
              bash: cd: /requested-page: No such file or directory
            </div>
            <CommandPrompt showCursor={false}>
              <TypingAnimation text="ls -la" speed={100} delay={2000} />
            </CommandPrompt>
            <div className="font-mono text-sm text-gray-400">total 0</div>
          </div>
        </Terminal>

        {/* Error Message */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <FileX size={32} className="text-red-400" />
            <H2 className="text-red-400">404 - Page Not Found</H2>
          </div>

          <P className="mx-auto max-w-md">
            The page you&apos;re looking for doesn&apos;t exist in this
            directory. It might have been moved, deleted, or you may have
            mistyped the URL.
          </P>
        </div>

        {/* Navigation Options */}
        <div className="space-y-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button variant="primary" className="flex items-center gap-2">
                <Home size={16} />
                Go Home
              </Button>
            </Link>

            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={16} />
              Go Back
            </Button>

            <Link href="/projects">
              <Button variant="ghost" className="flex items-center gap-2">
                <Search size={16} />
                Browse Projects
              </Button>
            </Link>
          </div>

          {/* Helpful Links */}
          <Terminal
            title="available-routes"
            showControls={false}
            className="mx-auto max-w-lg"
          >
            <div className="space-y-2 text-left text-sm">
              <div className="font-mono text-gray-400">
                $ find . -name &quot;*.tsx&quot; -type f
              </div>
              <div className="space-y-1 font-mono text-gray-300">
                <Link
                  href="/"
                  className="block transition-colors hover:text-green-400"
                >
                  ./home
                </Link>
                <Link
                  href="/projects"
                  className="block transition-colors hover:text-green-400"
                >
                  ./projects
                </Link>
                <Link
                  href="/about"
                  className="block transition-colors hover:text-green-400"
                >
                  ./about
                </Link>
                <Link
                  href="/uses"
                  className="block transition-colors hover:text-green-400"
                >
                  ./uses
                </Link>
              </div>
            </div>
          </Terminal>
        </div>

        {/* Fun Terminal Message */}
        <Terminal
          title="suggestion"
          showControls={false}
          className="mx-auto max-w-lg"
        >
          <div className="space-y-2 text-left text-sm">
            <CommandPrompt showCursor={false}>
              <TypingAnimation
                text="echo $RANDOM_TIP"
                speed={80}
                delay={4000}
              />
            </CommandPrompt>
            <div className="font-mono text-green-400">
              &quot;When in doubt, check the documentation... or just go home
              🏠&quot;
            </div>
          </div>
        </Terminal>
      </div>
    </MainLayout>
  );
}
