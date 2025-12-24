"use client";

import Link from "next/link";
import MainLayout from "../components/layout/MainLayout";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { H2, P } from "../components/ui/Typography";
import { Home, ArrowLeft, Search, FileX } from "lucide-react";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        {/* Error Icon */}
        <div className="mb-8 rounded-full bg-red-500/10 p-6 text-red-500">
          <FileX size={48} />
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <H2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            404 - Page Not Found
          </H2>
          <P className="mx-auto max-w-md text-gray-400">
            The page you&apos;re looking for doesn&apos;t exist in this
            directory. It might have been moved, deleted, or you may have
            mistyped the URL.
          </P>
        </div>

        {/* Navigation Options */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
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

        {/* Helpful Status */}
        <div className="mt-12 w-full max-w-sm">
          <Container variant="subtle" className="py-4 text-xs font-mono text-gray-500">
            <div className="flex justify-between border-b border-gray-800 pb-2 mb-2">
              <span>PATH</span>
              <span>STATUS</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate">/requested-page</span>
              <span className="text-red-500">NOT_FOUND</span>
            </div>
          </Container>
        </div>
      </div>
    </MainLayout>
  );
}
