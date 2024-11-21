/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3D59',
        secondary: '#E8B75D',
        accent: '#2D6187',
        neutral: '#F5E6CC',
        'base-100': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        travelaku: {
          "primary": "#1E3D59",
          "secondary": "#E8B75D",
          "accent": "#2D6187",
          "neutral": "#F5E6CC",
          "base-100": "#FFFFFF",
          "base-content": "#1E3D59",
          "info": "#2D6187",
          "success": "#40A798",
          "warning": "#E8B75D",
          "error": "#FF6B6B",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
  },
}
