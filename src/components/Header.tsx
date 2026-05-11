"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`flex items-center justify-between px-8 md:px-12 sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-tmc-ivory/85 backdrop-blur-md border-b border-tmc-gold/30 py-4 shadow-[0_1px_20px_-10px_rgba(11,57,43,0.15)]"
          : "bg-tmc-ivory/95 backdrop-blur-sm border-b border-tmc-gold/15 py-6"
      }`}
    >
      <Link
        href="/"
        className="text-xs md:text-sm uppercase tracking-[0.3em] text-tmc-green font-medium hover:text-tmc-gold transition-colors"
      >
        True Medical Concierge
      </Link>
      <nav className="hidden md:flex gap-10 text-xs uppercase tracking-[0.25em] text-tmc-ink/70">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="relative group py-1">
            <span className="group-hover:text-tmc-gold transition-colors">
              {l.label}
            </span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-tmc-gold group-hover:w-full transition-all duration-500" />
          </Link>
        ))}
      </nav>
    </header>
  );
}
