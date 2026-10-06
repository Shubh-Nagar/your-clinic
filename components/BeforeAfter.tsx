"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronsLeftRight, ImagePlus, Sparkles } from "lucide-react";
import { clinic } from "@/data/clinic";
import SmartImage from "./SmartImage";

type Case = (typeof clinic.beforeAfter.cases)[number];

const tag = "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white";

// Drag (or arrow-key) slider. Sweeps once on its own when scrolled into view
// so visitors can see it's interactive.
function Slider({ before, after, label }: { before: string; after: string; label: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const touched = useRef(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          if (touched.current) return;
          const p = Math.min((now - start) / 1800, 1);
          // 50 → 85 → 15 → 50
          setPos(50 + 35 * Math.sin(p * Math.PI * 2) * (1 - p * 0.3));
          if (p < 1) raf = requestAnimationFrame(tick);
          else setPos(50);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const moveTo = (clientX: number) => {
    const r = boxRef.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={boxRef}
      className="relative aspect-[4/3] cursor-ew-resize touch-pan-y select-none overflow-hidden"
      onPointerDown={(e) => {
        touched.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => e.buttons === 1 && moveTo(e.clientX)}
    >
      <SmartImage src={after} alt={`${label} — after`} label="After" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <SmartImage src={before} alt={`${label} — before`} label="Before" className="h-full w-full object-cover" />
      </div>
      <span className={`absolute left-3 top-3 bg-ink/70 ${tag}`}>Before</span>
      <span className={`absolute right-3 top-3 bg-brand ${tag}`}>After</span>

      {/* Handle */}
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]" style={{ left: `${pos}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Compare ${label} before and after`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
              e.preventDefault();
              touched.current = true;
              setPos((p) => Math.min(100, Math.max(0, p + (e.key === "ArrowLeft" ? -5 : 5))));
            }
          }}
          className="pointer-events-auto absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand shadow-card outline-none ring-brand/40 transition focus-visible:ring-4"
        >
          <ChevronsLeftRight className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function Combined({ src, label }: { src: string; label: string }) {
  return (
    <div className="group relative aspect-[4/3] overflow-hidden">
      <SmartImage src={src} alt={`${label} — before and after`} label={label} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <span className={`absolute left-3 top-3 bg-ink/70 ${tag}`}>Before</span>
      <span className={`absolute right-3 top-3 bg-brand ${tag}`}>After</span>
    </div>
  );
}

// Shown until the clinic adds real photos for this case.
function ComingSoon({ label }: { label: string }) {
  return (
    <div className="relative grid aspect-[4/3] grid-cols-2 bg-brand-tint/60">
      {["Before", "After"].map((side, i) => (
        <div key={side} className={`flex justify-center pt-4 ${i ? "bg-brand-tint" : ""}`}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-dark/50">{side}</span>
        </div>
      ))}
      <div className="absolute inset-y-0 left-1/2 w-px bg-brand/20" />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand shadow-card">
          <ImagePlus className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-brand-dark shadow-sm">
          {label} case coming soon
        </span>
      </div>
    </div>
  );
}

function CaseCard({ c }: { c: Case }) {
  return (
    <div className="reveal-scale overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-card">
      <div className="relative">
        {c.before && c.after ? (
          <Slider before={c.before} after={c.after} label={c.label} />
        ) : c.combined ? (
          <Combined src={c.combined} label={c.label} />
        ) : (
          <ComingSoon label={c.label} />
        )}
        {c.sample && (
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink/70 shadow-sm">
            Sample
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div>
          <p className="font-display text-lg font-medium text-ink">{c.label}</p>
          <p className="text-xs text-ink/55">{c.treatment}</p>
        </div>
        <Sparkles className="h-5 w-5 shrink-0 text-accent" />
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const ba = clinic.beforeAfter;
  const hasPhotos = ba.cases.some((c) => (c.before && c.after) || c.combined);
  const samples = ba.cases.filter((c) => c.sample && ((c.before && c.after) || c.combined));

  return (
    <section id="results" className="py-20">
      <div className="container-x">
        <div className="max-w-2xl" data-stagger="110">
          <span className="eyebrow reveal">
            <span className="h-px w-6 bg-brand" /> {ba.eyebrow}
          </span>
          <h2 className="section-title reveal-blur mt-4">{ba.title}</h2>
          <p className="reveal mt-3 text-ink/65">
            {samples.length ? ba.sampleSub : hasPhotos ? ba.sub : "Before & after photos of our own patients are on their way — ask us to see real cases at your consultation."}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-stagger="120">
          {ba.cases.map((c) => (
            <CaseCard key={c.label} c={c} />
          ))}
        </div>

        {samples.length > 0 ? (
          <p className="reveal mt-6 text-center text-xs leading-relaxed text-ink/45">
            Sample images for illustration, not Dental Designs patients. Photos:{" "}
            {samples.map((c) => c.credit).join(" · ")}.
          </p>
        ) : (
          hasPhotos && (
            <p className="reveal mt-6 text-center text-xs text-ink/45">
              Photos shared with patients&apos; consent. Individual results vary.
            </p>
          )
        )}
      </div>
    </section>
  );
}
