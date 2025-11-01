/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#121212",
        background: "#ffffff",
        primary: "#0369a0",
        secondary: "#bfe0fd",
        accent: "#fdfad8",
      },
    },
  },
  plugins: [],
}
