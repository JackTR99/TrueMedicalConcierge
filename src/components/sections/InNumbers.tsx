"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";

const stats: { value: number; suffix?: string; label: string }[] = [
  { value: 6, label: "Specialties" },
  { value: 20, suffix: "+", label: "Consultants" },
  { value: 50, suffix: "+", label: "Hospital partners" },
  { value: 4, label: "Languages" },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, to]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function InNumbers() {
  return (
    <section className="bg-tmc-green text-tmc-ivory py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-20">
            <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-4">
              By the numbers
            </div>
            <h2 className="font-serif italic text-4xl md:text-5xl leading-tight">
              Discreet, but considerable.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif italic text-tmc-gold text-5xl md:text-6xl mb-4">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-ivory/75">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
