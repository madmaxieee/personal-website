/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".text-vertical": {
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        },
      });
    },
  ],
};
