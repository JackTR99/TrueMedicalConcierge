"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center px-8 text-center bg-tmc-ivory">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        <motion.h1
          variants={item}
          className="font-serif italic text-tmc-green text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight max-w-4xl"
        >
          Healing begins with care.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-10 max-w-xl text-base md:text-lg text-tmc-ink/80"
        >
          A discreet and complete medical concierge service in Türkiye.
        </motion.p>

        <motion.div variants={item}>
          <Link
            href="/contact"
            className="mt-14 inline-flex items-center justify-center px-10 py-4 bg-tmc-green text-tmc-ivory border border-tmc-gold/60 text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-300 hover:bg-tmc-green-deep hover:border-tmc-gold"
          >
            Request a consultation
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="flex justify-center pt-24"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-tmc-gold" />
      </motion.div>
    </section>
  );
}
