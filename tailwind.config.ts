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
        // Teal/Mint - Backgrounds & Accents (#A3BFBF)
        cream: {
          50: '#FFFFFF',
          100: '#F7FAFA',
          200: '#E8F0F0',
          300: '#D1E0E0',
          400: '#B8CDCD',
          500: '#A3BFBF',
          600: '#8AABAB',
          700: '#6B8A8A',
          800: '#516969',
          900: '#3D4F4F',
        },
        // Brown/Terracotta - Primary CTA (#8C442A)
        earth: {
          50: '#FDF8F6',
          100: '#F9EDE8',
          200: '#F0D5CA',
          300: '#E4B8A6',
          400: '#D49578',
          500: '#B86B4A',
          600: '#8C442A',
          700: '#703620',
          800: '#5A2C1A',
          900: '#4A2416',
        },
        // Gold/Yellow - Highlights (#F2D95C, #F2E963)
        olive: {
          50: '#FFFEF5',
          100: '#FEFCE8',
          200: '#FDF8C8',
          300: '#F5EFA0',
          400: '#F2E963',
          500: '#F2D95C',
          600: '#E5C84A',
          700: '#C9A832',
          800: '#A38626',
          900: '#7A6420',
        },
        // Taupe/Mauve - Secondary (#A6847C)
        taupe: {
          50: '#FAF8F7',
          100: '#F3EEEC',
          200: '#E5DCDA',
          300: '#D2C4C0',
          400: '#BCA9A3',
          500: '#A6847C',
          600: '#8C6D65',
          700: '#735851',
          800: '#5C4742',
          900: '#4A3A36',
        },
        // Stone/Neutral - Text (black 80% base)
        stone: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: 'rgba(0, 0, 0, 0.8)',
          900: 'rgba(0, 0, 0, 0.9)',
        },
        // Legacy mappings for compatibility
        primary: {
          50: '#FDF8F6',
          100: '#F9EDE8',
          200: '#F0D5CA',
          300: '#E4B8A6',
          400: '#D49578',
          500: '#B86B4A',
          600: '#8C442A',
          700: '#703620',
          800: '#5A2C1A',
          900: '#4A2416',
        },
        secondary: {
          50: '#FFFFFF',
          100: '#F7FAFA',
          200: '#E8F0F0',
          300: '#D1E0E0',
          400: '#B8CDCD',
          500: '#A3BFBF',
          600: '#8AABAB',
          700: '#6B8A8A',
          800: '#516969',
          900: '#3D4F4F',
        },
        accent: {
          50: '#FFFEF5',
          100: '#FEFCE8',
          200: '#FDF8C8',
          300: '#F5EFA0',
          400: '#F2E963',
          500: '#F2D95C',
          600: '#E5C84A',
          700: '#C9A832',
          800: '#A38626',
          900: '#7A6420',
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
          800: 'rgba(0, 0, 0, 0.8)',
          900: 'rgba(0, 0, 0, 0.9)',
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
        'gradient-warm': 'linear-gradient(135deg, #FFFFFF 0%, #F7FAFA 50%, #E8F0F0 100%)',
        'gradient-earth': 'linear-gradient(135deg, #FDF8F6 0%, #F9EDE8 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FFFEF5 0%, #FEFCE8 100%)',
        'gradient-olive': 'linear-gradient(135deg, #FFFEF5 0%, #FEFCE8 100%)',
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
