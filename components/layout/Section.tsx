"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLayout } from "./LayoutProvider";
import { ContainerSize, SpacingSize, PaddingSize } from "@/lib/layout";

interface SectionProps {
  children: ReactNode;
  id?: string;
  container?: ContainerSize;
  maxWidth?: ContainerSize;
  centered?: boolean;
  applySpacing?: boolean;
  spacing?: "none" | SpacingSize;
  spacingTop?: "none" | SpacingSize;
  variant?: "default" | "surface" | "muted" | "transparent";
  padding?: PaddingSize | "none";
  className?: string;
}

export function Section({
  children,
  id,
  container,
  maxWidth,
  centered = true,
  applySpacing = true,
  spacing = "lg",
  spacingTop,
  variant = "default",
  padding = "none",
  className,
}: SectionProps) {
  const { defaultContainer, defaultMaxWidth, defaultSpacing } = useLayout();

  const containerSize = container || defaultContainer;
  const maxWidthSize = maxWidth || defaultMaxWidth;
  const spacingSize = spacing === "none" ? "none" : spacing || defaultSpacing || "lg";
  const topSpacingSize = spacingTop !== undefined ? spacingTop : spacingSize;

  const sectionClasses = cn(
    "w-full",
    centered && (containerSize || maxWidthSize) && "mx-auto",
    maxWidthSize && `max-w-[${getContainerWidth(maxWidthSize)}]`,
    !maxWidthSize && containerSize && `max-w-[${getContainerWidth(containerSize)}]`,
    applySpacing && spacingSize !== "none" && getSpacingClasses(spacingSize, topSpacingSize),
    padding !== "none" && getPaddingClasses(padding),
    getVariantClasses(variant),
    className
  );

  return (
    <section id={id} className={sectionClasses}>
      {children}
    </section>
  );
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

function getSpacingClasses(bottomSize: SpacingSize, topSize: SpacingSize | "none"): string {
  const bottomSpacing: Record<SpacingSize, string> = {
    xs: "mb-2",
    sm: "mb-4",
    md: "mb-6",
    lg: "mb-8",
    xl: "mb-12",
    "2xl": "mb-16",
    "3xl": "mb-24",
  };
  
  const topSpacing: Record<SpacingSize, string> = {
    xs: "mt-2",
    sm: "mt-4",
    md: "mt-6",
    lg: "mt-8",
    xl: "mt-12",
    "2xl": "mt-16",
    "3xl": "mt-24",
  };
  
  const bottomClass = bottomSpacing[bottomSize];
  const topClass = topSize === "none" ? "" : topSpacing[topSize];
  
  return cn(bottomClass, topClass);
}

function getPaddingClasses(size: PaddingSize): string {
  const padding: Record<PaddingSize, string> = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-12",
  };
  return padding[size];
}

function getVariantClasses(variant: "default" | "surface" | "muted" | "transparent"): string {
  const variants = {
    default: "",
    surface: "bg-surface rounded-card",
    muted: "bg-code-bg rounded-card",
    transparent: "",
  };
  return variants[variant];
}

