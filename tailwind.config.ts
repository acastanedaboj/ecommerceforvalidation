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
        // Cream/Beige - Backgrounds (Lucia style)
        cream: {
          50: '#FFFFFF',
          100: '#FDFCFB',
          200: '#F9F7F4',
          300: '#F5F0E8',
          400: '#EDE5D9',
          500: '#E0D5C7',
          600: '#C9BBAA',
          700: '#A89A88',
          800: '#7D7166',
          900: '#5C534A',
        },
        // Coral/Red - Primary accent (Lucia style)
        earth: {
          50: '#FEF5F3',
          100: '#FCE8E4',
          200: '#FAD4CD',
          300: '#F5B5A9',
          400: '#EE8A79',
          500: '#E05A47',
          600: '#CC4433',
          700: '#AB3829',
          800: '#8D3126',
          900: '#762E25',
        },
        // Olive/Green - Secondary accent
        olive: {
          50: '#F6F7F4',
          100: '#E9EDE3',
          200: '#D5DCC9',
          300: '#B8C5A4',
          400: '#9AAC7F',
          500: '#7D9160',
          600: '#62744A',
          700: '#4D5B3C',
          800: '#414B34',
          900: '#383F2E',
        },
        // Stone/Neutral - Text & UI (Lucia style: black/white focused)
        stone: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#1C1C1C',
        },
        // Legacy mappings for compatibility
        primary: {
          50: '#FEF5F3',
          100: '#FCE8E4',
          200: '#FAD4CD',
          300: '#F5B5A9',
          400: '#EE8A79',
          500: '#E05A47',
          600: '#CC4433',
          700: '#AB3829',
          800: '#8D3126',
          900: '#762E25',
        },
        secondary: {
          50: '#FFFFFF',
          100: '#FDFCFB',
          200: '#F9F7F4',
          300: '#F5F0E8',
          400: '#EDE5D9',
          500: '#E0D5C7',
          600: '#C9BBAA',
          700: '#A89A88',
          800: '#7D7166',
          900: '#5C534A',
        },
        accent: {
          50: '#FEF5F3',
          100: '#FCE8E4',
          200: '#FAD4CD',
          300: '#F5B5A9',
          400: '#EE8A79',
          500: '#E05A47',
          600: '#CC4433',
          700: '#AB3829',
          800: '#8D3126',
          900: '#762E25',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#1C1C1C',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      fontSize: {
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
        'soft-xl': '0 20px 50px -12px rgba(0, 0, 0, 0.12), 0 4px 20px -4px rgba(0, 0, 0, 0.06)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
        'inner-glow': 'inset 0 1px 3px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 25px 60px -15px rgba(0, 0, 0, 0.15), 0 10px 20px -10px rgba(0, 0, 0, 0.08)',
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
        'slide-up': 'slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-out-right': 'slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-up': 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shimmer': 'shimmer 2s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
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
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
