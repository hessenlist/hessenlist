// src/app/ClientRouteKey.tsx
"use client";

import { usePathname } from "next/navigation";

export default function ClientRouteKey({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // будь-яка зміна маршруту → новий key → повний remount усього вмісту
  return <div key={pathname}>{children}</div>;
}
