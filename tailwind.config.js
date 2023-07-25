const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "app/**/*.{js,ts,jsx,tsx}",
    "pages/**/*.{js,ts,jsx,tsx}",
    "components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: ["@tailwindcss/forms"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
