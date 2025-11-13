"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLighting } from "./LightingProvider";

interface LightingOverlayProps {
  className?: string;
}

export function LightingOverlay({ className }: LightingOverlayProps) {
  const { intensity, isEnabled, lightMode } = useLighting();
  const animationOffset = 0; // Static - no movement

  // Clamp values to prevent out-of-bounds rendering issues
  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty(
        "--light-intensity",
        (intensity / 100).toString()
      );
    }
  }, [intensity]);

  // Animation disabled for now - static lighting
  // useEffect(() => {
  //   if (!isEnabled) return;
  //   // Animation code removed
  // }, [isEnabled]);

  return (
    <>
      {lightMode === "bands" ? (
        <>
      {/* Light Bands - Perspective effect with varying angles for depth */}
      {isEnabled && (
        <div
          className={cn(
            "fixed inset-0 pointer-events-none z-[100]",
            "transition-opacity duration-500",
            "overflow-hidden"
          )}
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: `
              repeating-linear-gradient(
                ${138 + animationOffset * 4}deg,
                rgba(255, 255, 255, ${0.08 * (intensity / 100)}) 0%,
                rgba(255, 255, 255, ${0.15 * (intensity / 100)}) 6%,
                rgba(255, 255, 255, ${0.08 * (intensity / 100)}) 12%,
                transparent 18%
              ),
              repeating-linear-gradient(
                ${132 + animationOffset * 4}deg,
                transparent 0%,
                rgba(255, 255, 255, ${0.06 * (intensity / 100)}) 8%,
                rgba(255, 255, 255, ${0.12 * (intensity / 100)}) 16%,
                rgba(255, 255, 255, ${0.06 * (intensity / 100)}) 24%,
                transparent 32%
              ),
              radial-gradient(
                ellipse 150% 100% at ${clamp(30 + animationOffset * 8, 0, 100)}% ${clamp(20 + animationOffset * 5, 0, 100)}%,
                rgba(255, 255, 255, ${0.1 * (intensity / 100)}) 0%,
                transparent 50%
              ),
              linear-gradient(
                to bottom,
                rgba(255, 255, 255, ${0.12 * (intensity / 100)}) 0%,
                rgba(255, 255, 255, ${0.06 * (intensity / 100)}) 30%,
                rgba(255, 255, 255, ${0.02 * (intensity / 100)}) 60%,
                transparent 100%
              )
            `,
            mixBlendMode: "overlay",
            opacity: isEnabled ? 1 : 0,
            filter: "blur(2px)",
            transform: `perspective(1800px) rotateX(${3 + animationOffset * 1.5}deg) scale(${1.05 + animationOffset * 0.05})`,
            transformOrigin: "center top",
          }}
        />
      )}

      {/* Dark Bands - Perspective shadows with depth */}
      {isEnabled && (
        <div
          className={cn(
            "fixed inset-0 pointer-events-none z-[99]",
            "transition-opacity duration-500",
            "overflow-hidden"
          )}
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: `
              repeating-linear-gradient(
                ${138 + animationOffset * 4}deg,
                transparent 0%,
                rgba(0, 0, 0, ${0.03 * (intensity / 100)}) 6%,
                rgba(0, 0, 0, ${0.08 * (intensity / 100)}) 12%,
                rgba(0, 0, 0, ${0.03 * (intensity / 100)}) 18%,
                transparent 24%
              ),
              repeating-linear-gradient(
                ${132 + animationOffset * 4}deg,
                rgba(0, 0, 0, ${0.02 * (intensity / 100)}) 0%,
                transparent 8%,
                rgba(0, 0, 0, ${0.05 * (intensity / 100)}) 16%,
                transparent 24%,
                rgba(0, 0, 0, ${0.02 * (intensity / 100)}) 32%
              ),
              radial-gradient(
                ellipse 120% 80% at ${clamp(70 - animationOffset * 8, 0, 100)}% ${clamp(80 - animationOffset * 5, 0, 100)}%,
                rgba(0, 0, 0, ${0.06 * (intensity / 100)}) 0%,
                transparent 50%
              ),
              linear-gradient(
                to bottom,
                rgba(0, 0, 0, ${0.08 * (intensity / 100)}) 0%,
                rgba(0, 0, 0, ${0.04 * (intensity / 100)}) 30%,
                rgba(0, 0, 0, ${0.01 * (intensity / 100)}) 60%,
                transparent 100%
              )
            `,
            mixBlendMode: "multiply",
            opacity: isEnabled ? 1 : 0,
            filter: "blur(3px)",
            transform: `perspective(1800px) rotateX(${3 + animationOffset * 1.5}deg) scale(${1.05 + animationOffset * 0.05})`,
            transformOrigin: "center top",
          }}
        />
      )}

      {/* Additional Light Band - Softer highlight with perspective */}
      {isEnabled && (
        <div
          className={cn(
            "fixed inset-0 pointer-events-none z-[98]",
            "transition-opacity duration-500",
            "overflow-hidden"
          )}
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: `
              repeating-linear-gradient(
                ${125 + animationOffset * 3}deg,
                rgba(255, 255, 255, ${0.04 * (intensity / 100)}) 0%,
                rgba(255, 255, 255, ${0.08 * (intensity / 100)}) 10%,
                rgba(255, 255, 255, ${0.04 * (intensity / 100)}) 20%,
                transparent 30%
              ),
              linear-gradient(
                to bottom,
                rgba(255, 255, 255, ${0.06 * (intensity / 100)}) 0%,
                rgba(255, 255, 255, ${0.03 * (intensity / 100)}) 40%,
                transparent 80%
              )
            `,
            mixBlendMode: "soft-light",
            opacity: isEnabled ? 1 : 0,
            filter: "blur(4px)",
            transform: `perspective(2000px) rotateX(${2 + animationOffset * 0.8}deg) scale(${1.03 + animationOffset * 0.04})`,
            transformOrigin: "center top",
          }}
        />
      )}
        </>
      ) : (
        <>
          {/* Window Frame Shadows - Light coming through window at an angle */}
          {isEnabled && (
            <>
              {/* Main window light - bright area from top-left at angle */}
              <div
                className={cn(
                  "fixed inset-0 pointer-events-none z-[100]",
                  "transition-opacity duration-500",
                  "overflow-hidden"
                )}
                style={{
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  background: `
                    linear-gradient(
                      ${135 + animationOffset * 3}deg,
                      rgba(255, 255, 255, ${0.4 * (intensity / 100)}) 0%,
                      rgba(255, 255, 255, ${0.3 * (intensity / 100)}) 15%,
                      rgba(255, 255, 255, ${0.15 * (intensity / 100)}) 30%,
                      rgba(255, 255, 255, ${0.05 * (intensity / 100)}) 50%,
                      transparent 70%
                    )
                  `,
                  mixBlendMode: "overlay",
                  opacity: isEnabled ? 1 : 0,
                  filter: "blur(1px)",
                  transform: `perspective(2000px) rotateY(${-8 + animationOffset * 2}deg) rotateX(${2 + animationOffset * 0.8}deg)`,
                  transformOrigin: "left top",
                }}
              />

              {/* Window frame vertical shadow - left side (angled) */}
              <div
                className={cn(
                  "fixed inset-0 pointer-events-none z-[99]",
                  "transition-opacity duration-500",
                  "overflow-hidden"
                )}
                style={{
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  background: `
                    linear-gradient(
                      ${140 + animationOffset * 3}deg,
                      rgba(0, 0, 0, ${0.15 * (intensity / 100)}) 0%,
                      rgba(0, 0, 0, ${0.25 * (intensity / 100)}) 2%,
                      rgba(0, 0, 0, ${0.15 * (intensity / 100)}) 4%,
                      transparent 6%
                    ),
                    linear-gradient(
                      to bottom,
                      rgba(0, 0, 0, ${0.1 * (intensity / 100)}) 0%,
                      rgba(0, 0, 0, ${0.05 * (intensity / 100)}) 20%,
                      transparent 60%
                    )
                  `,
                  mixBlendMode: "multiply",
                  opacity: isEnabled ? 1 : 0,
                  filter: "blur(2px)",
                  transform: `perspective(2000px) rotateY(${-8 + animationOffset * 2}deg) rotateX(${2 + animationOffset * 0.8}deg) translateX(${8 + animationOffset * 4}%)`,
                  transformOrigin: "left top",
                }}
              />

              {/* Window frame vertical shadow - right side (angled) */}
              <div
                className={cn(
                  "fixed inset-0 pointer-events-none z-[99]",
                  "transition-opacity duration-500",
                  "overflow-hidden"
                )}
                style={{
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  background: `
                    linear-gradient(
                      ${140 + animationOffset * 3}deg,
                      rgba(0, 0, 0, ${0.15 * (intensity / 100)}) 0%,
                      rgba(0, 0, 0, ${0.25 * (intensity / 100)}) 2%,
                      rgba(0, 0, 0, ${0.15 * (intensity / 100)}) 4%,
                      transparent 6%
                    ),
                    linear-gradient(
                      to bottom,
                      rgba(0, 0, 0, ${0.1 * (intensity / 100)}) 0%,
                      rgba(0, 0, 0, ${0.05 * (intensity / 100)}) 20%,
                      transparent 60%
                    )
                  `,
                  mixBlendMode: "multiply",
                  opacity: isEnabled ? 1 : 0,
                  filter: "blur(2px)",
                  transform: `perspective(2000px) rotateY(${-8 + animationOffset * 2}deg) rotateX(${2 + animationOffset * 0.8}deg) translateX(${-8 - animationOffset * 4}%)`,
                  transformOrigin: "right top",
                }}
              />

              {/* Window frame horizontal shadow - top (angled) */}
              <div
                className={cn(
                  "fixed inset-0 pointer-events-none z-[99]",
                  "transition-opacity duration-500",
                  "overflow-hidden"
                )}
                style={{
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  background: `
                    linear-gradient(
                      ${50 + animationOffset * 2}deg,
                      rgba(0, 0, 0, ${0.2 * (intensity / 100)}) 0%,
                      rgba(0, 0, 0, ${0.3 * (intensity / 100)}) 1.5%,
                      rgba(0, 0, 0, ${0.2 * (intensity / 100)}) 3%,
                      transparent 5%
                    ),
                    linear-gradient(
                      ${140 + animationOffset * 3}deg,
                      rgba(0, 0, 0, ${0.08 * (intensity / 100)}) 0%,
                      transparent 15%,
                      transparent 85%,
                      rgba(0, 0, 0, ${0.08 * (intensity / 100)}) 100%
                    )
                  `,
                  mixBlendMode: "multiply",
                  opacity: isEnabled ? 1 : 0,
                  filter: "blur(2px)",
                  transform: `perspective(2000px) rotateY(${-8 + animationOffset * 2}deg) rotateX(${2 + animationOffset * 0.8}deg) translateY(${5 + animationOffset * 2}%)`,
                  transformOrigin: "left top",
                }}
              />

              {/* Window crossbar shadow - angled divider */}
              <div
                className={cn(
                  "fixed inset-0 pointer-events-none z-[99]",
                  "transition-opacity duration-500",
                  "overflow-hidden"
                )}
                style={{
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  background: `
                    linear-gradient(
                      ${50 + animationOffset * 2}deg,
                      transparent 0%,
                      transparent 35%,
                      rgba(0, 0, 0, ${0.15 * (intensity / 100)}) 48%,
                      rgba(0, 0, 0, ${0.25 * (intensity / 100)}) 50%,
                      rgba(0, 0, 0, ${0.15 * (intensity / 100)}) 52%,
                      transparent 65%,
                      transparent 100%
                    ),
                    linear-gradient(
                      ${140 + animationOffset * 3}deg,
                      rgba(0, 0, 0, ${0.05 * (intensity / 100)}) 0%,
                      transparent 12%,
                      transparent 88%,
                      rgba(0, 0, 0, ${0.05 * (intensity / 100)}) 100%
                    )
                  `,
                  mixBlendMode: "multiply",
                  opacity: isEnabled ? 1 : 0,
                  filter: "blur(2px)",
                  transform: `perspective(2000px) rotateY(${-8 + animationOffset * 2}deg) rotateX(${2 + animationOffset * 0.8}deg)`,
                  transformOrigin: "center center",
                }}
              />

              {/* Soft light rays from window (angled) */}
              <div
                className={cn(
                  "fixed inset-0 pointer-events-none z-[98]",
                  "transition-opacity duration-500",
                  "overflow-hidden"
                )}
                style={{
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  background: `
                    repeating-linear-gradient(
                      ${135 + animationOffset * 3}deg,
                      transparent 0%,
                      rgba(255, 255, 255, ${0.03 * (intensity / 100)}) 2%,
                      rgba(255, 255, 255, ${0.06 * (intensity / 100)}) 4%,
                      rgba(255, 255, 255, ${0.03 * (intensity / 100)}) 6%,
                      transparent 8%
                    ),
                    linear-gradient(
                      to bottom,
                      rgba(255, 255, 255, ${0.08 * (intensity / 100)}) 0%,
                      rgba(255, 255, 255, ${0.04 * (intensity / 100)}) 40%,
                      transparent 80%
                    )
                  `,
                  mixBlendMode: "soft-light",
                  opacity: isEnabled ? 1 : 0,
                  filter: "blur(3px)",
                  transform: `perspective(2000px) rotateY(${-8 + animationOffset * 2}deg) rotateX(${2 + animationOffset * 0.8}deg)`,
                  transformOrigin: "left top",
                }}
              />
            </>
          )}
        </>
      )}

    </>
  );
}

