import { clinic } from "@/data/clinic";
import SmartImage from "./SmartImage";

export default function Doctors() {
  return (
    <section id="doctors" className="py-20">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center" data-stagger="110">
          <span className="eyebrow reveal">
            <span className="h-px w-6 bg-brand" /> Meet the team
          </span>
          <h2 className="section-title reveal-blur mt-4">Specialists who treat you like family</h2>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6" data-stagger="150">
          {clinic.doctors.map((d) => (
            <div
              key={d.name}
              className="reveal group w-full overflow-hidden rounded-2xl sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] border border-brand/10 bg-white transition-shadow hover:shadow-card"
            >
              <div className="reveal-img aspect-[4/5] overflow-hidden bg-brand-tint">
                <SmartImage
                  src={d.photo}
                  alt={d.name}
                  label="Doctor photo"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  style={{ objectPosition: d.photoPosition }}
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-medium text-ink">{d.name}</h3>
                <p className="text-sm font-medium text-brand">{d.role}</p>
                <p className="mt-1 text-xs text-ink/55">{d.creds}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
