"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLayout } from "./LayoutProvider";
import { ContainerSize, PaddingSize } from "@/lib/layout";

interface PageContainerProps {
  children: ReactNode;
  container?: ContainerSize;
  maxWidth?: ContainerSize;
  centered?: boolean;
  applyPadding?: boolean;
  paddingVariant?: "page" | "section" | "card";
  padding?: PaddingSize | "none";
  className?: string;
}

export function PageContainer({
  children,
  container,
  maxWidth,
  centered = true,
  applyPadding = true,
  paddingVariant = "page",
  padding,
  className,
}: PageContainerProps) {
  const { defaultContainer, defaultMaxWidth, defaultPadding } = useLayout();

  const containerSize = container || defaultContainer || "xl";
  const maxWidthSize = maxWidth || defaultMaxWidth;
  const paddingSize = padding || defaultPadding || "lg";

  const containerClasses = cn(
    "w-full",
    centered && "mx-auto",
    maxWidthSize && `max-w-[${getContainerWidth(maxWidthSize)}]`,
    !maxWidthSize && `max-w-[${getContainerWidth(containerSize)}]`,
    applyPadding && padding !== "none" && getPaddingClasses(paddingVariant, paddingSize),
    className
  );

  return <div className={containerClasses}>{children}</div>;
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

function getPaddingClasses(variant: "page" | "section" | "card", size: PaddingSize): string {
  if (variant === "page") {
    return `px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8`;
  }
  if (variant === "section") {
    return `px-6 py-6 md:px-8 md:py-8 lg:px-12 lg:py-12`;
  }
  // card variant
  const cardPadding: Record<PaddingSize, string> = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-12",
  };
  return cardPadding[size];
}

