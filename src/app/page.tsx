// src/app/page.tsx
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { computeActivityIndex } from "@/lib/activity";
import HomeTopCompanies from "@/components/HomeTopCompanies";
import BrandDemo from "@/components/BrandDemo";

export const metadata = {
  title: "HessenList — Unternehmen, die wirklich antworten",
  description:
    "Finde Firmen in Hessen mit echtem Activity Index (Antwortgeschwindigkeit & Verlässlichkeit).",
};

// стабільність рендеру між маршрутами
export const revalidate = 0;
export const dynamic = "force-dynamic";

type Company = {
  id: string;
  slug: string;
  name: string;
  city: string | null;
  answered: boolean | null;
  tta_hours: number | null;
  contactable: boolean | null;
  activity_index: number | null;
  summary_de: string | null;
};

export default async function HomePage() {
  const { data } = await supabase.from("companies").select("*").limit(24);
  const rows = (data ?? []) as Company[];

  const items = rows
    .map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      city: c.city,
      summary_de: c.summary_de,
      score:
        c.activity_index ??
        computeActivityIndex(!!c.answered, c.tta_hours, !!c.contactable),
    }))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 3);

  return (
    <section className="space-y-8">
      {/* HERO */}
      <div className="relative pt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-56 w-[720px] rounded-full"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,.7) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(20px)",
          }}
        />
        <h1 className="relative text-3xl sm:text-5xl font-semibold tracking-tight">
          HessenList
        </h1>
        <p className="relative text-neutral-700 text-base sm:text-lg mt-2">
          Finde Unternehmen, die wirklich antworten.
        </p>
        <div className="relative pt-3">
          <Link className="underline text-sm" href="/companies">
            Alle Unternehmen ansehen →
          </Link>
        </div>
      </div>

      {/* Топ-3 компанії */}
      <HomeTopCompanies items={items} />

      {/* CTA */}
      <section className="mt-12 glass rounded-2xl p-6 text-center">
        <h2 className="text-xl font-semibold tracking-tight">Activity Index</h2>
        <p className="text-neutral-700 mt-2">
          Wie messen wir Antwortgeschwindigkeit und Verlässlichkeit?
        </p>
        <Link href="/about/activity-index" className="underline mt-3 inline-block">
          Mehr erfahren →
        </Link>
      </section>

      <BrandDemo />
    </section>
  );
}
