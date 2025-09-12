"use client";

import { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import Terminal from "../components/ui/Terminal";
import CommandPrompt from "../components/ui/CommandPrompt";
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
      <div className="space-y-8 text-center">
        {/* Terminal Error */}
        <Terminal
          title="system-error"
          showControls={false}
          className="mx-auto max-w-2xl"
        >
          <div className="space-y-3">
            <CommandPrompt showCursor={false}>./run-application</CommandPrompt>
            <div className="font-mono text-sm text-red-400">
              Segmentation fault (core dumped)
            </div>
            <div className="font-mono text-sm text-gray-400">
              Process exited with code 1
            </div>
            <CommandPrompt showCursor={false}>echo $?</CommandPrompt>
            <div className="font-mono text-sm text-red-400">1</div>
          </div>
        </Terminal>

        {/* Error Message */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle size={32} className="text-red-400" />
            <H2 className="text-red-400">Something went wrong!</H2>
          </div>

          <P className="mx-auto max-w-md">
            An unexpected error occurred while processing your request. This has
            been logged and will be investigated.
          </P>
        </div>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === "development" && (
          <Terminal
            title="error-details"
            showControls={false}
            className="mx-auto max-w-2xl"
          >
            <div className="space-y-2 text-left text-sm">
              <div className="font-mono text-gray-400">$ cat error.log</div>
              <div className="font-mono text-xs break-all text-red-400">
                {error.message}
              </div>
              {error.digest && (
                <div className="font-mono text-xs text-gray-500">
                  Error ID: {error.digest}
                </div>
              )}
            </div>
          </Terminal>
        )}

        {/* Recovery Options */}
        <div className="space-y-6">
          <div className="flex flex-wrap justify-center gap-4">
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
                  "mailto:hello@beabzk.dev?subject=Error Report&body=" +
                  encodeURIComponent(
                    `Error: ${error.message}\nDigest: ${error.digest || "N/A"}\nURL: ${window.location.href}`
                  ))
              }
            >
              <Bug size={16} />
              Report Issue
            </Button>
          </div>

          {/* Debug Info */}
          <Terminal
            title="debug-info"
            showControls={false}
            className="mx-auto max-w-lg"
          >
            <div className="space-y-2 text-left text-sm">
              <div className="font-mono text-gray-400">$ system-status</div>
              <div className="space-y-1 font-mono text-gray-300">
                <div>Status: Error detected</div>
                <div>Time: {new Date().toISOString()}</div>
                <div>
                  Browser:{" "}
                  {typeof window !== "undefined"
                    ? navigator.userAgent.split(" ").pop()
                    : "Unknown"}
                </div>
                <div>
                  URL:{" "}
                  {typeof window !== "undefined"
                    ? window.location.pathname
                    : "Unknown"}
                </div>
              </div>
            </div>
          </Terminal>
        </div>

        {/* Helpful Message */}
        <Terminal
          title="recovery-tips"
          showControls={false}
          className="mx-auto max-w-lg"
        >
          <div className="space-y-2 text-left text-sm">
            <div className="font-mono text-gray-400">
              $ cat recovery-tips.txt
            </div>
            <div className="space-y-1 text-gray-300">
              <div>• Try refreshing the page</div>
              <div>• Check your internet connection</div>
              <div>• Clear your browser cache</div>
              <div>• If the problem persists, please report it</div>
            </div>
          </div>
        </Terminal>
      </div>
    </MainLayout>
  );
}
