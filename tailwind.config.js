/** @type {import('tailwindcss').Config} */
export default {
  /* Define paths to all template files for Tailwind to scan */
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom theme configurations can be added here
    },
  },
  plugins: [],
}