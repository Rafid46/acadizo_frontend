/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-vertical": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },

      colors: {
        "primary-color": "#7ABA78",
        "secondary-color": "#41B06E",
        "text-color": "#20272c",
        "text-second-color": "#64748B",
        "border-color": "#EEEDEB",
      },
      fontFamily: {
        // poppins: "'Poppins', sans-serif",
        inter: "'Inter', sans-serif",
      },
      fontSize: {
        "text-small": ["10px", "1.5"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
