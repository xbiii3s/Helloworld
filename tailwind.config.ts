import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        felt: { 50: "#ecfdf3", 500: "#16a34a", 700: "#0f5132", 900: "#052e1a" },
        chip: { gold: "#d4a017", red: "#dc2626" },
      },
    },
  },
  plugins: [],
} satisfies Config;
