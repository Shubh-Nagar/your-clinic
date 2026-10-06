"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clinic } from "@/data/clinic";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "./SmartImage";

const COPIES = 4; // the list is repeated so the row can loop seamlessly
const INTRO_MS = 2600; // fast-then-slow spin when the section comes into view
const STEP_MS = 700; // one-card slide
const AUTOPLAY_MS = 3500; // pause between slides

export default function Testimonials() {
  const items = clinic.testimonials;
  const n = items.length;
  const loop = Array.from({ length: COPIES }, () => items).flat();

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0); // px per card (card width + gap)
  const [index, setIndex] = useState(0);
  const [duration, setDuration] = useState(0); // transition ms for the current move
  const [started, setStarted] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [paused, setPaused] = useState(false);

  // Measure one card + gap; re-measure on resize.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const second = track.children[1] as HTMLElement | undefined;
      if (first && second) setStep(second.offsetLeft - first.offsetLeft);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  // Intro: when the section scrolls into view, spin two full laps with an
  // ease-out curve (fast at first, slowing to a stop on the first review).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setDuration(reduce ? 0 : INTRO_MS);
        setIndex(2 * n);
        setStarted(true);
        setTimeout(() => setIntroDone(true), reduce ? 0 : INTRO_MS);
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [n]);

  const go = useCallback((delta: number) => {
    setDuration(STEP_MS);
    setIndex((i) => i + delta);
  }, []);

  // Autoplay one card at a time after the intro; pauses on hover/focus.
  useEffect(() => {
    if (!introDone || paused) return;
    const t = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [introDone, paused, go]);

  // Keep the index inside the middle copies so the loop never runs out:
  // after a slide ends, jump by one full lap with no transition (invisible).
  // Timer-based (not transitionend, which doesn't fire reliably in background tabs).
  useEffect(() => {
    if (!started || (index >= n && index < 3 * n)) return;
    const t = setTimeout(() => {
      setDuration(0);
      setIndex((i) => (i >= 3 * n ? i - n : i < n ? i + n : i));
    }, duration + 50);
    return () => clearTimeout(t);
  }, [index, duration, n, started]);

  const active = ((index % n) + n) % n;

  return (
    <section ref={sectionRef} id="reviews" className="overflow-hidden py-20">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl" data-stagger="110">
            <span className="eyebrow reveal">
              <span className="h-px w-6 bg-brand" /> Happy patients
            </span>
            <h2 className="section-title reveal-blur mt-4">What our patients say</h2>
          </div>

          <div className="reveal flex gap-2 [animation-delay:200ms]">
            <button
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="grid h-11 w-11 place-items-center rounded-full border border-brand/20 bg-white text-brand transition hover:-translate-x-0.5 hover:bg-brand hover:text-white active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next review"
              className="grid h-11 w-11 place-items-center rounded-full border border-brand/20 bg-white text-brand transition hover:translate-x-0.5 hover:bg-brand hover:text-white active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Single-row track; the section clips it so cards slide in from the page edge */}
        <div
          className={`mt-12 transition-opacity duration-500 ${started ? "opacity-100" : "opacity-0"}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex gap-6"
            style={{
              transform: `translate3d(${-index * step}px, 0, 0)`,
              transition: duration
                ? `transform ${duration}ms ${
                    duration === INTRO_MS ? "cubic-bezier(0.12, 0.8, 0.2, 1)" : "cubic-bezier(0.65, 0, 0.35, 1)"
                  }`
                : "none",
            }}
          >
            {loop.map((t, i) => (
              <figure
                key={i}
                aria-hidden={i < index || i >= index + n ? true : undefined}
                className="group flex w-[85%] shrink-0 flex-col rounded-2xl border border-brand/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-card sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <Quote className="h-7 w-7 text-brand/25 transition duration-500 group-hover:rotate-12 group-hover:text-brand/50" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">{t.text}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  {t.photo ? (
                    <SmartImage
                      src={t.photo}
                      alt={t.name}
                      label={t.name.charAt(0)}
                      className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-brand-tint"
                    />
                  ) : (
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-base font-semibold text-white ring-2 ring-brand-tint">
                      {t.name.charAt(0)}
                    </span>
                  )}
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold text-ink">{t.name}</span>
                    <span className="text-xs text-ink/50">Google review</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {items.map((t, i) => (
            <button
              key={t.name}
              onClick={() => {
                setDuration(STEP_MS);
                setIndex(index - active + i);
              }}
              aria-label={`Show review ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i ? "w-7 bg-brand" : "w-2 bg-brand/25 hover:bg-brand/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
