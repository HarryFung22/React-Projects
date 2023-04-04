module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {

      xxs: '330px',

      xs: '360px',

      s1: '390px',

      s2: '410px',

      s: '500px',

      priceSize: '592px',

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      mini: '768px',

      md: '770px',
      // => @media (min-width: 768px) { ... }

      ipad: '800px',

      lg: '1000px',
      // => @media (min-width: 1024px) { ... }

      xl: '1400px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        pacifico: "'Pacifico', cursive",
        mont: "'Montserrat', sans-serif",
        monteCarlo: "'MonteCarlo', cursive",
        dance: "'Dancing Scrip', cursive",
        libre: "'Libre Baskerville', serif",
        oxygen: "'Oxygen', sans-serif",
        cabin: "'Cabin', sans-serif",
        light: "'Open Sans', sans-serif",
      }
    }
  },
  plugins: [],
};