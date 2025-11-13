"use client";

import React, { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DrawerBackground } from "./DrawerBackground";
import { FolderUnibody } from "./FolderUnibody";
import { WelcomeCard } from "./WelcomeCard";
import { Section } from "@/components/layout/Section";
import { Note } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DrawerSceneProps {
  notes: Note[];
  allNotes?: Note[]; // Unfiltered notes for accurate counts
  activeCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  onNoteSelect: (note: Note) => void;
  selectedNote: Note | null;
  onNoteDeselect: () => void;
  className?: string;
}

export function DrawerScene({
  notes,
  allNotes,
  activeCategory,
  onCategorySelect,
  onNoteSelect,
  selectedNote,
  onNoteDeselect,
  className,
}: DrawerSceneProps) {
  const [isLifted, setIsLifted] = useState(false);
  const [frontFolder, setFrontFolder] = useState<string | null>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(0);

  // Track viewport width for collision detection
  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };
    
    // Set initial width
    updateViewportWidth();
    
    // Listen for resize events
    window.addEventListener('resize', updateViewportWidth);
    
    return () => {
      window.removeEventListener('resize', updateViewportWidth);
    };
  }, []);

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

  // Define 5 main folders with default staggered left ear positions
  const folderConfig = [
    { category: "Adrenal", defaultOffset: 0 },      // leftmost
    { category: "Growth", defaultOffset: 10 },      // left
    { category: "Genetics", defaultOffset: 20 },    // center-left
    { category: "Thyroid", defaultOffset: 30 },     // center
    { category: "Pituitary", defaultOffset: 40 },   // center-right
  ];

  // Calculate left ear positions based on available viewport width
  // Left ear width: 140px, Right ear width: 170px
  // Convert rem to px (assuming 1rem = 16px)
  const LEFT_EAR_WIDTH = 140;
  const RIGHT_EAR_WIDTH = 170;
  const REM_TO_PX = 16;
  const MIN_TAB_SPACING = 8; // Minimum spacing between tabs in px

  // Calculate available width for left ears
  // When no tab is selected: use full unibody width (no right ear visible)
  // When tab is selected: unibody width - right ear width - 20px gap
  const MIN_GAP_FROM_RIGHT_EAR = 20;
  const availableWidth = useMemo(() => {
    if (viewportWidth === 0) return 896; // Default to max-w-4xl (896px) if not initialized
    
    // Get the container width (max-w-4xl = 56rem = 896px, but account for padding)
    // Section padding: lg = 2rem = 32px on each side
    const containerPadding = 64; // 32px on each side
    const containerWidth = Math.min(viewportWidth - containerPadding, 896);
    
    // If no tab is selected, use full container width (right ear not visible)
    if (!frontFolder) {
      return containerWidth;
    }
    
    // If tab is selected, reserve space for right ear + gap
    return containerWidth - RIGHT_EAR_WIDTH - MIN_GAP_FROM_RIGHT_EAR;
  }, [viewportWidth, frontFolder]);

  // Calculate left ear positions, prioritizing active tab at leftmost when constrained
  const categories = useMemo(() => {
    const activeIndex = frontFolder 
      ? folderConfig.findIndex(f => f.category === frontFolder)
      : -1;

    // Check if all default positions fit within available width (with 20px gap requirement)
    const rightmostDefaultPx = folderConfig[folderConfig.length - 1].defaultOffset * REM_TO_PX;
    const rightmostRightEdge = rightmostDefaultPx + LEFT_EAR_WIDTH;
    const allTabsFit = rightmostRightEdge <= availableWidth;

    // If all tabs fit, use default positions
    if (allTabsFit) {
      return folderConfig.map(({ category, defaultOffset }) => ({
        name: category,
        notes: allGroupedNotes[category] || [],
        leftOffset: `${defaultOffset * REM_TO_PX}px`,
      }));
    }

    // If constrained, check if we can fit tabs with active at leftmost
    // Calculate the rightmost position if we place active at 0 and distribute others
    const numTabs = folderConfig.length;
    const totalTabWidth = numTabs * LEFT_EAR_WIDTH;
    const totalSpacing = Math.max(0, numTabs - 1) * MIN_TAB_SPACING;
    const requiredWidth = totalTabWidth + totalSpacing;
    
    // If we can't fit all tabs even with minimum spacing, distribute equally
    const needsEqualDistribution = requiredWidth > availableWidth;

    if (needsEqualDistribution) {
      // Distribute all tabs equally across available width
      const spacing = (availableWidth - totalTabWidth) / Math.max(1, numTabs - 1);
      
      return folderConfig.map(({ category }, index) => {
        const leftPosition = index * (LEFT_EAR_WIDTH + spacing);
        return {
          name: category,
          notes: allGroupedNotes[category] || [],
          leftOffset: `${Math.max(0, leftPosition)}px`,
        };
      });
    }

    // If we can fit, prioritize active tab at leftmost, others distribute to the right
    return folderConfig.map(({ category }, index) => {
      if (index === activeIndex) {
        // Active tab at leftmost
        return {
          name: category,
          notes: allGroupedNotes[category] || [],
          leftOffset: "0px",
        };
      }

      // Calculate position for non-active tabs
      // Get all non-active tabs in their original order
      const nonActiveTabs = folderConfig
        .map((f, i) => ({ category: f.category, originalIndex: i }))
        .filter((_, i) => i !== activeIndex);
      
      const nonActiveIndex = nonActiveTabs.findIndex(n => n.category === category);
      
      // Start after active tab (if exists) or from 0
      const startLeft = activeIndex >= 0 ? LEFT_EAR_WIDTH + MIN_TAB_SPACING : 0;
      
      // Calculate how many tabs we need to fit (excluding active)
      const numNonActiveTabs = folderConfig.length - (activeIndex >= 0 ? 1 : 0);
      
      // Calculate spacing between non-active tabs
      const totalNonActiveTabWidth = numNonActiveTabs * LEFT_EAR_WIDTH;
      const availableForNonActive = availableWidth - startLeft;
      const spacing = Math.max(
        MIN_TAB_SPACING,
        (availableForNonActive - totalNonActiveTabWidth) / Math.max(1, numNonActiveTabs - 1)
      );
      
      // Position this tab
      const leftPosition = startLeft + (nonActiveIndex * (LEFT_EAR_WIDTH + spacing));
      
      // Ensure we don't go past available width (with 20px gap from right ear)
      const finalLeft = Math.min(leftPosition, availableWidth - LEFT_EAR_WIDTH);
      
      return {
        name: category,
        notes: allGroupedNotes[category] || [],
        leftOffset: `${Math.max(0, finalLeft)}px`,
      };
    });
  }, [allGroupedNotes, availableWidth, frontFolder]);

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

  const handleNoteDeselect = () => {
    setIsLifted(false);
    onNoteDeselect();
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    // If a folder is open and we click outside the folder unibody, close it
    if (frontFolder) {
      const target = e.target as HTMLElement;
      // Check if click is on a tab button (should toggle, not close)
      const isTabButton = target.closest('button[data-active]');
      // Check if click is inside the folder unibody (content or container)
      const isFolderUnibody = target.closest('[data-folder-unibody]');
      
      // If click is not on a tab and not on folder unibody, close the folder
      if (!isTabButton && !isFolderUnibody) {
        handleCategoryToggle(null);
      }
    }
  };

  return (
    <div 
      className={cn("relative h-full overflow-hidden", className)}
      style={{ touchAction: 'none', overscrollBehavior: 'none' }}
      onClick={handleClickOutside}
    >
      <DrawerBackground isBlurred={isLifted} />

      <div 
        className="relative z-10 h-full overflow-hidden"
        style={{ touchAction: 'none', overscrollBehavior: 'none' }}
      >
        <Section spacing="xl" spacingTop="none" padding="lg" className="h-full">
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

                // Calculate z-index based on distance from active tab
                // Active tab: highest (200)
                // Adjacent tabs: next highest, decreasing with distance
                let tabZIndex = 120; // Default for inactive tabs
                if (isActive) {
                  tabZIndex = 200; // Active tab highest
                } else if (frontFolder) {
                  // Find the active tab index
                  const activeIndex = categories.findIndex(cat => cat.name === frontFolder);
                  if (activeIndex >= 0) {
                    // Calculate distance from active tab
                    const distance = Math.abs(index - activeIndex);
                    // Closest tabs (distance 1) get 190, then decrease by 10 for each step
                    // Minimum is 120 to stay above inactive bodies
                    tabZIndex = Math.max(120, 200 - (distance * 10));
                  }
                }

                // Convert leftOffset string (e.g., "140px") to number for animation
                const leftOffsetNum = parseFloat(leftOffset) || 0;

                return (
                  <motion.div
                    key={`tab-${name}`}
                    className="absolute"
                    style={{
                      zIndex: tabZIndex,
                      top: 0,
                      pointerEvents: "auto",
                    }}
                    initial={false}
                    animate={{
                      x: leftOffsetNum,
                    }}
                    transition={{
                      duration: 0.12,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    {/* Left ear (tab) - always visible */}
                    <button
                      onClick={() => handleCategoryToggle(name)}
                      className={cn(
                        "drawer-tab",
                        "w-[140px]",
                        "px-6 pt-3 pb-2 rounded-t-card",
                        isActive ? "bg-surface" : "bg-code-bg",
                        "flex items-start",
                        "transition-colors duration-motion",
                        "cursor-pointer hover:bg-code-bg",
                        "focus:outline-none",
                        isActive ? "text-text" : "text-text-muted"
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
                  </motion.div>
                );
              })}

              {/* Folder bodies - overlap at same position */}
              {categories.map(({ name, notes: folderNotes, leftOffset }, index) => {
                const isActive = frontFolder === name;
                const baseZIndex = categories.length - index;
                const isLeftmost = index === 0;
                // Check if this active tab is at the leftmost position (0px)
                const isAtLeftmost = isActive && leftOffset === "0px";
                
                return (
                  <div 
                    key={`body-${name}`}
                    className="absolute"
                    style={{ 
                      zIndex: isActive ? 195 : baseZIndex, // Active body just below active tab (200) and right ear, above all inactive tabs (max 190)
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
              selectedNote={selectedNote}
              onNoteDeselect={handleNoteDeselect}
                      tabPosition="left"
                      zIndex={isActive ? 195 : baseZIndex}
                      hideTab={true}
                      onPrevTab={handlePrevTab}
                      onNextTab={handleNextTab}
                      roundTopLeftCorner={!isAtLeftmost && !isLeftmost}
            />
                  </div>
                );
              })}

              {/* Welcome card - shown when no folder is selected */}
              <AnimatePresence>
                {!frontFolder && (
                  <div
                    className="absolute"
                    style={{
                      zIndex: 150,
                      top: 0,
                      left: 0,
                      right: 0,
                      pointerEvents: 'none', // Allow clicks to pass through to tabs behind
                    }}
                  >
                    <WelcomeCard />
                  </div>
                )}
              </AnimatePresence>
            </div>
        </div>
      </Section>
      </div>
    </div>
  );
}

