"use client";

import { motion, type Variants } from "motion/react";
import { Reveal } from "@/components/Reveal";

const services = [
  {
    slug: "dental",
    title: "Dental & Oral Health",
    body: "Implants, smile design, and oral surgery.",
  },
  {
    slug: "plastic",
    title: "Plastic & Aesthetic Surgery",
    body: "Facial, body, and restorative aesthetic procedures.",
  },
  {
    slug: "bariatric",
    title: "Bariatric Surgery",
    body: "Sleeve gastrectomy, bypass, and metabolic surgery.",
  },
  {
    slug: "orthopedics",
    title: "Orthopedics",
    body: "Joint, spine, and sports injury surgery.",
  },
];

const cardContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((s) => (
            <motion.a
              key={s.slug}
              variants={card}
              href={`/services/${s.slug}`}
              className="group block border border-tmc-gold/30 bg-white/30 p-10 transition-all duration-300 hover:-translate-y-1 hover:border-tmc-gold hover:shadow-[0_8px_30px_-12px_rgba(11,57,43,0.15)]"
            >
              <h3 className="font-serif italic text-tmc-green text-2xl md:text-3xl mb-4">
                {s.title}
              </h3>
              <p className="text-sm md:text-base text-tmc-ink/75 leading-relaxed mb-6">
                {s.body}
              </p>
              <span className="text-xs uppercase tracking-[0.25em] text-tmc-gold border-b border-tmc-gold/40 pb-1">
                Details
              </span>
            </motion.a>
          ))}
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
