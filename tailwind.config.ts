import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'hacker-green': '#00FF41',
        'surface': '#1C1C1E',
        'surface-2': '#2C2C2E',
        'secondary': '#8E8E93',
        'whatsapp': '#25D366',
        'danger': '#FF3B30',
        'credentials': '#0D1117',
      },
      fontFamily: {
        mono: ['Space Mono', 'Courier New', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        ios: ['-apple-system', 'BlinkMacSystemFont', "'Helvetica Neue'", 'sans-serif'],
      },
      animation: {
        'pulse-border': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cursor-blink': 'blink 0.5s step-end infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 255, 65, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 65, 0.6), 0 0 40px rgba(0, 255, 65, 0.2)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
