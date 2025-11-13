"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TagChipsProps {
  tags: string[];
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: (tag: string) => void;
}

export function TagChips({ tags, className, size = "md", onClick }: TagChipsProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={cn(
            "inline-flex items-center rounded-input bg-code-bg text-text-muted font-mono",
            sizeClasses[size],
            onClick && "cursor-pointer hover:bg-accent hover:text-white transition-colors duration-motion"
          )}
          onClick={() => onClick?.(tag)}
          role={onClick ? "button" : undefined}
          tabIndex={onClick ? 0 : undefined}
          onKeyDown={(e) => {
            if (onClick && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              onClick(tag);
            }
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

