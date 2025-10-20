"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ActivityBadge from "@/components/ActivityBadge";

type CompanyItem = {
  id: string;
  slug: string;
  name: string;
  city: string | null;
  summary_de: string | null;
  score: number | null;
};

export default function CompaniesClient({ items }: { items: CompanyItem[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((c) =>
      [c.name, c.city, c.summary_de].some((v) =>
        (v ?? "").toLowerCase().includes(s)
      )
    );
  }, [q, items]);

  return (
    <div className="space-y-4">
      <input
        placeholder="Suchen…"
        aria-label="Unternehmen suchen"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-full max-w-md border border-white/40 bg-white/70 backdrop-blur px-3 h-9 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-300"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <article
            key={c.id}
            className="glass rounded-2xl shadow-sm p-5 hover:shadow transition-shadow"
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <Link
                href={`/company/${c.slug}`}
                className="text-lg font-semibold truncate"
              >
                {c.name}
              </Link>
              <ActivityBadge score={c.score} />
            </div>
            <p className="text-sm text-neutral-700">{c.city ?? "—"}</p>
            <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
              {c.summary_de ?? "Beschreibung folgt"}
            </p>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 text-sm text-neutral-600">
          Keine Ergebnisse gefunden.
        </div>
      )}
    </div>
  );
}
