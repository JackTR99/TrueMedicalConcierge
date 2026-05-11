import Link from "next/link";
import { services } from "@/lib/services";

export const metadata = {
  title: "Specialties",
  description:
    "Care across Türkiye's leading specialties — dental, plastic, bariatric, orthopedics, and more.",
};

export default function ServicesIndex() {
  return (
    <main className="bg-tmc-ivory">
      <section className="px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-4">
              Specialties
            </div>
            <h1 className="font-serif italic text-tmc-green text-5xl md:text-6xl lg:text-7xl leading-tight">
              Care across Türkiye&apos;s leading specialties.
            </h1>
            <p className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-tmc-ink/75">
              We work with consultants whose volumes, training, and standards have placed them among Türkiye&apos;s most respected practitioners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group block border border-tmc-gold/30 bg-white/30 p-10 transition-all duration-300 hover:-translate-y-1 hover:border-tmc-gold hover:shadow-[0_8px_30px_-12px_rgba(11,57,43,0.15)]"
              >
                <h2 className="font-serif italic text-tmc-green text-2xl md:text-3xl mb-4">
                  {s.title}
                </h2>
                <p className="text-sm md:text-base text-tmc-ink/75 leading-relaxed mb-6">
                  {s.short}
                </p>
                <span className="text-xs uppercase tracking-[0.25em] text-tmc-gold border-b border-tmc-gold/40 pb-1">
                  Read more
                </span>
              </Link>
            ))}
          </div>

          <p className="text-center text-xs uppercase tracking-[0.3em] text-tmc-muted mt-16">
            And more
          </p>
        </div>
      </section>
    </main>
  );
}
