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
        // Warm cream/beige - Primary background
        cream: {
          50: '#FEFDFB',
          100: '#FDF9F3',
          200: '#FAF3E8',
          300: '#F5EADB',
          400: '#EDD9C4',
          500: '#E3C8AD',
          600: '#D4B08A',
          700: '#B8916A',
          800: '#8F6D4F',
          900: '#6B5240',
        },
        // Earth/terracotta tones - Primary accent
        earth: {
          50: '#FBF7F4',
          100: '#F5EBE3',
          200: '#EAD5C5',
          300: '#DBBAA0',
          400: '#C99B77',
          500: '#B67D56',
          600: '#A66842',
          700: '#8A5538',
          800: '#704632',
          900: '#5C3B2C',
        },
        // Olive green - Nature accent
        olive: {
          50: '#F8FAF5',
          100: '#EFF4E8',
          200: '#DEE8D1',
          300: '#C5D6AD',
          400: '#A8BE85',
          500: '#8BA664',
          600: '#6E8A4D',
          700: '#566D3E',
          800: '#465735',
          900: '#3B492E',
        },
        // Warm stone/neutral
        stone: {
          50: '#FAFAF9',
          100: '#F5F5F3',
          200: '#E8E7E4',
          300: '#D6D4CF',
          400: '#A9A69F',
          500: '#7C7973',
          600: '#5E5B55',
          700: '#474540',
          800: '#33312D',
          900: '#1F1E1B',
        },
        // Legacy mappings for compatibility
        primary: {
          50: '#FBF7F4',
          100: '#F5EBE3',
          200: '#EAD5C5',
          300: '#DBBAA0',
          400: '#C99B77',
          500: '#B67D56',
          600: '#A66842',
          700: '#8A5538',
          800: '#704632',
          900: '#5C3B2C',
        },
        secondary: {
          50: '#FEFDFB',
          100: '#FDF9F3',
          200: '#FAF3E8',
          300: '#F5EADB',
          400: '#EDD9C4',
          500: '#E3C8AD',
          600: '#D4B08A',
          700: '#B8916A',
          800: '#8F6D4F',
          900: '#6B5240',
        },
        accent: {
          50: '#F8FAF5',
          100: '#EFF4E8',
          200: '#DEE8D1',
          300: '#C5D6AD',
          400: '#A8BE85',
          500: '#8BA664',
          600: '#6E8A4D',
          700: '#566D3E',
          800: '#465735',
          900: '#3B492E',
        },
        neutral: {
          50: '#FAFAF9',
          100: '#F5F5F3',
          200: '#E8E7E4',
          300: '#D6D4CF',
          400: '#A9A69F',
          500: '#7C7973',
          600: '#5E5B55',
          700: '#474540',
          800: '#33312D',
          900: '#1F1E1B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #FEFDFB 0%, #FAF3E8 50%, #F5EADB 100%)',
        'gradient-earth': 'linear-gradient(135deg, #FBF7F4 0%, #F5EBE3 100%)',
        'gradient-olive': 'linear-gradient(135deg, #F8FAF5 0%, #EFF4E8 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};

export default config;
