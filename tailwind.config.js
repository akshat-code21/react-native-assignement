/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        matiks: {
          bg: '#1E1E1E',
          text: '#A9F99E',
          card: '#2D2D2D', // Slightly lighter for contrast
          muted: '#6B7280', // Gray for inactive/secondary
        },
      },
      fontFamily: {
        montserrat: ['Montserrat_500Medium', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
