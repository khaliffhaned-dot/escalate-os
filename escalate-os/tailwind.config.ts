import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#060608",
        sidebar: "#0a0a0c",
        card: "rgba(17,18,20,0.7)",
        "card-hover": "rgba(24,24,27,0.85)",
        accent: { DEFAULT: "#F97316", light: "#FB923C" },
        regulatory: "#22C55E",
        critical: "#EF4444",
        warning: "#F59E0B",
        info: "#3B82F6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-dot": "pulse 2s infinite",
        "gradient-shift": "gradientShift 5s ease infinite",
        blink: "blink 0.8s infinite",
      },
      keyframes: {
        pulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(34,197,94,0.4)" },
          "70%": { boxShadow: "0 0 0 8px rgba(34,197,94,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(34,197,94,0)" },
        },
        gradientShift: {
          "0%,100%": { backgroundPosition: "0% center" },
          "50%": { backgroundPosition: "100% center" },
        },
        blink: {
          "0%,50%": { opacity: "1" },
          "51%,100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
