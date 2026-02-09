/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-green': '#E8F5E9',
        'pastel-blue': '#E3F2FD',
        'green-accent': '#81C784',
        'blue-accent': '#64B5F6',
      }
    },
  },
  plugins: [],
}
