"use client";

import React from "react";
import { FolderTab } from "./FolderTab";
import { cn } from "@/lib/utils";

interface FolderRowProps {
  categories: Array<{ name: string; count: number }>;
  activeCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  className?: string;
}

export function FolderRow({
  categories,
  activeCategory,
  onCategorySelect,
  className,
}: FolderRowProps) {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-2",
        "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
        className
      )}
      role="tablist"
      aria-label="Note categories"
    >
      <FolderTab
        category="All"
        count={categories.reduce((sum, cat) => sum + cat.count, 0)}
        isActive={activeCategory === null}
        onClick={() => onCategorySelect(null)}
      />
      {categories.map(({ name, count }) => (
        <FolderTab
          key={name}
          category={name}
          count={count}
          isActive={activeCategory === name}
          onClick={() => onCategorySelect(name)}
        />
      ))}
    </div>
  );
}

