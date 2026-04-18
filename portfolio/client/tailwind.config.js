/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        mint: {
          DEFAULT: "#5C2A00",
          dark: "#3A1500",
          light: "#8B4513",
        },
        bg: {
          main: "#3E3232",
          surface: "#503C3C",
          card: "#7E6363",
          light: "#EED9B9",
          "light-surface": "#EED9B9",
          "light-card": "#EED9B9",
        },
        accent: {
          purple: "#7E6363",
          blue: "#503C3C",
        },
        text: {
          main: "#A87C7C",
          muted: "#7E6363",
          "light-main": "#3A1500",
          "light-muted": "#5C2A00",
        },
      },
      fontFamily: {
        sans: ["Sora", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        rumble: ["MasterRumble", "serif"],
        giano: ["Pollana Giano", "serif"],
        voltage: ["BlueVoltage", "sans-serif"],
      },
      backgroundImage: {
        "mint-gradient": "linear-gradient(135deg, #3A1500 0%, #5C2A00 50%, #8B4513 100%)",
        "mint-gradient-soft": "linear-gradient(135deg, rgba(58, 21, 0, 0.35), rgba(139, 69, 19, 0.2))",
        "hero-gradient": "radial-gradient(ellipse at top left, rgba(92, 42, 0, 0.16) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(58, 21, 0, 0.24) 0%, transparent 50%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "gradient-x": "gradient-x 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
