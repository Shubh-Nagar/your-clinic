"use client";

import { useState } from "react";
import { MapPin, Clock, Phone, MessageCircle, Mail } from "lucide-react";
import { clinic } from "@/data/clinic";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(clinic.services[0].title);

  const sendToWhatsApp = () => {
    const msg = `Hi ${clinic.shortName}, I'd like to book an appointment.%0A%0AName: ${
      name || "-"
    }%0APhone: ${phone || "-"}%0ATreatment: ${service}`;
    window.open(`https://wa.me/${clinic.whatsapp}?text=${msg}`, "_blank");
  };

  return (
    <section id="contact" className="py-20">
      <div className="container-x">
        <div className="reveal-scale overflow-hidden rounded-xl2 border border-brand/10 bg-white shadow-soft lg:grid lg:grid-cols-2">

          {/* Info + map */}
          <div className="bg-brand-dark p-7 text-white sm:p-10" data-stagger="100" data-stagger-base="200">
            <h2 className="reveal-blur font-display text-2xl font-medium sm:text-3xl">Book your visit</h2>
            <p className="reveal mt-2 text-sm text-white/70 sm:text-base">
              Walk in or message us — we'll find a time that suits you.
            </p>

            <ul className="reveal mt-8 space-y-5 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-white/80">
                  {clinic.address.line1}<br />{clinic.address.line2}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-white/80">
                  {clinic.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <a href={`tel:${clinic.phone}`} className="text-white/80 hover:text-white hover:underline underline-offset-2">
                  {clinic.phoneDisplay}
                </a>
              </li>
              {clinic.email && (
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-accent" />
                  <a href={`mailto:${clinic.email}`} className="text-white/80 hover:text-white hover:underline underline-offset-2">
                    {clinic.email}
                  </a>
                </li>
              )}
            </ul>

            <div className="reveal-img mt-8 overflow-hidden rounded-xl border border-white/15">
              <iframe
                src={clinic.address.mapEmbedSrc}
                title={`${clinic.name} location`}
                className="h-48 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="p-7 sm:p-10" data-stagger="90" data-stagger-base="300">
            <h3 className="reveal-blur font-display text-xl font-medium text-ink sm:text-2xl">Request an appointment</h3>
            <p className="reveal mt-1 text-sm text-ink/60">Fill this in and we'll confirm over WhatsApp.</p>

            <div className="mt-6 space-y-4" data-stagger="90" data-stagger-base="500">
              <div className="reveal">
                <label className="mb-1.5 block text-sm font-medium text-ink/80">Your name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-xl border border-brand/15 bg-paper px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
              </div>
              <div className="reveal">
                <label className="mb-1.5 block text-sm font-medium text-ink/80">Phone number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  placeholder="10-digit mobile number"
                  className="w-full rounded-xl border border-brand/15 bg-paper px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
              </div>
              <div className="reveal">
                <label className="mb-1.5 block text-sm font-medium text-ink/80">Treatment needed</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-xl border border-brand/15 bg-paper px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                >
                  {clinic.services.map((s) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                  <option>General consultation</option>
                </select>
              </div>

              <button
                onClick={sendToWhatsApp}
                className="reveal flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.97]"
              >
                <MessageCircle className="h-4 w-4" /> Send on WhatsApp
              </button>
              <a
                href={`tel:${clinic.phone}`}
                className="btn-ghost reveal w-full"
              >
                <Phone className="h-4 w-4" /> Or call {clinic.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
