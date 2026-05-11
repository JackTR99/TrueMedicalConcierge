import Link from "next/link";
import { notFound } from "next/navigation";
import { Smile, Sparkles, Scale, Bone, type LucideIcon } from "lucide-react";
import { services, getServiceBySlug, type ServiceIcon } from "@/lib/services";

const iconMap: Record<ServiceIcon, LucideIcon> = {
  smile: Smile,
  sparkles: Sparkles,
  scale: Scale,
  bone: Bone,
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.short,
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon];
  const numerals = ["I", "II", "III", "IV"];

  return (
    <main className="bg-tmc-ivory">
      <section className="px-8 pt-20 md:pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-6">
            Specialty
          </div>
          <Icon className="text-tmc-gold mb-8" size={64} strokeWidth={1} />
          <h1 className="font-serif italic text-tmc-green text-5xl md:text-6xl lg:text-7xl leading-tight">
            {service.title}
          </h1>
          <p className="mt-10 text-lg md:text-xl text-tmc-ink/80 leading-relaxed max-w-3xl">
            {service.overview}
          </p>
        </div>
      </section>

      <section className="px-8 py-20 bg-tmc-parchment">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif italic text-tmc-green text-3xl md:text-4xl mb-10">
            Scope of practice
          </h2>
          <ul className="space-y-4">
            {service.scope.map((item, i) => (
              <li key={i} className="flex gap-6 border-b border-tmc-gold/20 pb-4">
                <span className="font-serif italic text-tmc-gold text-xl shrink-0 w-10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base md:text-lg text-tmc-ink/85">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif italic text-tmc-green text-3xl md:text-4xl mb-12 text-center">
            How the process unfolds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {service.process.map((step, i) => (
              <div key={i}>
                <div className="font-serif italic text-tmc-gold text-4xl md:text-5xl mb-4">
                  {numerals[i]}
                </div>
                <h3 className="font-serif italic text-tmc-green text-xl mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-tmc-ink/75 leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20 bg-tmc-parchment">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif italic text-tmc-green text-3xl md:text-4xl mb-12 text-center">
            Frequently asked
          </h2>
          <div className="space-y-8">
            {service.faqs.map((f, i) => (
              <div key={i} className="border-b border-tmc-gold/25 pb-8">
                <h3 className="font-serif italic text-tmc-green text-xl md:text-2xl mb-3">
                  {f.q}
                </h3>
                <p className="text-base text-tmc-ink/80 leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-tmc-green text-tmc-ivory py-24 px-8 text-center">
        <h2 className="font-serif italic text-3xl md:text-4xl mb-8">
          Let us prepare your case.
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-10 py-4 bg-tmc-gold text-tmc-green-deep border border-tmc-gold text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-300 hover:bg-tmc-gold-light"
        >
          Contact
        </Link>
      </section>
    </main>
  );
}
