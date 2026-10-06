"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { clinic } from "@/data/clinic";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-brand-tint/40 py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-stagger="110">
          <span className="eyebrow reveal">
            <span className="h-px w-6 bg-brand" /> Questions
          </span>
          <h2 className="section-title reveal-blur mt-4">Frequently asked</h2>
          <p className="reveal mt-3 text-ink/65">
            Still unsure about something? Call us at{" "}
            <a href={`tel:${clinic.phone}`} className="font-semibold text-brand underline-offset-2 hover:underline">
              {clinic.phoneDisplay}
            </a>{" "}
            — we're happy to help.
          </p>
        </div>

        <div className="reveal-scale divide-y divide-brand/10 rounded-2xl border border-brand/10 bg-white px-5 [animation-delay:150ms]" data-stagger="90" data-stagger-base="300">
          {clinic.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="reveal">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-brand"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-ink">{f.q}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-brand transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden text-sm leading-relaxed text-ink/65">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
