"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Maximize2, Minimize2, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Note } from "@/lib/types";
import { CategoryBadge } from "@/components/common/CategoryBadge";
import { TagChips } from "@/components/common/TagChips";
import { SourceCitations } from "@/components/reader/SourceCitations";
import { cn } from "@/lib/utils";

interface FolderUnibodyProps {
  category: string;
  notes: Note[];
  isActive: boolean;
  onClick: () => void;
  onNoteClick: (note: Note) => void;
  className?: string;
  tabPosition?: "left" | "right" | "center";
  zIndex?: number;
  hideTab?: boolean;
  onPrevTab?: () => void;
  onNextTab?: () => void;
  roundTopLeftCorner?: boolean;
}

export function FolderUnibody({
  category,
  notes,
  isActive,
  onClick,
  onNoteClick,
  className,
  tabPosition = "left",
  zIndex,
  hideTab = false,
  onPrevTab,
  onNextTab,
  roundTopLeftCorner = false,
}: FolderUnibodyProps) {
  const [isMaximized, setIsMaximized] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = React.useState<number | null>(null);
  const earTextClass = isActive ? "text-text" : "text-text-muted opacity-60";
  const bodyBoxShadow = "inset 0 0 0 1px var(--border)";

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isActive) {
      onClick(); // Close the folder if it's open
    }
  };

  const handleInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInfo(!showInfo);
  };

  const handlePrevTab = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPrevTab) {
      onPrevTab();
    }
  };

  const handleNextTab = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNextTab) {
      onNextTab();
    }
  };

  const handleNoteClickInternal = (note: Note, index: number) => {
    setSelectedNoteIndex(index);
    onNoteClick(note);
  };

  return (
    <div
      className={cn(
        "relative",
        "overflow-hidden",
        "transition-all duration-motion",
        isActive && "shadow-lg",
        className
      )}
      style={{ zIndex }}
    >
      {/* Unibody Folder Header with Two Separate Ears */}
      <div 
        className={cn(
          "relative flex items-start overflow-visible",
          "pointer-events-none"
        )}
        style={{ height: "48px" }}
      >
        {/* Title Tab - Left or Right Positioned - Only show if not hidden */}
        {!hideTab && tabPosition === "left" && (
          <button
            onClick={onClick}
            className={cn(
              "drawer-tab",
              "absolute left-0 top-0",
              "w-[200px] px-6 pt-3 pb-2 rounded-t-card",
              "bg-surface",
              "z-20 flex items-start",
              "transition-all duration-motion",
              "pointer-events-auto",
              "cursor-pointer hover:bg-code-bg",
              "focus:outline-none",
              earTextClass
            )}
            style={{
              height: isActive ? "49px" : "68px",
            }}
            data-active={isActive}
            aria-label={`${isActive ? "Close" : "Open"} ${category} folder`}
            aria-expanded={isActive}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{category}</span>
              <span className="text-xs text-text-muted font-mono">
                ({notes.length})
              </span>
            </div>
          </button>
        )}
        {!hideTab && tabPosition === "center" && (
          <button
            onClick={onClick}
            className={cn(
              "drawer-tab",
              "absolute top-0",
              "w-[200px] px-6 pt-3 pb-2 rounded-t-card",
              "bg-surface",
              "z-20 flex items-start",
              "transition-all duration-motion",
              "pointer-events-auto",
              "cursor-pointer hover:bg-code-bg",
              "focus:outline-none",
              earTextClass
            )}
            style={{
              right: "calc(50% - 100px)", // Position in center-right area
              height: isActive ? "49px" : "68px",
            }}
            data-active={isActive}
            aria-label={`${isActive ? "Close" : "Open"} ${category} folder`}
            aria-expanded={isActive}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{category}</span>
              <span className="text-xs text-text-muted font-mono">
                ({notes.length})
              </span>
            </div>
          </button>
        )}
        {!hideTab && tabPosition === "right" && (
          <button
            onClick={onClick}
            className={cn(
              "drawer-tab",
              "absolute top-0 right-0",
              "w-[200px] px-6 pt-3 pb-2 rounded-t-card",
              "bg-surface",
              "z-20 flex items-start",
              "transition-all duration-motion",
              "pointer-events-auto",
              "cursor-pointer hover:bg-code-bg",
              "focus:outline-none",
              earTextClass
            )}
            style={{
              height: isActive ? "49px" : "68px",
            }}
            data-active={isActive}
            aria-label={`${isActive ? "Close" : "Open"} ${category} folder`}
            aria-expanded={isActive}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{category}</span>
              <span className="text-xs text-text-muted font-mono">
                ({notes.length})
              </span>
            </div>
          </button>
        )}

        {/* Right Ear - Navigation and Action Buttons */}
        <div
          className={cn(
            "drawer-tab",
            "absolute right-0 top-0",
            "w-[170px] px-3 pt-2 pb-1 rounded-t-card",
            "bg-surface",
            "z-20 flex items-start justify-end gap-1",
            "transition-all duration-motion",
            "pointer-events-auto"
          )}
          style={{
            height: isActive ? "49px" : "68px",
          }}
          data-active={isActive}
        >
          {/* Tab Navigation Buttons */}
              <button
            onClick={handlePrevTab}
                className={cn(
                  "p-1.5 rounded-input",
                  "text-text-muted hover:text-text hover:bg-code-bg",
                  "transition-colors duration-motion",
              "focus:outline-none"
                )}
            aria-label="Previous folder"
              >
                <ChevronLeft className="h-3.5 w-3.5 icon" />
              </button>
              <button
            onClick={handleNextTab}
                className={cn(
                  "p-1.5 rounded-input",
                  "text-text-muted hover:text-text hover:bg-code-bg",
                  "transition-colors duration-motion",
              "focus:outline-none"
                )}
            aria-label="Next folder"
              >
                <ChevronRight className="h-3.5 w-3.5 icon" />
              </button>

          {/* Action Buttons */}
          <button
            onClick={handleInfo}
            className={cn(
              "p-1.5 rounded-input",
              "text-text-muted hover:text-text hover:bg-code-bg",
              "transition-colors duration-motion",
              "focus:outline-none",
              showInfo && "text-accent bg-code-bg"
            )}
            aria-label="Show info"
          >
            <Info className="h-3.5 w-3.5 icon" />
          </button>
          <button
            onClick={handleMaximize}
            className={cn(
              "p-1.5 rounded-input",
              "text-text-muted hover:text-text hover:bg-code-bg",
              "transition-colors duration-motion",
              "focus:outline-none"
            )}
            aria-label={isMaximized ? "Minimize" : "Maximize"}
          >
            {isMaximized ? (
              <Minimize2 className="h-3.5 w-3.5 icon" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5 icon" />
            )}
          </button>
          <button
            onClick={handleClose}
            className={cn(
              "p-1.5 rounded-input",
              "text-text-muted hover:text-danger hover:bg-code-bg",
              "transition-colors duration-motion",
              "focus:outline-none"
            )}
            aria-label="Close folder"
          >
            <X className="h-3.5 w-3.5 icon" />
          </button>
        </div>

        {/* Middle section - NOT connected, completely open to show background */}
        {/* No div here - completely transparent, showing background through */}
      </div>

      {/* Folder Content - visible when active */}
      <motion.div
        initial={false}
        animate={{
          height: isActive ? (isMaximized ? "auto" : "400px") : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "pointer-events-none overflow-hidden bg-surface rounded-b-card",
          roundTopLeftCorner && "rounded-tl-card"
        )}
        style={{
          boxShadow: bodyBoxShadow,
        }}
      >
        {/* Click-through zone for background tabs (do not intercept clicks) */}
        <div style={{ height: "20px", pointerEvents: "none" }} />

        <div
          className="pointer-events-auto p-6 space-y-4 overflow-y-auto"
          style={{ maxHeight: isMaximized ? "none" : "400px" }}
        >
          {notes.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-4">
              No notes in this folder
            </p>
          ) : (
            notes.map((note, index) => (
              <motion.div
                key={note.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNoteClickInternal(note, index);
                }}
                className={cn(
                  "p-4 rounded-input border border-border",
                  "bg-code-bg/50 hover:bg-code-bg",
                  "cursor-pointer transition-all duration-motion",
                  "hover:border-accent/50 hover:shadow-sm"
                )}
              >
                <h3 className="text-base font-semibold mb-2 text-text">
                  {note.title}
                </h3>
                {note.explainer && (
                  <p className="text-sm text-text-muted mb-3 line-clamp-2">
                    {note.explainer}
                  </p>
                )}
                {note.tags && note.tags.length > 0 && (
                  <TagChips tags={note.tags.slice(0, 4)} size="sm" />
                )}
                {showInfo && note.sources && note.sources.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 pt-3 border-t border-border"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SourceCitations sources={note.sources} compact />
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
