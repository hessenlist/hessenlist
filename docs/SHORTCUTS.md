# HessenList · Shortcuts

## Dev & Build
- Dev: `pnpm dev`
- Build: `pnpm build`
- Codemap regen: `pnpm codemap`

## Ключові файли
- Layout: `src/app/layout.tsx` (ClientRouteKey, viewport-ok)
- Home: `src/app/page.tsx` (Top-3)
- Companies: `src/app/companies/page.tsx` + `ClientResetBoundary`
- Company page: `src/app/company/[slug]/page.tsx` (+ generateMetadata)
- Search (client): `src/components/CompaniesClient.tsx`
- Activity badge: `src/components/ActivityBadge.tsx`
- Supabase client: `src/lib/supabaseClient.ts`

## ENV
- `.env.local`:  
  - `NEXT_PUBLIC_SUPABASE_URL`  
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
