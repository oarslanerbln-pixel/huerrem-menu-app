/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gold-50': 'var(--gold-50)',
        'gold-100': 'var(--gold-100)',
        'gold-200': 'var(--gold-200)',
        'gold-300': 'var(--gold-300)',
        'gold-400': 'var(--gold-400)',
        'gold-500': 'var(--gold-500)',
        'gold-600': 'var(--gold-600)',
        'gold-700': 'var(--gold-700)',
        'gold-800': 'var(--gold-800)',
        'cat-shisha': 'var(--cat-shisha)',
        'cat-drinks': 'var(--cat-drinks)',
        'cat-food': 'var(--cat-food)',
        'cat-kombis': 'var(--cat-kombis)',
        'surface-100': 'var(--surface-100)',
        'surface-200': 'var(--surface-200)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'border-light': 'var(--border-light)',
      },
      fontFamily: {
        brand: ['"Cinzel"', '"Playfair Display"', 'serif'],
        display: ['"Josefin Sans"', 'sans-serif'],
        body: ['Inter', 'Helvetica Neue', 'sans-serif'],
        handwriting: ['"Great Vibes"', '"Pinyon Script"', '"Mrs Saint Delafield"', 'cursive'],
      },
      spacing: {
        'space-1': 'var(--space-1)',
        'space-2': 'var(--space-2)',
        'space-3': 'var(--space-3)',
        'space-4': 'var(--space-4)',
        'space-5': 'var(--space-5)',
        'space-6': 'var(--space-6)',
        'space-8': 'var(--space-8)',
        'space-12': 'var(--space-12)',
      },
      keyframes: {
        'neon-pulse-slow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 2px rgba(218, 165, 32, 0.4)) drop-shadow(0 0 5px rgba(218, 165, 32, 0.2))', opacity: '0.7' },
          '50%': { filter: 'drop-shadow(0 0 5px rgba(218, 165, 32, 0.9)) drop-shadow(0 0 15px rgba(218, 165, 32, 0.6))', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-5px)' },
          '40%, 80%': { transform: 'translateX(5px)' },
        },
        'pulse-lilac': {
          '0%, 100%': { textShadow: '0 0 10px rgba(216, 180, 226, 0.4), 0 0 20px rgba(216, 180, 226, 0.2)' },
          '50%': { textShadow: '0 0 20px rgba(216, 180, 226, 0.8), 0 0 30px rgba(216, 180, 226, 0.6)' },
        },
        'brutal-flash': {
          '0%, 96%, 98%': { opacity: '1' },
          '97%, 99%': { opacity: '0.8', transform: 'translate(2px, 2px)' },
          '100%': { opacity: '1' },
        },
        'sweep-shine': {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '50%, 100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        'cyber-scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        'breathe-ottoman': {
          '0%, 100%': { boxShadow: '0 10px 25px rgba(139,0,0,0.3)' },
          '50%': { boxShadow: '0 10px 35px rgba(255,215,0,0.15), 0 0 20px rgba(139,0,0,0.5)' },
        },
        'avant-drift': {
          '0%, 100%': { letterSpacing: '0.3em' },
          '50%': { letterSpacing: '0.45em' },
        },
        'matte-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.995)' },
        }
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
        'pulse-lilac': 'pulse-lilac 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'brutal-flash': 'brutal-flash 5s infinite',
        'sweep-shine': 'sweep-shine 3s ease-in-out infinite',
        'neon-pulse-slow': 'neon-pulse-slow 3.5s ease-in-out infinite',
        'cyber-scan': 'cyber-scan 2.5s linear infinite',
        'breathe-ottoman': 'breathe-ottoman 4s ease-in-out infinite',
        'avant-drift': 'avant-drift 8s ease-in-out infinite',
        'matte-pulse': 'matte-pulse 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
