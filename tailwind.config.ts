import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ---- Premium design system (brief Termoidrica GS) ---- */
        // Fire — arancio caldo, energia (CTA, accenti caldi)
        fire: {
          DEFAULT: "#FF6B35",
          50: "#fff2ec",
          100: "#ffe0d2",
          200: "#ffbfa5",
          300: "#ff9d78",
          400: "#ff854f",
          500: "#FF6B35",
          600: "#e85520",
          700: "#c23f12",
        },
        // Deep — blu profondo, acqua + affidabilità
        deep: {
          DEFAULT: "#1A3A5C",
          400: "#2d567f",
          500: "#1A3A5C",
          600: "#132c47",
          700: "#0d2035",
        },
        // Teal — efficienza, rinnovabili
        teal: {
          DEFAULT: "#00D4AA",
          300: "#4fe6ca",
          400: "#1fdcb8",
          500: "#00D4AA",
          600: "#00ab89",
          700: "#008066",
        },
        // Night — background dark
        night: {
          DEFAULT: "#0D1B2A",
          900: "#0D1B2A",
          800: "#122438",
          700: "#182f47",
          600: "#1f3a56",
        },

        /* ---- Alias retro-compatibili (componenti non ancora rifatti) ---- */
        brand: {
          50: "#eef3f9",
          100: "#d6e2ef",
          200: "#aec6de",
          300: "#7ea3c6",
          400: "#4a79a6",
          500: "#1f4f7d",
          600: "#163f66",
          700: "#0f2b4a",
          800: "#0c2240",
          900: "#0a1b33",
          blue: "#1A3A5C",
          accent: "#00D4AA",
        },
        accent: {
          50: "#e6faf6",
          100: "#c7f3ea",
          200: "#8fe7d6",
          300: "#4fe6ca",
          400: "#1fdcb8",
          500: "#00D4AA",
          600: "#00ab89",
          700: "#008066",
        },
        flame: {
          DEFAULT: "#FF6B35",
          400: "#ff854f",
          500: "#FF6B35",
          600: "#e85520",
        },
        ink: {
          DEFAULT: "#0a0f1e",
          700: "#1b2535",
          500: "#475569",
          400: "#64748b",
        },
        mist: "#f0f4f8",
        line: "#dde3ec",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ['"Oswald"', "var(--font-oswald)", "system-ui", "sans-serif"],
        number: ['"Space Grotesk"', "var(--font-space)", "monospace"],
      },
      boxShadow: {
        card: "0 10px 40px -18px rgba(16,32,46,0.25)",
        "card-hover": "0 24px 60px -24px rgba(26,58,92,0.45)",
        soft: "0 2px 12px -4px rgba(16,32,46,0.12)",
        "glow-fire": "0 10px 40px -8px rgba(255,107,53,0.5)",
        "glow-teal": "0 10px 40px -8px rgba(0,212,170,0.45)",
      },
      backgroundImage: {
        "fire-gradient": "linear-gradient(135deg, #FF6B35 0%, #ff854f 100%)",
        "teal-gradient": "linear-gradient(135deg, #00D4AA 0%, #1fdcb8 100%)",
        "night-gradient": "linear-gradient(160deg, #0D1B2A 0%, #1A3A5C 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "bounce-down": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(8px)", opacity: "0.5" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "bounce-down": "bounce-down 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
