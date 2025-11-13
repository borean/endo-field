import { type ClassValue, clsx } from "clsx";
import { LayoutConfig, ContainerSize } from "./layout";

/**
 * Utility function to merge class names
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Generate responsive container classes from layout configuration
 */
export function createContainerClasses(config: LayoutConfig): string {
  const classes: string[] = [];

  if (config.container) {
    const width = getContainerWidth(config.container);
    classes.push(`max-w-[${width}]`);
  }

  if (config.maxWidth) {
    const width = getContainerWidth(config.maxWidth);
    classes.push(`max-w-[${width}]`);
  }

  if (config.centered !== false) {
    classes.push("mx-auto");
  }

  return classes.join(" ");
}

function getContainerWidth(size: ContainerSize): string {
  const widths: Record<ContainerSize, string> = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
    "5xl": "64rem",
    "7xl": "80rem",
    content: "68ch",
    full: "100%",
  };
  return widths[size];
}

