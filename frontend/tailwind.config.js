/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ['"Dancing Script"', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'midnyt-dark': '#0f172a', /* Slate 900 */
        'midnyt-gold': '#fbbf24', /* Amber 400 */
        'paper': '#fefce8', /* Yellow 50 */
      }
    },
  },
  plugins: [],
}
