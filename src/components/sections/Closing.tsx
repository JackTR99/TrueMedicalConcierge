"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function Closing() {
  return (
    <section className="bg-tmc-green text-tmc-ivory py-32 px-8">
      <Reveal>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-tight">
            Let us begin your file.
          </h2>
          <p className="mt-8 text-base md:text-lg text-tmc-ivory/80 max-w-xl mx-auto">
            We are ready for our first conversation in a process guided with care.
          </p>
          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-tmc-gold text-tmc-green-deep border border-tmc-gold text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-300 hover:bg-tmc-gold-light"
            >
              Contact
            </Link>
            <Link
              href="/portal"
              className="inline-flex items-center justify-center px-10 py-4 border border-tmc-ivory/40 text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-300 hover:border-tmc-gold hover:text-tmc-gold"
            >
              Patient Login
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
