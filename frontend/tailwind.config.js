/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",   // custom blue
        secondary: "#16a34a", // custom green
        dark: "#111827",      // dark bg
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],  // default font
        fancy: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
