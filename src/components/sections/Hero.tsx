"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.35, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Video moves slower than scroll for parallax
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Content fades slightly out as you scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[calc(100vh-72px)] flex flex-col items-center justify-center px-8 text-center overflow-hidden"
    >
      {/* Video background with parallax */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 -top-[10%] -bottom-[10%] z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Ivory veil so the typography stays readable */}
      <div className="absolute inset-0 bg-tmc-ivory/65 z-10" />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-20 flex flex-col items-center"
      >
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-12 z-20 flex justify-center"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-tmc-gold" />
      </motion.div>
    </section>
  );
}
