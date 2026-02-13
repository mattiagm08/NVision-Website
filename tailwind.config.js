/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
  ],
}