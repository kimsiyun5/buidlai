/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebar-bg': '#F5F4EE',
        'content-bg': '#FAF9F5',
      }
    },
  },
  plugins: [],
}