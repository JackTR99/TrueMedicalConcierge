"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const links = [
  { href: "/portal/dashboard", label: "Dashboard" },
  { href: "/portal/medical-file", label: "Medical file" },
  { href: "/portal/travel", label: "Travel" },
  { href: "/portal/documents", label: "Documents" },
  { href: "/portal/messages", label: "Messages" },
  { href: "/portal/profile", label: "Profile" },
];

export function PortalSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/portal/login");
    router.refresh();
  }

  const NavContent = () => (
    <>
      <div className="px-8 py-8 border-b border-tmc-gold/20">
        <Link
          href="/"
          className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold hover:text-tmc-gold-light transition-colors"
        >
          True Medical Concierge
        </Link>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
        {links.map((l) => {
          const active = pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`block px-4 py-3 text-xs uppercase tracking-[0.25em] transition-colors ${
                active
                  ? "bg-tmc-green-deep text-tmc-gold border-l-2 border-tmc-gold"
                  : "text-tmc-ivory/75 hover:text-tmc-gold hover:bg-tmc-green-deep/50 border-l-2 border-transparent"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-8 py-8 border-t border-tmc-gold/20">
        <button
          onClick={handleSignOut}
          className="text-[10px] uppercase tracking-[0.3em] text-tmc-ivory/60 hover:text-tmc-gold transition-colors"
        >
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-tmc-green text-tmc-ivory border-r border-tmc-gold/20 shrink-0">
        <NavContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-tmc-green text-tmc-ivory border-b border-tmc-gold/20 sticky top-0 z-40">
        <Link
          href="/"
          className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold"
        >
          True Medical Concierge
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="text-tmc-ivory p-1 -mr-1"
        >
          {open ? (
            <X size={22} strokeWidth={1.5} />
          ) : (
            <Menu size={22} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile drawer + backdrop */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/50"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-tmc-green text-tmc-ivory flex flex-col"
            >
              <div className="flex justify-end px-4 py-3">
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="text-tmc-ivory p-1"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
