"use client";

import { motion, type Variants } from "motion/react";
import { Reveal } from "@/components/Reveal";

const consultants = [
  {
    initials: "MY",
    title: "Prof. Dr.",
    name: "Mehmet Yıldız",
    specialty: "Plastic & Aesthetic Surgery",
    clinic: "Aegean Plastic Surgery Institute",
    langs: ["EN", "TR", "FR"],
  },
  {
    initials: "AK",
    title: "Op. Dr.",
    name: "Ayşe Kaya",
    specialty: "Bariatric Surgery",
    clinic: "İzmir Metabolic Centre",
    langs: ["EN", "TR"],
  },
  {
    initials: "EÖ",
    title: "Prof. Dr.",
    name: "Ekrem Özdemir",
    specialty: "Orthopedics",
    clinic: "Anatolia Joint Centre",
    langs: ["EN", "TR", "DE"],
  },
  {
    initials: "SD",
    title: "Dr.",
    name: "Selin Demir",
    specialty: "Dental & Oral Health",
    clinic: "Aegean Plastic Surgery Institute",
    langs: ["EN", "TR", "FR"],
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const cardV: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Network() {
  return (
    <section className="bg-tmc-ivory py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-20">
            <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-4">
              Our network
            </div>
            <h2 className="font-serif italic text-tmc-green text-4xl md:text-5xl leading-tight">
              Türkiye&apos;s leading consultants.
            </h2>
          </div>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {consultants.map((c) => (
            <motion.div
              key={c.name}
              variants={cardV}
              className="flex gap-6 border border-tmc-gold/25 bg-white/30 p-8 transition-all duration-300 hover:border-tmc-gold hover:shadow-[0_8px_30px_-12px_rgba(11,57,43,0.18)]"
            >
              <div className="shrink-0 w-20 h-20 rounded-full border border-tmc-gold/40 flex items-center justify-center font-serif italic text-tmc-gold text-2xl">
                {c.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-muted mb-1">
                  {c.title}
                </p>
                <h3 className="font-serif italic text-tmc-green text-xl md:text-2xl mb-2">
                  {c.name}
                </h3>
                <p className="text-sm text-tmc-ink/80 leading-relaxed">
                  {c.specialty}
                </p>
                <p className="text-xs text-tmc-muted mt-1">{c.clinic}</p>
                <div className="mt-4 flex gap-2">
                  {c.langs.map((l) => (
                    <span
                      key={l}
                      className="text-[10px] uppercase tracking-[0.25em] text-tmc-gold border border-tmc-gold/40 px-2 py-0.5"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.2}>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-tmc-muted mt-16">
            And many more
          </p>
        </Reveal>
      </div>
    </section>
  );
}
