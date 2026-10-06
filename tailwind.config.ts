import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "rgb(var(--brand) / <alpha-value>)",
        "brand-dark": "rgb(var(--brand-dark) / <alpha-value>)",
        "brand-tint": "rgb(var(--brand-tint) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.75rem",
      },
      boxShadow: {
        soft: "0 18px 50px -20px rgb(var(--brand-dark) / 0.30)",
        card: "0 10px 40px -22px rgb(var(--ink) / 0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-right": {
          "0%":   { opacity: "0", transform: "translateX(44px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pop-in": {
          "0%":   { opacity: "0", transform: "scale(0.72)" },
          "72%":  { transform: "scale(1.06)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-8px)" },
        },
        "pulse-ring": {
          "0%":   { transform: "scale(1)", opacity: "0.65" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        "modal-in": {
          "0%":   { opacity: "0", transform: "translateY(40px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "modal-out": {
          "0%":   { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(30px) scale(0.97)" },
        },
        "backdrop-in":  { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "backdrop-out": { "0%": { opacity: "1" }, "100%": { opacity: "0" } },
        "step-in": {
          "0%":   { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up":     "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "slide-right": "slide-right 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "pop-in":      "pop-in 0.55s cubic-bezier(0.22,1,0.36,1) both",
        float:         "float 6s ease-in-out infinite",
        "pulse-ring":  "pulse-ring 1.9s ease-out infinite",
        "modal-in":     "modal-in 0.5s cubic-bezier(0.22,1,0.36,1) both",
        "modal-out":    "modal-out 0.28s ease-in both",
        "backdrop-in":  "backdrop-in 0.4s ease-out both",
        "backdrop-out": "backdrop-out 0.28s ease-in both",
        "step-in":      "step-in 0.35s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
