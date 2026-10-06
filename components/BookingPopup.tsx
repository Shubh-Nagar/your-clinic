"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  X,
  Star,
  ArrowRight,
  ArrowLeft,
  CalendarCheck,
  MessageCircle,
  Check,
  Sun,
  Moon,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";
import { clinic } from "@/data/clinic";
import { iconMap } from "./icons";
import SmartImage from "./SmartImage";

const CONSULT = "General consultation";

// Next N open days (skipping the clinic's closed weekdays).
function upcomingDays(count: number, closed: number[]) {
  const days: Date[] = [];
  const d = new Date();
  while (days.length < count) {
    if (!closed.includes(d.getDay())) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function dayLabel(d: Date) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return d.toLocaleDateString("en-IN", { weekday: "short" });
}

export default function BookingPopup() {
  const cfg = clinic.bookingPopup;
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const days = useMemo(() => upcomingDays(6, cfg.closedDays), [cfg.closedDays]);

  // Open on every page load, shortly after the page appears.
  useEffect(() => {
    if (!cfg.enabled) return;
    const t = setTimeout(() => setOpen(true), cfg.openDelayMs);
    return () => clearTimeout(t);
  }, [cfg.enabled, cfg.openDelayMs]);

  // Lock page scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (step === 2) nameRef.current?.focus();
  }, [step]);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 280);
  };

  const phoneDigits = phone.replace(/\D/g, "");
  const canSend = name.trim().length > 1 && phoneDigits.length >= 10;

  const send = () => {
    if (!canSend) return;
    const d = days[dayIdx];
    const when = `${d.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "short",
    })}, ${cfg.slots[slot].label} (${cfg.slots[slot].time})`;
    const msg = [
      `Hi ${clinic.shortName}, I'd like to book an appointment.`,
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Treatment: ${service || CONSULT}`,
      `Preferred time: ${when}`,
    ].join("\n");
    window.open(`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  if (!open) return null;

  const services = [...clinic.services.slice(0, 7), { icon: "", title: CONSULT }];
  const steps = ["Treatment", "Time", "Details"];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-popup-title"
    >
      {/* Backdrop */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink/50 backdrop-blur-sm ${
          closing ? "animate-backdrop-out" : "animate-backdrop-in"
        }`}
      />

      {/* Card */}
      <div
        className={`relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl md:grid md:grid-cols-[0.9fr_1.1fr] ${
          closing ? "animate-modal-out" : "animate-modal-in"
        }`}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-ink/70 shadow-card backdrop-blur transition hover:rotate-90 hover:bg-white hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ── Left: doctor panel ─────────────────────────────── */}
        <div className="relative hidden min-h-[540px] overflow-hidden bg-gradient-to-br from-brand to-brand-dark md:block">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
            <div className="absolute -right-10 top-1/3 h-40 w-40 rounded-full bg-accent/25 blur-2xl" />
            <div className="absolute bottom-0 left-1/2 aspect-square w-[85%] -translate-x-1/2 translate-y-1/3 rounded-full bg-white/10" />
            <div className="absolute bottom-0 left-1/2 aspect-square w-[62%] -translate-x-1/2 translate-y-1/4 rounded-full bg-white/10" />
          </div>

          <div className="relative px-7 pt-8 text-white">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {cfg.eyebrow}
            </span>
          </div>

          <SmartImage
            src={cfg.image}
            alt={cfg.imageAlt}
            label="Doctor photo"
            className="absolute bottom-0 left-1/2 w-[88%] max-w-none -translate-x-1/2 drop-shadow-[0_16px_30px_rgba(0,0,0,0.25)]"
          />

          {/* Floating rating chip */}
          <div className="absolute left-5 top-24 animate-float rounded-2xl bg-white/95 px-3 py-2 shadow-card backdrop-blur">
            <div className="flex items-center gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
            <p className="mt-0.5 text-xs font-semibold text-ink">
              {clinic.hero.rating} <span className="font-normal text-ink/55">· {clinic.hero.ratingNote}</span>
            </p>
          </div>

          {/* Floating experience chip */}
          <div
            className="absolute right-4 top-1/2 animate-float rounded-2xl bg-white/95 px-3 py-2 shadow-card backdrop-blur"
            style={{ animationDelay: "-3s" }}
          >
            <p className="font-display text-lg font-semibold leading-none text-brand-dark">
              {clinic.stats[0].value}
              {clinic.stats[0].suffix}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wide text-ink/55">Years caring</p>
          </div>

          {/* Doctor name plate */}
          <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-white backdrop-blur-md">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-brand">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{cfg.doctorName}</p>
              <p className="truncate text-xs text-white/75">{cfg.doctorRole}</p>
            </div>
          </div>
        </div>

        {/* ── Right: booking flow ────────────────────────────── */}
        <div className="flex min-h-0 flex-col overflow-y-auto p-6 sm:p-8">
          {/* Mobile header with doctor avatar */}
          <div className="mb-4 flex items-center gap-3 md:hidden">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-brand to-brand-dark ring-4 ring-brand-tint">
              <SmartImage src={cfg.image} alt={cfg.imageAlt} label="" className="h-full w-full object-cover object-top" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{cfg.doctorName}</p>
              <p className="flex items-center gap-1 text-xs text-ink/60">
                <Star className="h-3 w-3 fill-accent text-accent" /> {clinic.hero.rating} · {clinic.hero.ratingNote}
              </p>
            </div>
          </div>

          {sent ? (
            <div className="flex flex-1 flex-col items-center justify-center py-8 text-center animate-fade-up">
              <div className="relative grid h-20 w-20 place-items-center">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
                <span className="relative grid h-20 w-20 place-items-center rounded-full bg-[#25D366] text-white animate-pop-in">
                  <Check className="h-10 w-10" strokeWidth={3} />
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-medium text-ink">You&apos;re almost booked!</h3>
              <p className="mt-2 max-w-xs text-sm text-ink/60">
                Just hit send in WhatsApp, {name.trim().split(" ")[0]}. Our team will confirm your slot shortly.
              </p>
              <button onClick={close} className="btn-ghost mt-6">
                Continue browsing
              </button>
            </div>
          ) : (
            <>
              <h2 id="booking-popup-title" className="pr-8 font-display text-2xl font-medium leading-tight text-ink sm:text-[1.7rem]">
                {cfg.title}
              </h2>
              <p className="mt-1.5 text-sm text-ink/60">{cfg.sub}</p>

              {/* Stepper */}
              <div className="mt-5 flex items-center gap-2">
                {steps.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => i < step && setStep(i)}
                    disabled={i > step}
                    className="group flex flex-1 flex-col gap-1.5 text-left"
                  >
                    <span className="h-1.5 w-full overflow-hidden rounded-full bg-brand-tint">
                      <span
                        className="block h-full rounded-full bg-brand transition-all duration-500 ease-out"
                        style={{ width: i <= step ? "100%" : "0%" }}
                      />
                    </span>
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                        i <= step ? "text-brand" : "text-ink/35"
                      }`}
                    >
                      {i + 1}. {s}
                    </span>
                  </button>
                ))}
              </div>

              {/* Step content */}
              <div key={step} className="mt-5 flex-1 animate-step-in">
                {step === 0 && (
                  <>
                    <p className="mb-3 text-sm font-medium text-ink/80">What brings you in?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((s) => {
                        const Icon = iconMap[s.icon] ?? Stethoscope;
                        const active = service === s.title;
                        return (
                          <button
                            key={s.title}
                            onClick={() => {
                              setService(s.title);
                              setTimeout(() => setStep(1), 220);
                            }}
                            className={`group flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[13px] font-medium leading-snug transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] ${
                              active
                                ? "border-brand bg-brand text-white shadow-soft"
                                : "border-brand/15 bg-paper text-ink/80 hover:border-brand/40 hover:bg-brand-tint/60"
                            }`}
                          >
                            <span
                              className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${
                                active ? "bg-white/20 text-white" : "bg-white text-brand group-hover:bg-brand group-hover:text-white"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="line-clamp-2">{s.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <p className="mb-3 text-sm font-medium text-ink/80">Pick a day</p>
                    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                      {days.map((d, i) => {
                        const active = dayIdx === i;
                        return (
                          <button
                            key={d.toDateString()}
                            onClick={() => setDayIdx(i)}
                            className={`flex w-16 shrink-0 flex-col items-center rounded-2xl border py-2.5 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                              active
                                ? "border-brand bg-brand text-white shadow-soft"
                                : "border-brand/15 bg-paper text-ink/75 hover:border-brand/40"
                            }`}
                          >
                            <span className={`text-[10px] font-semibold uppercase tracking-wide ${active ? "text-white/80" : "text-ink/45"}`}>
                              {dayLabel(d)}
                            </span>
                            <span className="font-display text-xl font-semibold leading-tight">{d.getDate()}</span>
                            <span className={`text-[10px] ${active ? "text-white/80" : "text-ink/45"}`}>
                              {d.toLocaleDateString("en-IN", { month: "short" })}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <p className="mb-3 mt-5 text-sm font-medium text-ink/80">Preferred time</p>
                    <div className="grid grid-cols-2 gap-2">
                      {cfg.slots.map((s, i) => {
                        const active = slot === i;
                        const Icon = i === 0 ? Sun : Moon;
                        return (
                          <button
                            key={s.label}
                            onClick={() => setSlot(i)}
                            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] ${
                              active
                                ? "border-brand bg-brand-tint ring-2 ring-brand"
                                : "border-brand/15 bg-paper hover:border-brand/40"
                            }`}
                          >
                            <Icon className={`h-5 w-5 ${active ? "text-accent" : "text-ink/40"}`} />
                            <span>
                              <span className="block text-sm font-semibold text-ink">{s.label}</span>
                              <span className="block text-xs text-ink/55">{s.time}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="mb-4 flex flex-wrap gap-1.5 text-xs">
                      <span className="rounded-full bg-brand-tint px-3 py-1 font-medium text-brand-dark">{service || CONSULT}</span>
                      <span className="rounded-full bg-brand-tint px-3 py-1 font-medium text-brand-dark">
                        {dayLabel(days[dayIdx])} {days[dayIdx].getDate()} · {cfg.slots[slot].label}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-ink/80">Your name</span>
                        <input
                          ref={nameRef}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full rounded-xl border border-brand/15 bg-paper px-4 py-3 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-ink/80">Mobile number</span>
                        <div className="flex rounded-xl border border-brand/15 bg-paper transition focus-within:border-brand focus-within:bg-white focus-within:ring-4 focus-within:ring-brand/10">
                          <span className="grid place-items-center border-r border-brand/10 px-3 text-sm text-ink/50">+91</span>
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && send()}
                            inputMode="tel"
                            placeholder="10-digit mobile"
                            className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                          />
                          {phoneDigits.length >= 10 && (
                            <Check className="mr-3 h-4 w-4 self-center text-[#25D366] animate-pop-in" />
                          )}
                        </div>
                      </label>
                    </div>
                  </>
                )}
              </div>

              {/* Perks */}
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
                {cfg.perks.map((p) => (
                  <li key={p} className="flex items-center gap-1.5 text-xs text-ink/60">
                    <Check className="h-3.5 w-3.5 text-brand" strokeWidth={3} /> {p}
                  </li>
                ))}
              </ul>

              {/* Footer actions */}
              <div className="mt-5 flex items-center gap-3">
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    aria-label="Back"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-brand/20 text-brand-dark transition hover:bg-brand-tint active:scale-95"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                {step < 2 ? (
                  <button onClick={() => setStep(step + 1)} className="btn-primary group flex-1">
                    {step === 0 && !service ? "Skip — just a consultation" : "Continue"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    onClick={send}
                    disabled={!canSend}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    <MessageCircle className="h-4 w-4" /> Confirm on WhatsApp
                  </button>
                )}
              </div>
              <button
                onClick={close}
                className="mt-3 flex items-center justify-center gap-1.5 self-center text-xs font-medium text-ink/45 transition hover:text-ink/70"
              >
                <CalendarCheck className="h-3.5 w-3.5" /> Maybe later
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
