/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slider: {
          orange: {
            light: "rgba(37, 37, 47, 1)",
            dark: "rgba(20, 20, 27, 1)",
            borderLight: "rgba(252, 66, 51, 0.5)",
            borderDark: "rgba(255, 238, 146, 1)",
          },
          red: {
            light: "rgba(98, 22, 49, 1)",
            dark: "rgba(255, 90, 139, 1)",
            borderLight: "rgba(98, 22, 49, 1)",
            borderDark: "rgba(218, 73, 108, 1)",
            text: "rgba(128, 32, 55, 1)",
          },
          green: {
            light: "rgba(27, 125, 67, 1)",
            dark: "rgba(108, 231, 150, 1)",
            borderLight: "rgba(26, 80, 62, 1)",
            borderDark: "rgba(64, 198, 134, 1)",
            text: "rgba(7, 110, 73, 1)",
          },
        },
      },
    },
  },
  plugins: [],
};
