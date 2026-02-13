/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#020817", // The deep navy background
        card: {
          DEFAULT: "#1e293b", // The secondary card color
          foreground: "#f8fafc",
        },
        slate: {
          800: "#1e293b",
          900: "#0f172a",
        },
        // Match the button colors exactly
        blue: { 600: "#2563eb" },
        emerald: { 600: "#059669" },
        purple: { 600: "#9333ea" },
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};