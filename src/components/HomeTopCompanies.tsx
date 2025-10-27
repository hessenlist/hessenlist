// src/components/HomeTopCompanies.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ActivityBadge from "@/components/ActivityBadge";

export type HomeCompany = {
  id: string;
  slug: string;
  name: string;
  city: string | null;
  summary_de: string | null;
  score: number | null;
};

export default function HomeTopCompanies({ items }: { items: HomeCompany[] }) {
  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {items.map((c) => (
        <motion.article
          key={c.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="glass rounded-2xl p-5 shadow-sm hover:shadow"
        >
          <div className="flex items-center justify-between">
            <Link href={`/company/${c.slug}`} className="font-semibold truncate">
              {c.name}
            </Link>
            <ActivityBadge score={c.score} />
          </div>
          <p className="text-sm text-neutral-700 mt-1">{c.city ?? "—"}</p>
          <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
            {c.summary_de ?? "Beschreibung folgt"}
          </p>
        </motion.article>
      ))}
    </motion.div>
  );
}
