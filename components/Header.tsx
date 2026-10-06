"use client";

import { useEffect, useState } from "react";
import { Phone, Menu, X, Clock } from "lucide-react";
import { clinic } from "@/data/clinic";

const nav = [
  { label: "Services", href: "#services" },
  { label: "About",    href: "#about" },
  { label: "Doctors",  href: "#doctors" },
  { label: clinic.galleryIntro.navLabel, href: "#gallery" },
  { label: "Results",  href: "#results" },
  { label: "Reviews",  href: "#reviews" },
  { label: "Contact",  href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      // Highlight the nav item for the section currently under the header
      let current = "";
      for (const n of nav) {
        const el = document.querySelector(n.href);
        if (el && el.getBoundingClientRect().top <= 140) current = n.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden bg-brand-dark text-white/90 md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <span className="inline-flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            {clinic.hours[0].days}: {clinic.hours[0].time}
          </span>
          <a href={`tel:${clinic.phone}`} className="inline-flex items-center gap-2 font-medium transition hover:text-white">
            <Phone className="h-3.5 w-3.5" />
            {clinic.phoneDisplay}
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-paper/95 shadow-sm backdrop-blur" : "bg-paper/70 backdrop-blur-sm"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={clinic.logo} alt={clinic.name} className="h-9 w-auto" />
            <span className="font-display text-lg font-semibold leading-none text-ink">
              {clinic.shortName}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`group relative py-1 text-sm font-medium transition hover:text-brand ${
                  active === n.href ? "text-brand" : "text-ink/70"
                }`}
              >
                {n.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300 ${
                    active === n.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="flex items-center gap-2">
            <a href={`tel:${clinic.phone}`} className="btn-ghost hidden sm:inline-flex !px-4 !py-2.5 text-xs">
              <Phone className="h-3.5 w-3.5" /> Call
            </a>
            <a href="#contact" className="btn-primary btn-beat !px-4 !py-2.5 text-xs sm:!px-5 sm:text-sm">
              Book Appointment
            </a>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-brand/20 text-brand transition hover:bg-brand-tint lg:hidden"
            >
              <span className={`absolute transition-all duration-200 ${open ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}>
                <X className="h-5 w-5" />
              </span>
              <span className={`absolute transition-all duration-200 ${open ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}>
                <Menu className="h-5 w-5" />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile nav — smooth slide open/close via CSS grid trick */}
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <nav className="overflow-hidden border-t border-brand/10 bg-paper/95 backdrop-blur">
            <div className="container-x flex flex-col py-2">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 text-sm font-medium text-ink/80 transition hover:text-brand active:text-brand"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={`tel:${clinic.phone}`}
                className="mb-2 mt-1 flex items-center gap-2 py-3 text-sm font-semibold text-brand"
              >
                <Phone className="h-4 w-4" /> {clinic.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
