"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DrawerBackgroundProps {
  isBlurred: boolean;
  className?: string;
}

export function DrawerBackground({ isBlurred, className }: DrawerBackgroundProps) {
  return (
    <motion.div
      className={cn("fixed inset-0 bg-bg", className)}
      animate={{
        filter: isBlurred ? "blur(8px)" : "blur(0px)",
        brightness: isBlurred ? 0.85 : 1,
      }}
      transition={{
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        zIndex: 0,
      }}
    />
  );
}

