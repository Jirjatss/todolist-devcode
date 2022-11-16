/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      primary: "#16ABF8",
      secondary: "#888888",
      
       fontFamily: {
        signika: ["Signika Negative"],
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
