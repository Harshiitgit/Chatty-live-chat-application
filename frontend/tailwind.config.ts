import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',      // Soft indigo
        'primary-light': '#e0e7ff',
        'primary-dark': '#4f46e5',
        secondary: '#8b5cf6',    // Soft purple
        'secondary-light': '#f3e8ff',
        accent: '#ec4899',       // Soft pink
        'accent-light': '#fce7f3',
        background: '#f8fafc',   // Soft off-white
        surface: '#ffffff',
        'surface-light': '#f1f5f9',
        'surface-dark': '#e2e8f0',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.12)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.14)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'soft': '0 2px 8px 0 rgba(99, 102, 241, 0.1)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.15)',
      },
      borderRadius: {
        'xs': '0.25rem',
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      animation: {
        'shape-change': 'shapeChange 5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shapeChange: {
          '0%': {
            transform: 'scale(1) rotate(0deg)',
            borderRadius: '1rem',
            backgroundColor: '#6366f1',
          },
          '25%': {
            transform: 'scale(1.2) rotate(45deg)',
            borderRadius: '50%',
            backgroundColor: '#8b5cf6',
          },
          '50%': {
            transform: 'scale(1) rotate(90deg)',
            borderRadius: '1rem',
            backgroundColor: '#ec4899',
          },
          '75%': {
            transform: 'scale(1.2) rotate(135deg)',
            borderRadius: '10%',
            backgroundColor: '#06b6d4',
          },
          '100%': {
            transform: 'scale(1) rotate(180deg)',
            borderRadius: '1rem',
            backgroundColor: '#6366f1',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#6366f1',
          'primary-content': '#ffffff',
          secondary: '#8b5cf6',
          'secondary-content': '#ffffff',
          accent: '#ec4899',
          'accent-content': '#ffffff',
          neutral: '#2f3e46',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f1f5f9',
          'base-300': '#e2e8f0',
          'base-content': '#1e293b',
          info: '#06b6d4',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
        },
      },
      {
        dark: {
          primary: '#818cf8',
          'primary-content': '#1e1b4b',
          secondary: '#a78bfa',
          'secondary-content': '#2d1b69',
          accent: '#f472b6',
          'accent-content': '#500724',
          neutral: '#1e293b',
          'neutral-content': '#f1f5f9',
          'base-100': '#0f172a',
          'base-200': '#1e293b',
          'base-300': '#334155',
          'base-content': '#f1f5f9',
          info: '#22d3ee',
          success: '#34d399',
          warning: '#fbbf24',
          error: '#f87171',
        },
      },
    ],
  },
};
