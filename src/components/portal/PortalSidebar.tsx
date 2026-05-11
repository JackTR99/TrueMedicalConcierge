"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/portal/login");
    router.refresh();
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-tmc-green text-tmc-ivory border-r border-tmc-gold/20 shrink-0">
      <div className="px-8 py-8 border-b border-tmc-gold/20">
        <Link
          href="/"
          className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold hover:text-tmc-gold-light transition-colors"
        >
          True Medical Concierge
        </Link>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1">
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
    </aside>
  );
}
