"use client";

import React, { useState, useMemo } from "react";
import { DrawerBackground } from "./DrawerBackground";
import { FolderUnibody } from "./FolderUnibody";
import { Section } from "@/components/layout/Section";
import { Note } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DrawerSceneProps {
  notes: Note[];
  allNotes?: Note[]; // Unfiltered notes for accurate counts
  activeCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  onNoteSelect: (note: Note) => void;
  className?: string;
}

export function DrawerScene({
  notes,
  allNotes,
  activeCategory,
  onCategorySelect,
  onNoteSelect,
  className,
}: DrawerSceneProps) {
  const [isLifted, setIsLifted] = useState(false);
  const [frontFolder, setFrontFolder] = useState<string | null>(null);

  // Group all notes by category (use allNotes if provided, otherwise notes)
  const allGroupedNotes = useMemo(() => {
    const notesToGroup = allNotes || notes;
    const grouped: Record<string, Note[]> = {};
    notesToGroup.forEach((note) => {
      const category = note.category || "Misc";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(note);
    });
    return grouped;
  }, [allNotes, notes]);

  // Define 4 main folders with staggered left ear positions
  const folderConfig = [
    { category: "Adrenal", leftOffset: "0rem" },      // leftmost
    { category: "Growth", leftOffset: "10rem" },      // left
    { category: "Genetics", leftOffset: "20rem" },    // center-left
    { category: "Thyroid", leftOffset: "30rem" },     // center
  ];

  // Categories with their notes (always use full unfiltered list)
  const categories = useMemo(() => {
    return folderConfig.map(({ category, leftOffset }) => ({
      name: category,
      notes: allGroupedNotes[category] || [],
      leftOffset,
    }));
  }, [allGroupedNotes]);

  const handleCategoryToggle = (category: string | null) => {
    if (activeCategory === category) {
      onCategorySelect(null);
      setFrontFolder(null);
    } else {
      onCategorySelect(category);
      setFrontFolder(category);
    }
    setIsLifted(false);
  };

  const handlePrevTab = () => {
    const currentIndex = categories.findIndex(cat => cat.name === frontFolder);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
    const prevCategory = categories[prevIndex].name;
    onCategorySelect(prevCategory);
    setFrontFolder(prevCategory);
  };

  const handleNextTab = () => {
    const currentIndex = categories.findIndex(cat => cat.name === frontFolder);
    const nextIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
    const nextCategory = categories[nextIndex].name;
    onCategorySelect(nextCategory);
    setFrontFolder(nextCategory);
  };

  const handleNoteClick = (note: Note) => {
    setIsLifted(true);
    setTimeout(() => {
      onNoteSelect(note);
    }, 300);
  };

  return (
    <div 
      className={cn("relative h-full overflow-hidden", className)}
      style={{ touchAction: 'none', overscrollBehavior: 'none' }}
    >
      <DrawerBackground isBlurred={isLifted} />

      <div 
        className="relative z-10 h-full overflow-hidden"
        style={{ touchAction: 'none', overscrollBehavior: 'none' }}
      >
        <Section spacing="xl" padding="lg" className="h-full">
          <div className="max-w-4xl mx-auto h-full overflow-y-auto relative pt-4">
            {/* Filing cabinet - all folders stacked with visible tabs */}
            <div className="relative">
              {/* All left ears (tabs) visible - staggered horizontally, same vertical position */}
              {categories.map(({ name, leftOffset }, index) => {
                const isActive = frontFolder === name;
                const noteCount = allGroupedNotes[name]?.length || 0;
                // Active tabs extend 1px over body (48 base + 1)
                // Inactive tabs extend 20px over body (48 base + 20)
                const tabHeight = isActive ? "49px" : "68px";

                return (
                  <div
                    key={`tab-${name}`}
                    className="absolute"
                    style={{
                      zIndex: isActive ? 200 : 120, // Active tab highest, inactive tabs above inactive bodies but below active body
                      top: 0,
                      left: leftOffset,
                      pointerEvents: "auto",
                    }}
                  >
                    {/* Left ear (tab) - always visible */}
                    <button
                      onClick={() => handleCategoryToggle(name)}
                      className={cn(
                        "drawer-tab",
                        "w-[140px]",
                        "px-6 pt-3 pb-2 rounded-t-card",
                        "bg-surface",
                        "flex items-start",
                        "transition-colors duration-motion",
                        "cursor-pointer hover:bg-code-bg",
                        "focus:outline-none",
                        isActive ? "text-text" : "text-text-muted opacity-60"
                      )}
                      style={{ height: tabHeight }}
                      data-active={isActive}
                      aria-label={`${isActive ? "Close" : "Open"} ${name} folder`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{name}</span>
                        <span className="text-xs font-mono">
                          ({noteCount})
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}

              {/* Folder bodies - overlap at same position */}
              {categories.map(({ name, notes: folderNotes }, index) => {
                const isActive = frontFolder === name;
                const baseZIndex = categories.length - index;
                const isLeftmost = index === 0;
                
                return (
                  <div 
                    key={`body-${name}`}
                    className="absolute"
                    style={{ 
                      zIndex: isActive ? 150 : baseZIndex, // Active body above inactive tabs (120) but below active tab (200)
                      top: 0, // Same Y position as left ears
                      left: 0,
                      right: 0,
                      display: isActive ? 'block' : 'none', // Only show active folder body
                      pointerEvents: 'none', // Allow clicks to pass through to tabs behind
                    }}
                  >
            <FolderUnibody
              category={name}
              notes={folderNotes}
              isActive={activeCategory === name}
              onClick={() => handleCategoryToggle(name)}
              onNoteClick={handleNoteClick}
                      tabPosition="left"
                      zIndex={isActive ? 100 : baseZIndex}
                      hideTab={true}
                      onPrevTab={handlePrevTab}
                      onNextTab={handleNextTab}
                      roundTopLeftCorner={!isLeftmost}
            />
                  </div>
                );
              })}
            </div>
        </div>
      </Section>
      </div>
    </div>
  );
}

