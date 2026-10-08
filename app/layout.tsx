import type { Metadata } from "next";
import "./globals.css";
import { clinic } from "@/data/clinic";
import ScrollObserver from "@/components/ScrollObserver";

export const metadata: Metadata = {
  title: `${clinic.name} | Best Dental Clinic in Indore`,
  description: `${clinic.tagline}. Dental implants, painless root canal, braces, aligners and smile makeovers by an MDS prosthodontist in Vijay Nagar, Indore.`,
  keywords: [
    "dental clinic Indore",
    "best dentist Indore",
    "dental implants Indore",
    "painless root canal Indore",
    "braces aligners Indore",
    "dentist Vijay Nagar Indore",
    "Dental Designs Indore",
  ],
  openGraph: {
    title: `${clinic.name} | Best Dental Clinic in Indore`,
    description: clinic.tagline,
    type: "website",
  },
};

const t = clinic.theme;
const themeVars = `:root{--brand:${t.brand};--brand-dark:${t.brandDark};--brand-tint:${t.brandTint};--accent:${t.accent};--ink:${t.ink};--paper:${t.paper};}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
      </head>
      <body className="font-sans">
        {children}
        <ScrollObserver />
      </body>
    </html>
  );
}
