// src/app/companies/page.tsx
export const metadata = {
  title: "Unternehmen in Hessen · HessenList",
  description:
    "Durchsuche Unternehmen in Hessen. Der Activity Index zeigt, wer wirklich antwortet.",
};
import { supabase } from "@/lib/supabaseClient";
import { computeActivityIndex } from "@/lib/activity";
import CompaniesClient from "@/components/CompaniesClient";

type Company = {
  id: string;
  slug: string;
  name: string;
  city: string | null;
  summary_de: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  answered: boolean | null;
  tta_hours: number | null;
  contactable: boolean | null;
  activity_index: number | null;
};

export default async function CompaniesPage() {
  const { data, error } = await supabase
    .from("companies") // без <Company> — поки не генеримо типи з Supabase
    .select("*")
    .order("name", { ascending: true });

  if (error) return <p className="text-red-600">Fehler: {error.message}</p>;

  const rows = (data ?? []) as Company[];

  // Підготуємо легку форму даних для клієнта
  const items = rows.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    city: c.city,
    summary_de: c.summary_de,
    score:
      c.activity_index ??
      computeActivityIndex(!!c.answered, c.tta_hours, !!c.contactable),
  }));

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Unternehmen</h1>
      <CompaniesClient items={items} />
    </section>
  );
}
