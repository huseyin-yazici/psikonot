"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-line bg-background/90 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-semibold tracking-tight text-ink">
          <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-lg bg-accent text-accent-ink">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M4 12h2M8 8v8M12 5v14M16 9v6M20 12h0" />
            </svg>
          </span>
          {site.name}
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <a
            href="#nasil-calisir"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink sm:inline-flex"
          >
            Nasıl çalışır
          </a>
          <a
            href="#gizlilik"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink sm:inline-flex"
          >
            Gizlilik
          </a>
          <a
            href="#beta"
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-accent-ink transition-[background-color,transform] duration-200 hover:bg-accent-hover active:scale-[0.97]"
          >
            Betaya katıl
          </a>
        </nav>
      </div>
    </header>
  );
}
