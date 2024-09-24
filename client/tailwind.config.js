const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF", // or DEFAULT
            foreground: "#11181C", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
            },
            // ... rest of the colors
          },
        },
        dark: {
          colors: {
            background: "#242424", // or DEFAULT
            foreground: "#ECEDEE", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
            },
          },
          // ... rest of the colors
        },
        green: {
          colors: {
            background: "#ffffff", // or DEFAULT
            foreground: "#000000", // or 50 to 900 DEFAULT
            primary: {
              50: "#f3fee6",
              100: "#D2FED7",
              200: "#A6FDB8",
              300: "#78F9A1",
              400: "#56F398",
              500: "#21EC8A",
              600: "#18CA86",
              700: "#10A97E",
              800: "#0A8871",
              900: "#067168",
              DEFAULT: "#21ec8a",
              foreground: "#ffffff",
            },
            focus: "#BCFE9D",
          },
        },
      },
    }),
  ]
}

