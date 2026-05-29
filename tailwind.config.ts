import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18212f",
        mist: "#f5f7fb",
        brand: "#176b87",
        coral: "#d65a31",
        leaf: "#4f8f6b"
      }
    }
  },
  plugins: []
};

export default config;
