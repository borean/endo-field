"use client";

import React, { useState, useRef, useEffect } from "react";
import { Moon, Sun, Settings, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { cn } from "@/lib/utils";
import { useLighting } from "./LightingProvider";

interface TopBarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onCategoryFilter?: (category: string | null) => void;
  onSortChange?: (sort: string) => void;
  categories?: string[];
  selectedCategory?: string | null;
  sortMode?: string;
}

export function TopBar({
  searchQuery,
  onSearchChange,
  onCategoryFilter,
  onSortChange,
  categories = [],
  selectedCategory,
  sortMode = "date",
}: TopBarProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const { intensity, setIntensity, isEnabled, setIsEnabled, lightMode, setLightMode } = useLighting();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Close settings panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    if (showSettings) {
      document.addEventListener("mousedown", handleClickOutside as EventListener);
      document.addEventListener("touchstart", handleClickOutside as EventListener);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside as EventListener);
      document.removeEventListener("touchstart", handleClickOutside as EventListener);
    };
  }, [showSettings]);

  return (
    <header className="sticky top-0 z-sticky glass border-b border-border">
      <PageContainer container="xl" padding="md" paddingVariant="page">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-normal text-[#FF6B35] ml-[10px]">Endo—Field</h1>
          </div>

          {/* Theme Toggle & Settings */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-input border border-border bg-surface text-text",
                "hover:bg-code-bg transition-colors duration-motion",
                "focus:outline-none"
              )}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4 icon" />
              ) : (
                <Sun className="h-4 w-4 icon" />
              )}
            </button>
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={cn(
                  "p-2 rounded-input border border-border bg-surface text-text",
                  "hover:bg-code-bg transition-colors duration-motion",
                  "focus:outline-none",
                  showSettings && "bg-code-bg"
                )}
                aria-label="Settings"
              >
                <Settings className="h-4 w-4 icon" />
              </button>

              {/* Settings Panel */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 z-[200] w-80"
                  >
                    <div className="bg-surface border border-border rounded-card shadow-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-input bg-code-bg">
                            <svg
                              className="h-4 w-4 text-text-muted"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-sm font-semibold text-text">Shadows</h3>
                        </div>
                        <button
                          onClick={() => setShowSettings(false)}
                          className="p-1 rounded-input hover:bg-code-bg text-text-muted hover:text-text transition-colors"
                          aria-label="Close settings"
                        >
                          <X className="h-4 w-4 icon" />
                        </button>
                      </div>

                      <p className="text-xs text-text-muted mb-4">
                        Cast shadows onto your desk to add a bit of texture.
                      </p>

                      {/* Light Mode Selector */}
                      <div className="mb-4">
                        <label className="text-xs text-text-muted mb-2 block">
                          Light Mode
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setLightMode("bands")}
                            className={cn(
                              "flex-1 px-3 py-2 rounded-input text-xs font-medium transition-colors",
                              "border",
                              lightMode === "bands"
                                ? "bg-accent text-white border-accent"
                                : "bg-code-bg text-text-muted border-border hover:bg-surface"
                            )}
                          >
                            Bands
                          </button>
                          <button
                            onClick={() => setLightMode("window")}
                            className={cn(
                              "flex-1 px-3 py-2 rounded-input text-xs font-medium transition-colors",
                              "border",
                              lightMode === "window"
                                ? "bg-accent text-white border-accent"
                                : "bg-code-bg text-text-muted border-border hover:bg-surface"
                            )}
                          >
                            Window
                          </button>
                        </div>
                      </div>

                      {/* Toggle Switch */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-text-muted">Enable</span>
                        <button
                          onClick={() => setIsEnabled(!isEnabled)}
                          className={cn(
                            "relative w-11 h-6 rounded-full transition-colors duration-motion",
                            "focus:outline-none",
                            isEnabled ? "bg-accent" : "bg-code-bg"
                          )}
                          aria-label="Toggle shadows"
                        >
                          <motion.div
                            className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                            animate={{ x: isEnabled ? 20 : 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        </button>
                      </div>

                      {/* Intensity Slider */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-text-muted">Intensity</span>
                          <span className="text-xs text-text-muted font-mono">
                            {intensity}%
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={intensity}
                            onChange={(e) => setIntensity(Number(e.target.value))}
                            className="w-full h-2 bg-code-bg rounded-full appearance-none cursor-pointer accent-accent"
                            style={{
                              background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${intensity}%, var(--code-bg) ${intensity}%, var(--code-bg) 100%)`,
                            }}
                            disabled={!isEnabled}
                          />
                          <div className="absolute right-0 top-1/2 -translate-y-1/2">
                            <button
                              className="p-1 rounded-input hover:bg-code-bg text-text-muted hover:text-text transition-colors"
                              aria-label="Randomize"
                              onClick={() => {
                                setIntensity(Math.floor(Math.random() * 40) + 40);
                              }}
                            >
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </PageContainer>
    </header>
  );
}

