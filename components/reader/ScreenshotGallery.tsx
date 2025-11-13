"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Screenshot } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
  className?: string;
}

export function ScreenshotGallery({ screenshots, className }: ScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const navigate = (direction: "prev" | "next") => {
    if (selectedIndex === null) return;
    if (direction === "prev") {
      setSelectedIndex(
        selectedIndex === 0 ? screenshots.length - 1 : selectedIndex - 1
      );
    } else {
      setSelectedIndex(
        selectedIndex === screenshots.length - 1 ? 0 : selectedIndex + 1
      );
    }
  };

  return (
    <>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
        {screenshots.map((screenshot, index) => (
          <div
            key={index}
            className="relative aspect-video rounded-card overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={screenshot.path}
              alt={screenshot.caption || `Screenshot ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-motion"
            />
            {screenshot.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                {screenshot.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-overlay bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors duration-motion"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6 icon" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("prev");
            }}
            className="absolute left-4 text-white hover:text-accent transition-colors duration-motion"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8 icon" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("next");
            }}
            className="absolute right-4 text-white hover:text-accent transition-colors duration-motion"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8 icon" />
          </button>

          <div
            className="relative max-w-5xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screenshots[selectedIndex].path}
              alt={
                screenshots[selectedIndex].caption ||
                `Screenshot ${selectedIndex + 1}`
              }
              width={1200}
              height={800}
              className="object-contain max-h-[90vh] rounded-card"
            />
            {screenshots[selectedIndex].caption && (
              <p className="text-white text-center mt-4">
                {screenshots[selectedIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

