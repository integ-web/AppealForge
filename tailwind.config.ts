import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08111F",
          900: "#0D1B2A"
        },
        harbor: {
          800: "#123047",
          700: "#174866"
        },
        teal: {
          500: "#00A88E",
          300: "#5EEAD4"
        },
        amber: {
          400: "#F6B44B"
        },
        coral: {
          500: "#E76F51"
        },
        paper: {
          50: "#F8F5EF",
          100: "#EFE8DC"
        },
        mist: {
          200: "#DCE5EA"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "Charter", "Cambria", "serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"]
      },
      boxShadow: {
        atelier: "0 22px 80px rgba(0,0,0,0.28)",
        teal: "0 0 0 1px rgba(94,234,212,0.18), 0 16px 40px rgba(0,168,142,0.18)",
        paper: "0 22px 80px rgba(8,17,31,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
