"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WelcomeCardProps {
  className?: string;
}

export function WelcomeCard({ className }: WelcomeCardProps) {
  const bodyBoxShadow = "inset 0 0 0 1px var(--border)";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "absolute top-0 left-0 right-0",
        "card rounded-card p-8",
        "bg-surface",
        className
      )}
      style={{ 
        marginTop: "48px", // Align with tab height
        pointerEvents: "none", // Allow clicks to pass through to tabs
        boxShadow: bodyBoxShadow,
      }}
    >
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-text tracking-tight mb-4">
            Welcome to <span className="whitespace-nowrap">Endo—Field</span>
          </h1>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            A personal pediatric endocrinology notes collection — organized like a precision instrument.
          </p>
          <p className="text-text-muted leading-relaxed">
            Select a folder tab above to explore notes organized by category. Each folder contains clinical notes with overviews, explainers, sources, and visual references.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

