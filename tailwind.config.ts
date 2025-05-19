import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-fluo': '#C0FE04',
        'blue-neon': '#1A00FF',
        'black': '#050505',
      },
      fontFamily: {
        marathon: ['"MarathonFont"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
