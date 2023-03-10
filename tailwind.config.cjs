/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      'cursor-blink': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.1 },
        },
      },
    },
  },
  plugins: [],
};
