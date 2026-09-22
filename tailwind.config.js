/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-container": "#00422b",
        "primary": "#10b981",
        "primary-glow": "#4edea3",
        "on-background": "#e3e2e3",
        "surface-dim": "#121315",
        "surface": "#121315",
        "background": "#08090a",
        "secondary": "#d4af37",
        "secondary-container": "#af8d11",
        "tertiary": "#06b6d4",
        "surface-container-lowest": "#0d0e0f",
        "surface-container-low": "#1b1c1d",
        "surface-container": "#1f2021",
        "surface-container-high": "#292a2b",
        "surface-container-highest": "#343536",
        "on-surface": "#f4f4f5",
        "on-surface-variant": "#a1a1aa",
        "outline": "#86948a",
        "outline-variant": "#1f2328"
      },
      fontFamily: {
        "syne": ["Syne", "sans-serif"],
        "jakarta": ["Plus Jakarta Sans", "sans-serif"],
        "space": ["Space Grotesk", "monospace", "sans-serif"]
      }
    },
  },
  plugins: [],
}
