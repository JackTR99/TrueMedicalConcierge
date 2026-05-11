"use client";

import { motion, type Variants } from "motion/react";
import { Smile, Sparkles, Scale, Bone, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { services, type ServiceIcon } from "@/lib/services";

const iconMap: Record<ServiceIcon, LucideIcon> = {
  smile: Smile,
  sparkles: Sparkles,
  scale: Scale,
  bone: Bone,
};

const cardContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.22, delayChildren: 0.1 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Services() {
  return (
    <section className="bg-tmc-ivory py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-20">
            <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-4">
              Specialties
            </div>
            <h2 className="font-serif italic text-tmc-green text-4xl md:text-5xl leading-tight">
              Care across Türkiye&apos;s leading specialties.
            </h2>
          </div>
        </Reveal>

        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <motion.a
                key={s.slug}
                variants={card}
                href={`/services/${s.slug}`}
                className="group block border border-tmc-gold/30 bg-white/30 p-10 transition-all duration-300 hover:-translate-y-2 hover:border-tmc-gold hover:shadow-[0_12px_40px_-12px_rgba(11,57,43,0.25)]"
              >
                <Icon
                  className="text-tmc-gold mb-6 group-hover:text-tmc-green-deep transition-colors"
                  size={36}
                  strokeWidth={1.25}
                />

                <h3 className="font-serif italic text-tmc-green text-2xl md:text-3xl mb-4">
                  {s.title}
                </h3>
                <p className="text-sm md:text-base text-tmc-ink/75 leading-relaxed">
                  {s.short}
                </p>

                {/* Hover-only scope teaser */}
                <div className="overflow-hidden max-h-0 group-hover:max-h-48 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <ul className="text-xs text-tmc-ink/65 space-y-2 mt-5 pt-5 border-t border-tmc-gold/15">
                    {s.scope.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-tmc-gold shrink-0">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <span className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold border-b border-tmc-gold/40 pb-1 mt-6 inline-block">
                  Details
                </span>
              </motion.a>
            );
          })}
        </motion.div>

        <Reveal delay={0.2}>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-tmc-muted mt-16">
            And more
          </p>
        </Reveal>
      </div>
    </section>
  );
}
