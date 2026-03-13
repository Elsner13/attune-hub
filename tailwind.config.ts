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
        cloud:   "#f0f0ec",
        mist:    "#8a9e94",
        slate:   "#3a5a4a",
        sky:     "#a0e6c4",
        void:    "#061612",
        ink:     "#f0f0ec",
        bone:    "#061612",
        ash:     "#8a9e94",
        ember:   "#a0e6c4",
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
