import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-tmc-ivory min-h-[70vh] flex items-center justify-center px-8 py-24">
      <div className="text-center max-w-xl">
        <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-6">
          404
        </div>
        <h1 className="font-serif italic text-tmc-green text-4xl md:text-5xl mb-8 leading-tight">
          The page you sought is no longer at this address.
        </h1>
        <p className="text-base text-tmc-ink/75 leading-relaxed mb-10">
          Should you wish to speak with us about something specific, a concierge will be pleased to assist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-10 py-4 bg-tmc-green text-tmc-ivory border border-tmc-gold/60 text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-300 hover:bg-tmc-green-deep hover:border-tmc-gold"
          >
            Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 border border-tmc-ink/20 text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-300 hover:border-tmc-gold hover:text-tmc-gold"
          >
            Contact a concierge
          </Link>
        </div>
      </div>
    </main>
  );
}
