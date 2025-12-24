"use client";

import { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { H2, P } from "../components/ui/Typography";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <MainLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        {/* Error Icon */}
        <div className="mb-8 rounded-full bg-red-500/10 p-6 text-red-500">
          <AlertTriangle size={48} />
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <H2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Something went wrong!
          </H2>
          <P className="mx-auto max-w-md text-gray-400">
            An unexpected error occurred while processing your request. This has
            been logged and will be investigated.
          </P>
        </div>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === "development" && (
          <Container variant="subtle" className="mt-8 max-w-2xl border border-red-900/50 bg-red-950/10 text-left">
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-red-400">Error Details</div>
            <div className="font-mono text-sm text-red-300 break-all">
              {error.message}
            </div>
            {error.digest && (
              <div className="mt-2 text-xs text-gray-500 font-mono">
                Digest: {error.digest}
              </div>
            )}
          </Container>
        )}

        {/* Recovery Options */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button
            variant="primary"
            className="flex items-center gap-2"
            onClick={reset}
          >
            <RefreshCw size={16} />
            Try Again
          </Button>

          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => (window.location.href = "/")}
          >
            <Home size={16} />
            Go Home
          </Button>

          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() =>
            (window.location.href =
              "mailto:beabzk@proton.me?subject=Error Report&body=" +
              encodeURIComponent(
                `Error: ${error.message}\nDigest: ${error.digest || "N/A"}\nURL: ${window.location.href}`
              ))
            }
          >
            <Bug size={16} />
            Report Issue
          </Button>
        </div>

        {/* Helpful Tips */}
        <div className="mt-12 max-w-md text-sm text-gray-500">
          <p>Try refreshing the page or checking your internet connection.</p>
        </div>
      </div>
    </MainLayout>
  );
}
