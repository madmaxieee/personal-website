// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      fontSize: {
        giant: "15rem",
      },
      spacing: {
        108: "27rem",
        144: "36rem",
        160: "40rem",
      },
    },
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
