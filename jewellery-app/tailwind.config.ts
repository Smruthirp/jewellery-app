import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#93c5fd",
          DEFAULT: "#3b82f6",
          dark: "#1e3a8a",
        },
        secondary: {
          light: "#fcd34d",
          DEFAULT: "#f59e0b",
          dark: "#92400e",
        },
        accent: {
          light: "#f9a8d4",
          DEFAULT: "#ec4899",
          dark: "#9d174d",
        },
      },
    },
  },
  plugins: [],
};
export default config;
