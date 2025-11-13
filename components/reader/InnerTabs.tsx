"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Note } from "@/lib/types";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import { SourceCitations } from "./SourceCitations";
import { ScreenshotGallery } from "./ScreenshotGallery";
import { cn } from "@/lib/utils";

interface InnerTabsProps {
  note: Note;
  mdxContent: MDXRemoteSerializeResult;
  className?: string;
  showInfo?: boolean;
}

type TabId = "overview" | "explainer" | "sources" | "screenshots" | "unknowns";

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "explainer", label: "Explainer" },
  { id: "sources", label: "Sources" },
  { id: "screenshots", label: "Screenshots" },
  { id: "unknowns", label: "Unknowns" },
];

export function InnerTabs({ note, mdxContent, className, showInfo = false }: InnerTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const prevShowInfoRef = useRef(showInfo);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Only animate when showInfo transitions from false to true
    if (!prevShowInfoRef.current && showInfo) {
      setShouldAnimate(true);
      // Reset after animation completes
      const timer = setTimeout(() => {
        setShouldAnimate(false);
      }, 250);
      prevShowInfoRef.current = showInfo;
      return () => clearTimeout(timer);
    } else {
      prevShowInfoRef.current = showInfo;
    }
  }, [showInfo]);

  const renderReferences = () => {
    // Show references in all tabs when info button is active
    if (!note.sources || note.sources.length === 0) {
      return null;
    }

    return (
      <AnimatePresence>
        {showInfo && (
          <motion.div
            key="references"
            initial={shouldAnimate ? { opacity: 0, height: 0 } : false}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6 pt-6 border-t border-border"
          >
            <SourceCitations sources={note.sources} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const renderTabContent = () => {
    let content;

    switch (activeTab) {
      case "overview":
        content = (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <MDXRemote {...mdxContent} />
          </div>
        );
        break;

      case "explainer":
        content = note.explainer ? (
          <div className="p-6 rounded-card bg-code-bg border border-border">
            <p className="text-text leading-relaxed">{note.explainer}</p>
          </div>
        ) : (
          <p className="text-text-muted">No explainer available.</p>
        );
        break;

      case "sources":
        content = note.sources ? (
          <SourceCitations sources={note.sources} />
        ) : (
          <p className="text-text-muted">No sources listed.</p>
        );
        break;

      case "screenshots":
        content = note.screenshots ? (
          <ScreenshotGallery screenshots={note.screenshots} />
        ) : (
          <p className="text-text-muted">No screenshots available.</p>
        );
        break;

      case "unknowns":
        content = note.unknowns && note.unknowns.length > 0 ? (
          <ul className="space-y-3">
            {note.unknowns.map((unknown, index) => (
              <li
                key={index}
                className="p-4 rounded-input bg-code-bg border border-border"
              >
                <p className="text-text">{unknown}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-text-muted">No open questions listed.</p>
        );
        break;

      default:
        content = null;
    }

    return (
      <>
        {content}
        {renderReferences()}
      </>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className="flex gap-2 border-b border-border mb-6 overflow-x-auto"
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-motion",
              "focus:outline-none rounded-t-input",
              activeTab === tab.id
                ? "border-accent text-accent"
                : "border-transparent text-text-muted hover:text-text"
            )}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="min-h-[400px]"
      >
        {renderTabContent()}
      </div>
    </div>
  );
}

