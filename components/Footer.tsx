import { clinic } from "@/data/clinic";
import { Instagram, Facebook, Youtube, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={clinic.logo} alt={clinic.name} className="h-9 w-auto" />
            <span className="font-display text-lg font-semibold text-white">{clinic.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{clinic.tagline}.</p>
          <div className="mt-5 flex gap-3">
            {clinic.social.instagram && (
              <a href={clinic.social.instagram} aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-brand">
                <Instagram className="h-4 w-4" />
              </a>
            )}
            {clinic.social.facebook && (
              <a href={clinic.social.facebook} aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-brand">
                <Facebook className="h-4 w-4" />
              </a>
            )}
            {clinic.social.youtube && (
              <a href={clinic.social.youtube} aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-brand">
                <Youtube className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Visit us</h4>
          <p className="mt-4 flex gap-2 text-sm text-white/60">
            <MapPin className="h-4 w-4 shrink-0" />
            {clinic.address.line1}, {clinic.address.line2}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Hours</h4>
          <ul className="mt-4 space-y-1.5 text-sm text-white/60">
            {clinic.hours.map((h) => (
              <li key={h.days}>
                {h.days}
                <br />
                <span className="text-white/45">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/45 sm:flex-row">
          <span>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</span>
          <span>Designed &amp; built for clinics in Indore.</span>
        </div>
      </div>
    </footer>
  );
}
