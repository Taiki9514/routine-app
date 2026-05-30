/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        noto: ['Noto Sans JP', 'sans-serif'],
      },
      colors: {
        base: '#04040f',
        card: '#0d0d1a',
        border: '#2a2a4a',
        primary: '#534AB7',
        success: '#4ade80',
        danger: '#f87171',
        accent: '#fbbf24',
        info: '#60a5fa',
        textHi: '#e0e0ff',
        textMid: '#c0c0ee',
        textLo: '#8888aa',
        textMuted: '#555580',
      },
      borderRadius: {
        DEFAULT: '12px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [],
};
