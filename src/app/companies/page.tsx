import { supabase } from "@/lib/supabaseClient";
import ActivityBadge from "@/components/ActivityBadge";
import { computeActivityIndex } from "@/lib/activity";

type Company = {
  id: string; slug: string; name: string;
  city: string | null; summary_de: string | null;
  phone: string | null; email: string | null; website: string | null;
  answered: boolean | null; tta_hours: number | null; contactable: boolean | null;
  activity_index: number | null;
};

export default async function CompaniesPage() {
  const { data, error } = await supabase
    .from<Company>("companies")
    .select("*")
    .order("name", { ascending: true });

  if (error) return <p className="text-red-600">Fehler: {error.message}</p>;

  const items = (data ?? []).map(c => ({
    ...c,
    score: c.activity_index ?? computeActivityIndex(!!c.answered, c.tta_hours, !!c.contactable),
  }));

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Unternehmen</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(c => (
          <article key={c.id} className="rounded-2xl border p-4 hover:shadow-sm transition">
            <div className="flex items-center justify-between gap-3">
              <a href={`/company/${c.slug}`} className="text-lg font-semibold truncate">
                {c.name}
              </a>
              <ActivityBadge score={c.score} />
            </div>
            <p className="text-sm text-neutral-500 mt-1">{c.city ?? "—"}</p>
            <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
              {c.summary_de ?? "Beschreibung folgt"}
            </p>
          </article>
        ))}
      </div>
      {items.length === 0 && <p className="text-neutral-500">Noch keine Einträge.</p>}
    </section>
  );
}
