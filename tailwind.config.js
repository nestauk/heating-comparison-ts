module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "bran-bg": "#fdf7f7",
        "brand-blue": "#0000ff",
        "brand-green": "#00745C",
        "brand-yellow": "#FDB633",
      },
      fontFamily: {
        brand: ['"zosia"', "Averta", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
