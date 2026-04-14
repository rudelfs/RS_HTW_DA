/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#4d5057',
        teal: '#4e6e5d',
        shamrock: '#4da167',
        jade: '#3bc14a',
        dust: '#cfcfcf',
        // Ryanair Style Colors
        ryblue: '#073590',
        ryyellow: '#f1c232'
      },
      boxShadow: {
        'diy': '6px 6px 0px 0px #4d5057',
      },
      keyframes: {
        windowPop: {
          '0%': { transform: 'scale(0.90) translateY(30px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        }
      },
      animation: {
        // Dauer auf 0.8s erhöht für eine deutlichere, langsamere Animation
        'window-pop': 'windowPop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      }
    },
  },
  plugins: [],
}