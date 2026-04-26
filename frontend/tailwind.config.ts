/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores Principais
        primary: {
          DEFAULT: '#3525cd',
          container: '#4f46e5',
          on: '#ffffff',
          'on-container': '#dad7ff',
          fixed: '#e2dfff',
        },
        secondary: {
          DEFAULT: '#006a61',
          container: '#86f2e4',
          on: '#ffffff',
          'on-container': '#006f66',
        },
        tertiary: {
          DEFAULT: '#7e3000',
          container: '#a44100',
          on: '#ffffff',
        },
        // Superfícies (Níveis de Tonalidade)
        surface: {
          DEFAULT: '#f8f9fa',
          dim: '#d9dadb',
          bright: '#f8f9fa',
          variant: '#e1e3e4',
          container: {
            lowest: '#ffffff',
            low: '#f3f4f5',
            DEFAULT: '#edeeef',
            high: '#e7e8e9',
            highest: '#e1e3e4',
          },
        },
        // Texto e Bordas
        'on-surface': '#191c1d',
        'on-surface-variant': '#464555',
        outline: '#777587',
        'outline-variant': '#c7c4d8',
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
          on: '#ffffff',
        }
      },
      fontFamily: {
        display: ['var(--font-manrope)', 'sans-serif'], 
      sans: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        'xs': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
      },
      spacing: {
        unit: '4px',
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '48px',
      }
    },
  },
  plugins: [],
}