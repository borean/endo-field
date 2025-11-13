"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
  variant?: "default" | "outline";
}

export function CategoryBadge({ category, className, variant = "default" }: CategoryBadgeProps) {
  if (!category) {
    return null;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-input px-3 py-1 text-sm font-medium",
        variant === "default"
          ? "bg-accent text-white"
          : "bg-transparent border border-border text-text-muted",
        className
      )}
    >
      {category}
    </span>
  );
}

