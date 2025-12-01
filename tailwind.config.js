/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#09090b', // Fondo casi negro (Zinc 950)
        column: '#18181b', // Fondo de columnas (Zinc 900)
        card: '#27272a', // Fondo de tareas (Zinc 800)
        highlight: '#3b82f6', // Azul profesional
      }
    },
  },
  plugins: [],
}