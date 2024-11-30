export const theme = {
  colors: {
    blue: {
      30: "#F5F8FF",
      50: "#E8F1FF",
      100: "#C8E0FF",
      300: "#88BAFF",
      500: "#4298FF",
      900: "#0066F9",
      990: "#0040B5",
    },
    orange: {
      30: "#FFF3D5",
      50: "#FFE2D8",
      100: "#FFD280",
      300: "#FFB404",
      500: "#FFA500",
      900: "#FF8A00",
      990: "#C76B00",
    },
    gray: {
      0: "#FFFFFF",
      30: "#F8F8F8",
      50: "#F6F6F6",
      100: "#D9D8D8",
      200: "#C5C8D1",
      300: "#AAA2B9",
      400: "#8E92A3",
      500: "#737B85",
      600: "#565A5A",
      700: "#404546",
      800: "#252620",
      900: "#212529",
    },
    purple: {
      30: "#F3F0FF",
      300: "#7F00FF",
      900: "#F500FF",
    },
    deepOrange: {
      500: "#FF550D",
    },
    system: {
      active: "#00FF85",
      inactive: "#F53891",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F7",
      dark: "#1C1C1E",
    },
    text: {
      primary: "#000000",
      secondary: "#3C3C3C",
      disabled: "#9C9C9C",
      inverse: "#FFFFFF",
    },
  },
  spacing: {
    xxs: "2px",
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px",
  },
  typography: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    md: "1.125rem", // 18px
    lg: "1.25rem", // 20px
    xl: "1.5rem", // 24px
    xxl: "2rem", // 32px
    xxxl: "2.5rem", // 40px
  },
  breakpoints: {
    xs: "320px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px",
  },
  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14)",
    md: "0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)",
    lg: "0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)",
    xl: "0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)",
  },
  borderRadius: {
    xs: "2px",
    sm: "4px",
    md: "8px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },
  zIndex: {
    modal: 1000,
    dropdown: 900,
    header: 800,
    footer: 700,
  },
};

export type Theme = typeof theme;
