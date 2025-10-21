"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="glass rounded-2xl shadow-soft p-8 text-center max-w-md">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Etwas ist schiefgelaufen.
        </h1>
        <p className="text-neutral-700 mb-4">
          Bitte versuche es erneut oder kehre zur Startseite zurück.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="underline text-accent hover:opacity-80 transition"
          >
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="underline text-accent hover:opacity-80 transition"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
