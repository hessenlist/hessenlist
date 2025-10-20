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
    .from<Company>("companies")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error?.code === "PGRST116" || !data) return notFound();
  if (error) return <p className="text-red-600">Fehler: {error.message}</p>;

  const score = data.activity_index ?? computeActivityIndex(!!data.answered, data.tta_hours, !!data.contactable);

  return (
    <article className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{data.name}</h1>
        <ActivityBadge score={score} />
      </div>
      <p className="text-neutral-500">{data.city ?? "—"}</p>
      <p className="text-neutral-700">{data.summary_de ?? "Beschreibung folgt."}</p>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        {data.phone && <a className="underline" href={`tel:${data.phone}`}>Telefon</a>}
        {data.email && <a className="underline" href={`mailto:${data.email}`}>E-Mail</a>}
        {data.website && <a className="underline" target="_blank" href={data.website}>Website</a>}
      </div>
    </article>
  );
}
