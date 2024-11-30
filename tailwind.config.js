/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#7ABA78",
        "secondary-color": "#41B06E",
        "text-color": "#20272c",
        "text-second-color": "#64748B",
        "border-color": "#EEEDEB",
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        inter: "'Inter', sans-serif",
      },
      fontSize: {
        "text-small": ["10px", "1.5"],
      },
    },
  },
  plugins: [],
};
