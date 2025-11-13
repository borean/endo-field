"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LiftedFolderProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

export function LiftedFolder({ isOpen, children, className }: LiftedFolderProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn("relative z-20", className)}
          initial={{
            scale: 1,
            translateY: 0,
            rotateX: 6,
            opacity: 0,
          }}
          animate={{
            scale: 1.08,
            translateY: -24,
            rotateX: 0,
            opacity: 1,
          }}
          exit={{
            scale: 1,
            translateY: 0,
            rotateX: 6,
            opacity: 0,
          }}
          transition={{
            duration: 0.28,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          style={{
            perspective: 1000,
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

