// src/components/CompaniesClient.tsx
"use client";

import { useMemo, useState, useDeferredValue, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ActivityBadge from "@/components/ActivityBadge";

type CompanyItem = {
  id: string;
  slug: string;
  name: string;
  city: string | null;
  summary_de: string | null;
  score: number | null;
};

/** Нормалізуємо рядок: нижній регістр, без діакритик, стискаємо пробіли */
function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "") // ä→a, ö→o, ß→ss (частково)
    .replace(/\u00A0/g, " ")        // NBSP → звичайний пробіл
    .replace(/\s+/gu, " ")
    .trim();
}

export default function CompaniesClient({ items }: { items: CompanyItem[] }) {
  const [q, setQ] = useState("");
  const deferredQ = useDeferredValue(q);

  // Підготовлений “індекс” для пошуку
  const indexed = useMemo(
    () =>
      items.map((c) => ({
        ...c,
        _haystack: normalize(
          [c.name, c.city ?? "", c.summary_de ?? ""].join(" ")
        ),
      })),
    [items]
  );

  const handleText = useCallback((v: string) => {
    // страхуємося від невидимих символів
    setQ(v.replace(/\u00A0/g, " "));
  }, []);

  const clear = useCallback(() => setQ(""), []);

  // Фільтрація з урахуванням нормалізації.
  const filtered = useMemo(() => {
    const s = normalize(deferredQ);
    if (s.length === 0) return items; // гарантуємо повернення всіх
    return indexed.filter((c) => c._haystack.includes(s));
  }, [deferredQ, indexed, items]);

  return (
    <div className="space-y-4">
      {/* Пошукове поле + власна кнопка очищення + Esc */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Suchen…"
          aria-label="Unternehmen suchen"
          value={q}
          onChange={(e) => handleText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              clear();
            }
          }}
          className="w-full border border-white/40 bg-white/70 backdrop-blur px-3 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-300 pr-9"
        />
        {q.length > 0 && (
          <button
            type="button"
            aria-label="Eingabe löschen"
            onClick={clear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800 text-xl leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* container with stagger */}
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {filtered.map((c) => (
          <motion.article
            key={c.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="glass rounded-2xl p-5 shadow-sm hover:shadow transition-shadow"
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <Link href={`/company/${c.slug}`} className="text-lg font-semibold truncate">
                {c.name}
              </Link>
              <ActivityBadge score={c.score} />
            </div>
            <p className="text-sm text-neutral-700">{c.city ?? "—"}</p>
            <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
              {c.summary_de ?? "Beschreibung folgt"}
            </p>
          </motion.article>
        ))}
      </motion.div>

      {/* Порожній стан лише коли є запит і 0 збігів */}
      {filtered.length === 0 && normalize(q).length > 0 && (
        <div className="mt-6 text-sm text-neutral-600 glass rounded-2xl p-6 text-center">
          <div className="mb-2">Keine Ergebnisse gefunden.</div>
          <button className="underline" onClick={clear}>
            Alle anzeigen
          </button>
        </div>
      )}
    </div>
  );
}
