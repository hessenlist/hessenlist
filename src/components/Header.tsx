"use client";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav className="flex gap-5 text-sm text-neutral-600">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "text-black" : "hover:text-black"}
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
