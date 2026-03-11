import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cloud:   "#D4E4F0",
        mist:    "#4E6A9C",
        slate:   "#1A3F75",
        sky:     "#4EA4CC",
        void:    "#00002A",
        ink:     "#D4E4F0",
        bone:    "#00002A",
        ash:     "#4E6A9C",
        ember:   "#4EA4CC",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
