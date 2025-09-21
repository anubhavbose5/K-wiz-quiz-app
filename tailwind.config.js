/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0F1C", // Dark AI background
        primary: "#00E6FF", // Neon Blue
        secondary: "#7C3AED", // Purple Glow
        accent: "#39FF14", // Cyber Green
        black: "#000000",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        futuristic: ["Orbitron", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 230, 255, 0.35)",
      },
    },
  },
  plugins: [],
};
