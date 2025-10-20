import { supabase } from "@/lib/supabaseClient";
import ActivityBadge from "@/components/ActivityBadge";
import { computeActivityIndex } from "@/lib/activity";
import Link from "next/link";

type Company = {
  id: string; slug: string; name: string; city: string | null;
  answered: boolean | null; tta_hours: number | null; contactable: boolean | null;
  activity_index: number | null; summary_de: string | null;
};

export default async function HomePage() {
  const { data } = await supabase.from("companies").select("*").limit(24);
  const rows = (data ?? []) as Company[];

  const items = rows
    .map((c) => ({
      ...c,
      score:
        c.activity_index ??
        computeActivityIndex(!!c.answered, c.tta_hours, !!c.contactable),
    }))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 3);

  return (
    <section className="space-y-8">
      <div className="pt-10">
        <h1 className="text-5xl font-semibold tracking-tight">HessenList</h1>
        <p className="text-neutral-700 text-lg mt-2">
          Finde Unternehmen, die wirklich antworten.
        </p>
        <div className="pt-3">
          <Link className="underline text-sm" href="/companies">
            Alle Unternehmen ansehen →
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <article key={c.id} className="glass rounded-2xl p-5 shadow-sm hover:shadow">
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
          </article>
        ))}
      </div>
    </section>
  );
}
