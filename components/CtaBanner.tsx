import { CalendarCheck, Phone } from "lucide-react";
import { clinic } from "@/data/clinic";
import SmartImage from "./SmartImage";

export default function CtaBanner() {
  const { ctaBanner: cta } = clinic;
  return (
    // Split background: white on top, tint below — the card straddles the seam
    <section className="bg-[linear-gradient(to_bottom,transparent_55%,rgb(var(--brand-tint)/0.4)_55%)] pb-4 pt-12 lg:pt-40">
      <div className="container-x">
        <div className="reveal-scale relative rounded-3xl bg-brand shadow-soft">
          {/* Decorative shapes, clipped to the card */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
            <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-white/10 sm:h-[26rem] sm:w-[26rem]" data-parallax="0.12" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/[0.07]" data-parallax="-0.15" />
            <svg
              viewBox="0 0 64 64"
              className="absolute bottom-6 right-6 h-24 w-24 animate-float text-white/20 sm:h-32 sm:w-32 lg:right-10"
            >
              <path
                fill="currentColor"
                d="M20 6c-7 0-12 5-12 13 0 7 3 12 5 18 2 7 2 21 8 21 5 0 4-14 11-14s6 14 11 14c6 0 6-14 8-21 2-6 5-11 5-18 0-8-5-13-12-13-6 0-8 3-12 3S26 6 20 6z"
              />
            </svg>
          </div>

          <div className="relative grid items-end gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Cut-out doctor photo — sits on the card's bottom edge and rises above it */}
            <div className="relative order-last flex justify-center px-6 lg:order-first lg:-mt-36 lg:px-4">
              <div className="absolute bottom-0 left-1/2 aspect-square w-72 -translate-x-1/2 rounded-t-full bg-white/10 sm:w-80 lg:w-[26rem]" aria-hidden="true" />
              <SmartImage
                src={cta.image}
                alt={cta.imageAlt}
                label="Doctor photo"
                className="reveal relative w-80 drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] [animation-delay:250ms] sm:w-96 lg:w-[27rem]"
              />
            </div>

            <div className="px-6 pt-10 text-center text-white sm:px-10 lg:py-14 lg:pr-40 lg:text-left" data-stagger="120" data-stagger-base="300">
              <h2 className="reveal-blur font-display text-3xl font-medium leading-tight sm:text-4xl">{cta.title}</h2>
              <p className="reveal mt-4 text-base leading-relaxed text-white/85 sm:text-lg">{cta.sub}</p>
              <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <a
                  href="#contact"
                  className="btn-beat inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-dark shadow-card transition [--beat-color:255_255_255] hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <CalendarCheck className="h-4 w-4" /> Book an Appointment
                </a>
                <a
                  href={`tel:${clinic.phone}`}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" /> {clinic.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
