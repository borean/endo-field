/**
 * Layout Constants - Single Source of Truth
 * All layout values are defined here and referenced throughout the application
 */

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "5xl" | "7xl" | "content" | "full";
export type SpacingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type PaddingSize = "sm" | "md" | "lg" | "xl";
export type ZIndexLayer = "base" | "dropdown" | "sticky" | "fixed" | "modal" | "popover" | "tooltip" | "overlay";

export const layout = {
  container: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
    "5xl": "64rem",    // 1024px - content layouts
    "7xl": "80rem",    // 1280px - wide layouts
    content: "68ch",   // Max content width for readability
    full: "100%",
  },
  spacing: {
    grid: "8px",
    "sub-grid": "4px",
    xs: "0.5rem",   // 8px
    sm: "1rem",     // 16px
    md: "1.5rem",   // 24px
    lg: "2rem",     // 32px
    xl: "3rem",     // 48px
    "2xl": "4rem",  // 64px
    "3xl": "6rem",  // 96px
  },
  padding: {
    page: {
      mobile: "1rem",    // 16px
      tablet: "1.5rem",  // 24px
      desktop: "2rem",   // 32px
    },
    section: {
      mobile: "1.5rem",  // 24px
      tablet: "2rem",    // 32px
      desktop: "3rem",   // 48px
    },
    card: {
      sm: "1rem",   // 16px
      md: "1.5rem", // 24px
      lg: "2rem",   // 32px
      xl: "3rem",   // 48px
    },
  },
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1010,
    fixed: 1020,
    modal: 1030,
    popover: 1040,
    tooltip: 1050,
    overlay: 9999,
  },
} as const;

export function getZIndexClass(layer: ZIndexLayer): string {
  const zIndex = layout.zIndex[layer];
  return `z-[${zIndex}]`;
}

export type LayoutConfig = {
  container?: ContainerSize;
  maxWidth?: ContainerSize;
  centered?: boolean;
};

