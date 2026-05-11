"use client";

import { motion, type Variants } from "motion/react";
import { type ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
