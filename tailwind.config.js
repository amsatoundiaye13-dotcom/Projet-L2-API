/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#A67C52', // Doré / Sable
        secondary: '#156F4B', // Vert Touba
        'text-primary': '#2E2E2E', // Noir doux
        'text-secondary': '#6B6B6B', // Gris chaud
        'background-light': '#FDFCF8', // Beige clair
        accent: '#E2C044', // Jaune clair / Lumière
        'background-dark': '#1E1E1E', // Noir brun
        error: '#C0392B', // Rouge doux
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'amiri': ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
};
