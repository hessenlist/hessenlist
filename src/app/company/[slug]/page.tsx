import { supabase } from "@/lib/supabaseClient";
import ActivityBadge from "@/components/ActivityBadge";
import { computeActivityIndex } from "@/lib/activity";
import { notFound } from "next/navigation";

type Company = {
  id: string; slug: string; name: string; city: string | null; summary_de: string | null;
  phone: string | null; email: string | null; website: string | null;
  answered: boolean | null; tta_hours: number | null; contactable: boolean | null;
  activity_index: number | null;
};

export default async function CompanyPage({ params }: { params: { slug: string } }) {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("slug", params.slug)
    .maybeSingle();

  if (error) return <p className="text-red-600">Fehler: {error.message}</p>;
  if (!data) return notFound();

  const c = data as Company;
  const score =
    c.activity_index ??
    computeActivityIndex(!!c.answered, c.tta_hours, !!c.contactable);

  return (
    <article className="glass rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{c.name}</h1>
        <ActivityBadge score={score} />
      </div>
      <p className="text-neutral-700">{c.city ?? "—"}</p>
      <p className="text-neutral-700 mt-2">{c.summary_de ?? "Beschreibung folgt."}</p>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        {c.phone && <a className="underline" href={`tel:${c.phone}`}>Telefon</a>}
        {c.email && <a className="underline" href={`mailto:${c.email}`}>E-Mail</a>}
        {c.website && <a className="underline" target="_blank" href={c.website}>Website</a>}
      </div>
    </article>
  );
}
