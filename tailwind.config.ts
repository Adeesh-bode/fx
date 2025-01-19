import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        gradient: `linear-gradient(
          45deg,
          hsl(129deg 83% 82%) 0%,
          hsl(128deg 83% 85%) 8%,
          hsl(127deg 84% 88%) 17%,
          hsl(126deg 85% 91%) 25%,
          hsl(125deg 86% 94%) 33%,
          hsl(125deg 86% 97%) 42%,
          hsl(0deg 0% 100%) 50%,
          hsl(186deg 88% 96%) 58%,
          hsl(186deg 88% 92%) 67%,
          hsl(186deg 88% 88%) 75%,
          hsl(186deg 89% 84%) 83%,
          hsl(186deg 89% 79%) 92%,
          hsl(186deg 90% 74%) 100%
        )`,
      },
    },
  },
  plugins: [],
};

export default config;
