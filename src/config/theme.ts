// src/config/theme.ts
// Дизайн-система HessenList — v0.1
// Єдине джерело кольорів, шрифтів, тіней, відступів.

export const theme = {
  colors: {
    background: "#f5f6f7",               // головний фон (нейтрально-світлий)
    surface: "rgba(255, 255, 255, 0.6)", // поверхні та картки
    accent: "#007aff",                   // “Mac blue” — акцент для посилань і дій
    textPrimary: "#171717",              // основний текст
    textSecondary: "#555",               // допоміжний текст
    border: "rgba(255, 255, 255, 0.3)",  // скляні межі
    success: "#22c55e",                  // швидко відповідають
    warning: "#facc15",                  // відповідають повільно
    error: "#ef4444",                    // не відповідають
  },

  fonts: {
    sans: ["SF Pro Display", "Inter", "system-ui", "sans-serif"],
    mono: ["Menlo", "Consolas", "monospace"],
  },

  effects: {
    radius: {
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      full: "9999px",
    },
    shadow: {
      soft: "0 8px 30px rgba(0, 0, 0, 0.04)",
      hover: "0 8px 40px rgba(0, 0, 0, 0.08)",
    },
  },
};
