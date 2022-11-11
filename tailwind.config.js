/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dark']
  }
};
