import Link from "next/link";

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center px-8 text-center bg-tmc-ivory">
      <h1 className="font-serif italic text-tmc-green text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight max-w-4xl">
        Healing begins with care.
      </h1>

      <p className="mt-10 max-w-xl text-base md:text-lg text-tmc-ink/80">
        A discreet and complete medical concierge service in Türkiye.
      </p>

      <Link
        href="/contact"
        className="mt-14 inline-flex items-center justify-center px-10 py-4 bg-tmc-green text-tmc-ivory border border-tmc-gold/60 text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-300 hover:bg-tmc-green-deep hover:border-tmc-gold"
      >
        Request a consultation
      </Link>

      <div className="flex justify-center pt-24">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-tmc-gold" />
      </div>
    </section>
  );
}
