/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: { DEFAULT: '#F37A6E', dark: '#C9564A' },
        sunny: { DEFAULT: '#F9B23C', dark: '#C98A1E' },
        teal: { DEFAULT: '#71C7A6', dark: '#4A9E7E' },
        navy: { DEFAULT: '#2B3576', dark: '#1B2352' },
      },
      fontFamily: {
        display: ['Outfit', 'Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Shadow tebal flat ala kartu board game (offset solid, tanpa blur)
        coral: '0 8px 0 0 #C9564A',
        'coral-lg': '0 14px 0 0 #C9564A',
        sunny: '0 8px 0 0 #C98A1E',
        'sunny-lg': '0 14px 0 0 #C98A1E',
        teal: '0 8px 0 0 #4A9E7E',
        'teal-lg': '0 14px 0 0 #4A9E7E',
      },
    },
  },
  plugins: [],
};