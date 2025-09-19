module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Blue
        secondary: "#9333EA", // Purple
        accent: "#F59E0B", // Amber
        neutral: "#9CA3AF", // Gray
        success: "#10B981", // Green
        warning: "#FBBF24", // Yellow
        error: "#EF4444", // Red
      },
    },
  },
  plugins: [],
};
