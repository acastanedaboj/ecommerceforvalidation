import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors - Artisanal, warm, natural
        primary: {
          50: '#fdf8f3',
          100: '#f9ede0',
          200: '#f2d9bd',
          300: '#e9bf8f',
          400: '#dea05f',
          500: '#d4863d', // Main brand color - honey/amber
          600: '#c5702d',
          700: '#a45826',
          800: '#854826',
          900: '#6c3c22',
          950: '#3a1d10',
        },
        secondary: {
          50: '#f6f5f0',
          100: '#e9e6da',
          200: '#d5cfb8',
          300: '#bdb28f',
          400: '#a9976f',
          500: '#9a8560', // Oat/natural color
          600: '#846d51',
          700: '#6b5743',
          800: '#5a493b',
          900: '#4e4035',
          950: '#2c231c',
        },
        accent: {
          50: '#f0fdf0',
          100: '#dcfcdc',
          200: '#bbf7bb',
          300: '#86ef86',
          400: '#4ade4a',
          500: '#22c522', // Fresh green for organic
          600: '#16a316',
          700: '#158015',
          800: '#166516',
          900: '#145314',
          950: '#052e05',
        },
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'grain-pattern': "url('/images/grain-texture.png')",
        'hero-gradient': 'linear-gradient(135deg, #fdf8f3 0%, #f9ede0 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
