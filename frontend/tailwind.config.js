module.exports = {
  mode: "jit",
  purge: [
    "./public/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/App.jsx",
    "./public/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
