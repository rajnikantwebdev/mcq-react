/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        thirty: "#007BFF",
        ten: "#343A40",
      },
    },
  },
  plugins: [],
};
