import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-alt": "var(--accent-alt)",
        success: "var(--success)",
        danger: "var(--danger)",
        "code-bg": "var(--code-bg)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      spacing: {
        grid: "8px",
        "sub-grid": "4px",
      },
      borderRadius: {
        card: "16px",
        input: "12px",
      },
      zIndex: {
        dropdown: "1000",
        sticky: "1010",
        fixed: "1020",
        modal: "1030",
        popover: "1040",
        tooltip: "1050",
        overlay: "9999",
      },
      transitionDuration: {
        motion: "120ms",
      },
      transitionTimingFunction: {
        motion: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

