import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6 md:px-12 bg-tmc-ivory/95 border-b border-tmc-gold/15 sticky top-0 z-50 backdrop-blur-sm">
      <Link
        href="/"
        className="text-xs md:text-sm uppercase tracking-[0.3em] text-tmc-green font-medium"
      >
        True Medical Concierge
      </Link>
      <nav className="hidden md:flex gap-10 text-xs uppercase tracking-[0.25em] text-tmc-ink/70">
        <Link href="/services" className="hover:text-tmc-gold transition-colors">
          Services
        </Link>
        <Link href="/process" className="hover:text-tmc-gold transition-colors">
          Process
        </Link>
        <Link href="/about" className="hover:text-tmc-gold transition-colors">
          About
        </Link>
        <Link href="/contact" className="hover:text-tmc-gold transition-colors">
          Contact
        </Link>
      </nav>
    </header>
  );
}
