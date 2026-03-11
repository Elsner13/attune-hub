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
        cloud:   "#EAEFEF",
        mist:    "#BFC9D1",
        slate:   "#25343F",
        sky:     "#4FC3F7",
        void:    "#080C0F",
        ink:     "#EAEFEF",
        bone:    "#080C0F",
        ash:     "#BFC9D1",
        ember:   "#4FC3F7",
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
