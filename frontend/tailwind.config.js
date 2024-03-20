/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#00012b",
        darkMed: "#00012bcc",
        light: "#00ffef",
        medium: "#00aeef",
      },
    },
  },
  plugins: [],
};
