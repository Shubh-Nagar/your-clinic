import { Phone, Stethoscope, ShieldCheck, CalendarCheck } from "lucide-react";
import { clinic } from "@/data/clinic";
import SmartImage from "./SmartImage";
import HeroFloaters from "./HeroFloaters";

export default function Hero() {
  const { hero } = clinic;
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient colour wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 -top-24 h-80 w-80 rounded-full bg-brand-tint blur-3xl" data-parallax="-0.3" />
        <div className="absolute -left-24 top-40 h-72 w-72 rounded-full bg-accent/10 blur-3xl" data-parallax="0.25" />
      </div>

      {/* Floating teeth, sparkles & bubbles — react to the cursor */}
      <HeroFloaters />

      <div className="container-x grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">

        {/* Left — each element fades up with a stagger */}
        <div>
          <span className="eyebrow animate-fade-up [animation-delay:0ms]">
            <span className="h-px w-6 bg-brand" /> {hero.eyebrow}
          </span>
          <h1 className="mt-5 animate-fade-up font-display text-4xl font-medium leading-[1.08] text-ink [animation-delay:90ms] sm:text-5xl lg:text-[3.4rem]">
            {hero.headline}
          </h1>
          <p className="mt-5 animate-fade-up max-w-xl text-base leading-relaxed text-ink/70 [animation-delay:180ms] sm:text-lg">
            {hero.sub}
          </p>

          <div className="mt-8 animate-fade-up flex flex-wrap items-center gap-3 [animation-delay:270ms]">
            <a href="#contact" className="btn-primary btn-beat">
              <CalendarCheck className="h-4 w-4" /> Book an Appointment
            </a>
            <a href={`tel:${clinic.phone}`} className="btn-ghost">
              <Phone className="h-4 w-4" />
              <span className="hidden xs:inline">{clinic.phoneDisplay}</span>
              <span className="xs:hidden">Call Us</span>
            </a>
          </div>

          <ul className="mt-7 animate-fade-up flex flex-wrap gap-x-5 gap-y-2.5 [animation-delay:360ms]">
            {hero.trustChips.map((chip) => (
              <li key={chip} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/75">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand" /> {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — image slides in from right */}
        <div className="relative animate-slide-right [animation-delay:120ms]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl2 shadow-soft" data-parallax="-0.06">
            <SmartImage
              src={hero.image}
              alt={`${clinic.name} dental clinic in Indore`}
              label="Clinic / smiling patient photo"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
              style={{ objectPosition: hero.imagePosition }}
            />
          </div>

          {/* Doctor name badge — pops in with spring feel */}
          <div className="absolute -bottom-5 -left-2 flex animate-pop-in items-center gap-3 rounded-2xl bg-white p-3.5 shadow-card [animation-delay:680ms] sm:-left-6">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-tint text-brand">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold text-ink">{hero.imageDoctorName}</p>
              <p className="text-xs text-ink/60">{hero.imageDoctorRole}</p>
            </div>
          </div>

          {/* Years badge — pops in with delay */}
          <div className="absolute -right-2 top-5 hidden animate-pop-in rounded-2xl bg-brand px-4 py-3 text-center text-white shadow-card [animation-delay:900ms] sm:block">
            <p className="font-display text-2xl font-semibold leading-none">
              {new Date().getFullYear() - clinic.establishedYear}+
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-white/80">Years caring</p>
          </div>
        </div>
      </div>

      <svg className="smile-arc" viewBox="0 0 1440 48" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 48 Q720 -24 1440 48 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
