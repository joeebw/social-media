/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        secondaryBackground: "var(--secondary-background-color)",
        text: "var(--text-color)",
        primary: "var(--primary-color)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
