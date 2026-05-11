"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "@/components/Reveal";

export function Manifesto() {
  return (
    <section className="bg-tmc-green text-tmc-ivory py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl leading-tight">
              Your physician is chosen for you. Your records remain private. The journey, only yours.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -28, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/logo.png"
                alt="True Medical Concierge"
                width={500}
                height={500}
                className="w-72 h-72 md:w-80 md:h-80 object-contain"
              />
            </motion.div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-tmc-gold/30 pt-16">
            <ValuePillar
              label="Discretion"
              body="Your records and every stage of your journey belong solely to you."
            />
            <ValuePillar
              label="Precision"
              body="Every detail is measured and verified with care."
            />
            <ValuePillar
              label="Trust"
              body="We arrive when we say we will, where we say we will."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ValuePillar({ label, body }: { label: string; body: string }) {
  return (
    <div className="text-center">
      <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-4">
        {label}
      </div>
      <p className="text-sm md:text-base text-tmc-ivory/80 leading-relaxed">
        {body}
      </p>
    </div>
  );
}
