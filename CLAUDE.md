# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm start        # serve production build
npm run lint     # Next.js ESLint
```

No test suite is configured.

## Purpose

A single-page dental clinic landing page template built to generate personalised demos per clinic in under 90 minutes. The entire site is data-driven: **`data/clinic.ts` is the only file that changes per clinic**. Components read directly from the exported `clinic` object and are not parameterised via props.

## Architecture

### Theme system
`clinic.theme` holds six CSS custom property values as space-separated RGB strings (e.g. `"13 92 99"`). `app/layout.tsx` injects these as `:root` CSS variables at build time via a `<style>` tag. Tailwind aliases (`brand`, `brand-dark`, `brand-tint`, `accent`, `ink`, `paper`) map to these variables using the `rgb(var(--x) / <alpha-value>)` pattern in `tailwind.config.ts`. Changing `clinic.theme` recolours the whole site.

### Icon mapping
`data/clinic.ts` references services and features by string icon keys (e.g. `"implant"`, `"crown"`). `components/icons.ts` maps these keys to Lucide React icon components. To add a new icon key, add it to `iconMap` in `icons.ts` and use the matching key in `clinic.ts`.

### Image handling
`components/SmartImage.tsx` wraps `<img>` with an `onError` handler that swaps in a branded placeholder when a file is missing. All clinic images go in `public/images/` with these exact names: `hero.jpg`, `clinic-interior.jpg`, `doctor-1.jpg`, `doctor-2.jpg`, `case-1-before.jpg`, `case-1-after.jpg` (and cases 2, 3). Missing images degrade gracefully rather than breaking layout.

### WhatsApp CTA
There is no backend. The appointment/contact form constructs a `wa.me` URL using `clinic.whatsapp` and pre-fills the message. Floating WhatsApp and Call buttons (`components/FloatingButtons.tsx`) are always visible on mobile.

### Reusable CSS utilities
Defined in `app/globals.css` under `@layer components`:
- `.container-x` — max-width centered wrapper
- `.eyebrow` — small-caps section label
- `.btn-primary` — accent-coloured CTA button
- `.btn-ghost` — outlined secondary button
- `.section-title` — display-font heading
- `.smile-arc` — SVG wave section divider

### Section order
`app/page.tsx` controls section order: Header → Hero → Stats → Services → About → Doctors → Gallery → BeforeAfter → Testimonials → Faq → Contact → Footer → FloatingButtons.

## Key constraints

- Uses Next.js 14 App Router with TypeScript. No `"use client"` unless interactivity is required (only `SmartImage`, `Stats`, `Gallery`, `BeforeAfter`, `Testimonials`, `Faq`, `Contact`, `BookingPopup`, `ScrollObserver`, `FloatingButtons`, `HeroFloaters`, and `Header` are client components).
- Fonts (Fraunces display, Plus Jakarta Sans body) load from Google Fonts in `app/layout.tsx`. Font variables `--font-display` and `--font-body` are set in `globals.css`.
- `next/image` is intentionally avoided in favour of plain `<img>` via `SmartImage` to avoid the need for image domain configuration in `next.config.mjs`.
