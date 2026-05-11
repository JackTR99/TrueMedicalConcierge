"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`flex items-center justify-between px-6 md:px-12 sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-tmc-ivory/85 backdrop-blur-md border-b border-tmc-gold/30 py-4 shadow-[0_1px_20px_-10px_rgba(11,57,43,0.15)]"
            : "bg-tmc-ivory/95 backdrop-blur-sm border-b border-tmc-gold/15 py-5 md:py-6"
        }`}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-tmc-green font-medium hover:text-tmc-gold transition-colors"
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
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden text-tmc-green hover:text-tmc-gold transition-colors p-1 -mr-1"
        >
          {open ? (
            <X size={22} strokeWidth={1.5} />
          ) : (
            <Menu size={22} strokeWidth={1.5} />
          )}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-x-0 top-[57px] bottom-0 z-40 bg-tmc-ivory overflow-y-auto"
          >
            <nav className="flex flex-col px-8 py-12 gap-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block font-serif italic text-tmc-green text-4xl hover:text-tmc-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="pt-10 mt-6 border-t border-tmc-gold/30 flex flex-col gap-4"
              >
                <Link
                  href="/portal/login"
                  onClick={() => setOpen(false)}
                  className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold hover:text-tmc-green-deep transition-colors"
                >
                  Patient login
                </Link>
                <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-muted">
                  İzmir · MMXXVI
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
