"use client";

import { useEffect, useRef, useState } from "react";
import { clinic } from "@/data/clinic";

function useCountUp(target: number, run: boolean, decimals = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("en-IN");
}

function Stat({ value, suffix, label, decimals, run, delay }: any) {
  const shown = useCountUp(value, run, decimals ?? 0);
  return (
    <div
      className="reveal-scale text-center"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="font-display text-3xl font-semibold text-brand sm:text-4xl">
        {shown}
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-1 text-sm text-ink/65">{label}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setRun(true),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-brand-tint/50 py-14">
      <div ref={ref} className="container-x grid grid-cols-2 gap-8 sm:grid-cols-4">
        {clinic.stats.map((s, i) => (
          <Stat key={s.label} {...s} run={run} delay={i * 100} />
        ))}
      </div>
    </section>
  );
}
