/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'amiri': ['Amiri', 'serif'],
        'tajawal': ['Tajawal', 'sans-serif'],
      },
      colors: {
        canvas: '#F8FAFC', // slate-50
        charcoal: '#111827', // gray-900
        emerald: {
          800: '#064E3B',
        },
        saffron: '#EA580C', // orange-600
        'cook-dark': '#111827', // gray-900
      },
    },
  },
  plugins: [],
}

