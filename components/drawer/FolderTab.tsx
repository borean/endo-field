"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CategoryBadge } from "@/components/common/CategoryBadge";

interface FolderTabProps {
  category: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export function FolderTab({
  category,
  count,
  isActive,
  onClick,
  className,
}: FolderTabProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative px-6 py-4 rounded-t-card",
        "bg-surface border border-b-0 border-border",
        "text-left transition-all duration-motion",
        "focus:outline-none",
        isActive && "bg-surface shadow-lg z-10",
        className
      )}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      initial={false}
      aria-label={`Open ${category} folder`}
      aria-pressed={isActive}
      role="tab"
    >
      <div className="flex items-center justify-between gap-3">
        <CategoryBadge category={category} />
        <span className="text-sm text-text-muted font-mono">{count}</span>
      </div>
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-accent"
          layoutId="activeTab"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </motion.button>
  );
}

