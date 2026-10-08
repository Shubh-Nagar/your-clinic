"use client";

import { useEffect, useId, useRef } from "react";

// Decorative floating teeth, sparkles and bubbles behind the hero.
// Each item idles with a CSS float; on top of that the pointer adds
//   · depth parallax — items drift with the cursor (deeper = more)
//   · a soft repel   — items near the cursor glide out of its way
// Motion is skipped entirely for prefers-reduced-motion.

type Kind = "tooth" | "sparkle" | "bubble";
type Item = {
  kind: Kind;
  size: number; // px
  pos: { left?: string; right?: string; top?: string; bottom?: string };
  depth: number; // parallax strength
  rotate?: number;
  delay?: string;
  duration?: string;
  show?: string; // responsive visibility classes
};

const items: Item[] = [
  // Teeth
  { kind: "tooth", size: 64, pos: { left: "3%", top: "10%" }, depth: 0.05, rotate: -14, duration: "9s", show: "hidden sm:block" },
  { kind: "tooth", size: 44, pos: { left: "45%", top: "7%" }, depth: 0.08, rotate: 16, delay: "-3s", duration: "8s", show: "hidden lg:block" },
  { kind: "tooth", size: 76, pos: { left: "44%", bottom: "12%" }, depth: 0.06, rotate: -8, delay: "-5s", duration: "11s", show: "hidden lg:block" },
  { kind: "tooth", size: 52, pos: { right: "2%", bottom: "16%" }, depth: 0.09, rotate: 12, delay: "-2s", duration: "10s", show: "hidden xl:block" },
  { kind: "tooth", size: 38, pos: { right: "6%", top: "4%" }, depth: 0.07, rotate: -20, delay: "-6s", duration: "9s" },
  { kind: "tooth", size: 34, pos: { left: "4%", bottom: "8%" }, depth: 0.1, rotate: 22, delay: "-4s", duration: "7.5s", show: "hidden sm:block" },
  // Sparkles
  { kind: "sparkle", size: 22, pos: { left: "38%", top: "18%" }, depth: 0.12, delay: "-1s", show: "hidden lg:block" },
  { kind: "sparkle", size: 16, pos: { left: "14%", top: "4%" }, depth: 0.1, delay: "-2.4s" },
  { kind: "sparkle", size: 18, pos: { right: "4%", top: "40%" }, depth: 0.14, delay: "-0.6s", show: "hidden sm:block" },
  { kind: "sparkle", size: 14, pos: { left: "52%", top: "58%" }, depth: 0.11, delay: "-1.8s", show: "hidden lg:block" },
  { kind: "sparkle", size: 20, pos: { left: "10%", bottom: "22%" }, depth: 0.09, delay: "-3.1s", show: "hidden sm:block" },
  // Bubbles
  { kind: "bubble", size: 26, pos: { left: "30%", top: "5%" }, depth: 0.13, delay: "-2s", duration: "7s", show: "hidden sm:block" },
  { kind: "bubble", size: 34, pos: { left: "1%", top: "46%" }, depth: 0.08, delay: "-4s", duration: "9s", show: "hidden md:block" },
  { kind: "bubble", size: 18, pos: { left: "49%", top: "36%" }, depth: 0.15, delay: "-1s", duration: "6s", show: "hidden lg:block" },
  { kind: "bubble", size: 22, pos: { right: "10%", bottom: "6%" }, depth: 0.12, delay: "-3s", duration: "8s" },
];

const REPEL_RADIUS = 160;
const REPEL_PUSH = 46;

export default function HeroFloaters() {
  const layerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const layer = layerRef.current;
    const section = layer?.parentElement;
    if (!layer || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const n = items.length;
    const cur = Array.from({ length: n }, () => ({ x: 0, y: 0 }));
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;

    const tick = () => {
      raf = 0;
      const w = layer.clientWidth;
      const h = layer.clientHeight;
      let moving = false;

      itemRefs.current.forEach((el, i) => {
        if (!el || el.offsetParent === null) return; // hidden at this breakpoint
        let tx = 0;
        let ty = 0;
        if (pointer) {
          // Parallax: offset from section centre, scaled by depth
          tx = (pointer.x - w / 2) * items[i].depth;
          ty = (pointer.y - h / 2) * items[i].depth;
          // Repel: push away from the cursor when it comes close
          const cx = el.offsetLeft + el.offsetWidth / 2 + tx;
          const cy = el.offsetTop + el.offsetHeight / 2 + ty;
          const dx = cx - pointer.x;
          const dy = cy - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < REPEL_RADIUS && d > 0.01) {
            const f = (1 - d / REPEL_RADIUS) ** 2 * REPEL_PUSH;
            tx += (dx / d) * f;
            ty += (dy / d) * f;
          }
        }
        const c = cur[i];
        c.x += (tx - c.x) * 0.08;
        c.y += (ty - c.y) * 0.08;
        if (Math.abs(tx - c.x) > 0.1 || Math.abs(ty - c.y) > 0.1) moving = true;
        el.style.transform = `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0)`;
      });

      if (moving) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = layer.getBoundingClientRect();
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
      kick();
    };
    const onLeave = () => {
      pointer = null;
      kick();
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={layerRef} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Shared gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={`${uid}-tooth`} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" style={{ stopColor: "rgb(255 255 255)" }} />
            <stop offset="100%" style={{ stopColor: "rgb(var(--brand-tint))" }} />
          </linearGradient>
          <radialGradient id={`${uid}-bubble`} cx="0.35" cy="0.3" r="0.75">
            <stop offset="0%" style={{ stopColor: "rgb(255 255 255)", stopOpacity: 0.95 }} />
            <stop offset="55%" style={{ stopColor: "rgb(var(--brand-tint))", stopOpacity: 0.45 }} />
            <stop offset="100%" style={{ stopColor: "rgb(var(--brand))", stopOpacity: 0.18 }} />
          </radialGradient>
        </defs>
      </svg>

      {/* Morphing colour blobs */}
      <div className="absolute right-[4%] top-[8%] h-[26rem] w-[26rem] animate-morph bg-brand/[0.12] blur-2xl" />
      <div className="absolute -left-20 bottom-[-6rem] h-80 w-80 animate-morph bg-accent/[0.12] blur-2xl [animation-delay:-6s] [animation-direction:reverse]" />
      <div className="absolute left-[38%] top-[30%] hidden h-48 w-48 animate-morph bg-brand-tint blur-xl [animation-delay:-3s] lg:block" />

      {items.map((it, i) => (
        <div
          key={i}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className={`absolute will-change-transform ${it.show ?? ""}`}
          style={{ ...it.pos, width: it.size, height: it.size }}
        >
          {it.kind === "tooth" && (
            <div
              className="h-full w-full animate-drift"
              style={{ animationDelay: it.delay, animationDuration: it.duration, ["--r" as string]: `${it.rotate ?? 0}deg` }}
            >
              <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-[0_10px_14px_rgb(var(--brand-dark)/0.22)]">
                <path
                  d="M20 6c-7 0-12 5-12 13 0 7 3 12 5 18 2 7 2 21 8 21 5 0 4-14 11-14s6 14 11 14c6 0 6-14 8-21 2-6 5-11 5-18 0-8-5-13-12-13-6 0-8 3-12 3S26 6 20 6z"
                  fill={`url(#${uid}-tooth)`}
                  className="stroke-brand/30"
                  strokeWidth="1.5"
                />
                {/* Glossy highlight */}
                <path d="M17 13c-3 1-5 4-5 8" className="stroke-white" strokeWidth="3" strokeLinecap="round" fill="none" />
                <circle cx="44" cy="15" r="2" className="fill-white" />
              </svg>
            </div>
          )}

          {it.kind === "sparkle" && (
            <svg
              viewBox="0 0 24 24"
              className="h-full w-full animate-twinkle fill-accent"
              style={{ animationDelay: it.delay }}
            >
              <path d="M12 0c1 8 4 11 12 12-8 1-11 4-12 12-1-8-4-11-12-12 8-1 11-4 12-12z" />
            </svg>
          )}

          {it.kind === "bubble" && (
            <div
              className="h-full w-full animate-drift"
              style={{ animationDelay: it.delay, animationDuration: it.duration }}
            >
              <svg viewBox="0 0 40 40" className="h-full w-full">
                <circle cx="20" cy="20" r="18" fill={`url(#${uid}-bubble)`} className="stroke-brand/25" strokeWidth="1" />
                <ellipse cx="14" cy="12" rx="4" ry="2.5" className="fill-white" transform="rotate(-30 14 12)" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
