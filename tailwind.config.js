module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      garamond: ['EB Garamond', 'serif'],
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}