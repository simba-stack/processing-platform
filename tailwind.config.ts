import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Inter", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"]
      },
      colors: {
        bg: "#0a0a0a",
        surface: "#131313",
        "surface-2": "#1a1a1a",
        border: "#262626",
        "border-strong": "#383838",
        fg: "#fafafa",
        muted: "#a3a3a3",
        faint: "#6b6b6b"
      }
    }
  },
  plugins: []
};

export default config;
