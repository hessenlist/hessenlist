// tailwind.config.ts
import type { Config } from "tailwindcss";
import { theme as brand } from "./src/config/theme";

const config: Config = {
  // У v4 content не обов'язковий, але не заважає — залишаємо для звички
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      // Кольори бренду (тепер можна писати text-text, bg-surface, text-text-secondary, bg-accent тощо)
      colors: {
        accent: brand.colors.accent,
        surface: brand.colors.surface,
        text: brand.colors.textPrimary,
        "text-secondary": brand.colors.textSecondary,
        "glass-border": brand.colors.border,
        success: brand.colors.success,
        warning: brand.colors.warning,
        danger: brand.colors.error,
      },

      // Тіні для “скляних” елементів
      boxShadow: {
        soft: brand.effects.shadow.soft,
        hover: brand.effects.shadow.hover,
      },

      // Радіуси (можеш юзати rounded-brand або rounded-2xl як тобі зручно)
      borderRadius: {
        brand: brand.effects.radius.lg,
      },

      // Шрифти
      fontFamily: {
        sans: brand.fonts.sans as unknown as string[],
        mono: brand.fonts.mono as unknown as string[],
      },
    },
  },

  plugins: [],
};

export default config;
