// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="glass rounded-2xl shadow-soft p-8 text-center max-w-md">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">404</h1>
        <p className="text-neutral-700 mb-4">
          Die Seite wurde nicht gefunden.
        </p>
        <Link
          href="/"
          className="inline-block underline text-accent hover:opacity-80 transition"
        >
          Zur Startseite →
        </Link>
      </div>
    </main>
  );
}
