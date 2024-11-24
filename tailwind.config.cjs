/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("./src/ui-preset")],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
