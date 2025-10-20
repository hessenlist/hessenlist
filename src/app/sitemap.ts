import { siteConfig } from "@/config/site";
import { supabase } from "@/lib/supabaseClient";

export default async function sitemap() {
  const base = siteConfig.url;
  const urls = [{ url: `${base}/`, priority: 1 }, { url: `${base}/companies`, priority: 0.8 }];

  const { data } = await supabase.from("companies").select("slug");
  (data ?? []).forEach(r => urls.push({ url: `${base}/company/${r.slug}`, priority: 0.6 }));

  return urls;
}
