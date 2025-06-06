import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: { "regular": "var(--foreground)", "light": "var(--text-foreground-light)" },
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        text_orange: "var(--text-orange)"
      },
      fontFamily: {
        noah: ["var(--font-noah)"],
        IvyPresto: ["var(--font-ivy-presto)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
