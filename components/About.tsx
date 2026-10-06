import { clinic } from "@/data/clinic";
import { iconMap } from "./icons";
import SmartImage from "./SmartImage";

export default function About() {
  return (
    <section id="about" className="bg-brand-tint/40 py-20">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">

        {/* Image — slides in from left */}
        <div className="reveal-left relative">
          <div className="reveal-img aspect-video overflow-hidden rounded-xl2 shadow-soft">
            <SmartImage
              src={clinic.clinicImage}
              alt={`${clinic.name} clinic building`}
              label="Clinic photo"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
          <div className="reveal-pop absolute -bottom-6 left-4 hidden rounded-2xl bg-white px-5 py-4 shadow-card [animation-delay:700ms] sm:block" data-parallax="-0.08">
            <p className="font-display text-2xl font-semibold text-brand">Since {clinic.establishedYear}</p>
            <p className="text-xs text-ink/60">Serving smiles across Indore</p>
          </div>
        </div>

        {/* Content — slides in from right */}
        <div data-stagger="110">
          <span className="eyebrow reveal">
            <span className="h-px w-6 bg-brand" /> Why patients choose us
          </span>
          <h2 className="section-title reveal-blur mt-4">
            Care you can trust, comfort you can feel
          </h2>
          <p className="reveal mt-3 text-ink/70">
            {clinic.name} blends experienced specialists with modern technology
            to deliver treatments that are safe, precise and genuinely
            comfortable — the way dentistry should be.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2" data-stagger="110" data-stagger-base="350">
            {clinic.whyChooseUs.map((w) => {
              const Icon = iconMap[w.icon] ?? iconMap.shield;
              return (
                <div
                  key={w.title}
                  className="reveal-right group flex gap-3"
                >
                  <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-brand shadow-sm transition duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{w.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/65">{w.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
