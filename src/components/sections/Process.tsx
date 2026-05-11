"use client";

import { motion, type Variants } from "motion/react";
import { Reveal } from "@/components/Reveal";

const steps = [
  {
    numeral: "I",
    title: "Initial Consultation",
    body: "We listen in a quiet conversation; we understand your priorities and expectations.",
  },
  {
    numeral: "II",
    title: "Medical Evaluation",
    body: "Your file is shared with relevant physicians; an independent assessment and plan are prepared.",
  },
  {
    numeral: "III",
    title: "Plan & Approval",
    body: "Timeline and details are clarified; no step is taken without your approval.",
  },
  {
    numeral: "IV",
    title: "Travel & Treatment",
    body: "Flights, accommodation, transfers, and every stage of treatment are handled from a single point.",
  },
];

const stepContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.1 },
  },
};

const step: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Process() {
  return (
    <section className="bg-tmc-parchment py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14 md:mb-20">
            <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-4">
              Process
            </div>
            <h2 className="font-serif italic text-tmc-green text-3xl md:text-5xl leading-tight">
              Four steps, end to end.
            </h2>
          </div>
        </Reveal>

        <motion.div
          variants={stepContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12"
        >
          {steps.map((s) => (
            <motion.div
              key={s.numeral}
              variants={step}
              className="text-center md:text-left"
            >
              <div className="font-serif italic text-tmc-gold text-5xl md:text-6xl mb-4 md:mb-6">
                {s.numeral}
              </div>
              <h3 className="font-serif italic text-tmc-green text-xl md:text-2xl mb-3 md:mb-4">
                {s.title}
              </h3>
              <p className="text-sm text-tmc-ink/75 leading-relaxed">
                {s.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
