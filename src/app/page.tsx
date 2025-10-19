import { supabase } from "@/lib/supabaseClient";
import { computeActivityIndex } from "@/lib/activity";
import ActivityBadge from "@/components/ActivityBadge";

type Company = {
  id: string;
  slug: string;
  name: string;
  city: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  summary_de: string | null;
  contactable: boolean | null;
  answered: boolean | null;
  tta_hours: number | null;
  activity_index: number | null;
};

export default async function HomePage() {
  const { data, error } = await supabase
    .from<Company>("companies")
    .select("*")
    .order("name", { ascending: true })
    .limit(24);

  if (error) {
    return (
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold">HessenList</h1>
        <p className="text-red-600 mt-4">Помилка: {error.message}</p>
      </main>
    );
  }

  const companies = (data ?? []).map((c) => ({
    ...c,
    score: c.activity_index ?? computeActivityIndex(!!c.answered, c.tta_hours, !!c.contactable),
  }));

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">HessenList</h1>
          <p className="text-sm text-neutral-500">
            Показуємо, які компанії справді відповідають
          </p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((c) => (
          <article key={c.id} className="rounded-2xl border p-4 hover:shadow-sm transition">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold truncate">{c.name}</h3>
              <ActivityBadge score={c.score} />
            </div>
            <p className="text-sm text-neutral-500 mt-1">{c.city ?? "—"}</p>
            <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
              {c.summary_de ?? "Опис буде додано"}
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {c.phone && (
                <a className="underline" href={`tel:${c.phone}`}>
                  Телефон
                </a>
              )}
              {c.email && (
                <a className="underline" href={`mailto:${c.email}`}>
                  Email
                </a>
              )}
              {c.website && (
                <a className="underline" target="_blank" href={c.website}>
                  Сайт
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {companies.length === 0 && (
        <p className="text-neutral-500">Поки що порожньо — додайте перші компанії в базу.</p>
      )}
    </main>
  );
}
