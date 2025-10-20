"use client";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-white/60 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav className="flex gap-5 text-sm text-neutral-700">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "text-neutral-900"
                    : "hover:text-neutral-900"
                }
              >
                {item.labelDe}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
