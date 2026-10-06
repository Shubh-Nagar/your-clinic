"use client";
import { useEffect, useRef } from "react";

const REVEAL =
  ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-pop, .reveal-img";

// Site-wide scroll effects:
//  · adds .in-view to reveal elements as they enter the viewport
//  · [data-stagger="80"] on a parent cascades its reveal children 80ms apart
//  · [data-parallax="0.15"] elements drift with scroll (positive = slower than page)
//  · drives the reading-progress bar at the top of the page
export default function ScrollObserver() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger: children of a [data-stagger] parent that enter the viewport in
    // the same batch are delayed one after another (so each new row of a grid
    // cascades on its own instead of waiting for earlier rows' delays).
    const io = new IntersectionObserver(
      (entries) => {
        const counts = new Map<Element, number>();
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const parent = el.parentElement;
          if (parent?.dataset.stagger && !el.style.animationDelay) {
            const k = counts.get(parent) ?? 0;
            counts.set(parent, k + 1);
            const step = Number(parent.dataset.stagger) || 90;
            const base = parent.dataset.staggerDone ? 0 : Number(parent.dataset.staggerBase) || 0;
            el.style.animationDelay = `${base + k * step}ms`;
          }
          el.classList.add("in-view");
          io.unobserve(el);
        });
        counts.forEach((_, p) => ((p as HTMLElement).dataset.staggerDone = "1"));
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    const observeAll = (root: ParentNode) => {
      root.querySelectorAll(REVEAL).forEach((el) => {
        if (!el.classList.contains("in-view")) io.observe(el);
      });
    };
    observeAll(document);

    // Pick up elements rendered later (popups, client-only sections)
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches(REVEAL)) io.observe(n);
            observeAll(n);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Parallax + progress bar, batched into one frame per scroll
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      barRef.current?.style.setProperty("--progress", String(max > 0 ? window.scrollY / max : 0));
      if (reduce) return;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = Number(el.dataset.parallax) || 0.15;
        // getBoundingClientRect includes the current shift — remove it so it doesn't compound
        const current = Number(el.dataset.py) || 0;
        const offset = (r.top - current + r.height / 2 - vh / 2) * speed;
        el.dataset.py = offset.toFixed(1);
        el.style.setProperty("--py", `${el.dataset.py}px`);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
      <div ref={barRef} className="scroll-progress h-full bg-gradient-to-r from-brand to-accent" />
    </div>
  );
}
