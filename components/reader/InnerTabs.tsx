"use client";

import React, { useState } from "react";
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
}

type TabId = "overview" | "explainer" | "sources" | "screenshots" | "unknowns";

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "explainer", label: "Explainer" },
  { id: "sources", label: "Sources" },
  { id: "screenshots", label: "Screenshots" },
  { id: "unknowns", label: "Unknowns" },
];

export function InnerTabs({ note, mdxContent, className }: InnerTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <MDXRemote {...mdxContent} />
          </div>
        );

      case "explainer":
        return note.explainer ? (
          <div className="p-6 rounded-card bg-code-bg border border-border">
            <p className="text-text leading-relaxed">{note.explainer}</p>
          </div>
        ) : (
          <p className="text-text-muted">No explainer available.</p>
        );

      case "sources":
        return note.sources ? (
          <SourceCitations sources={note.sources} />
        ) : (
          <p className="text-text-muted">No sources listed.</p>
        );

      case "screenshots":
        return note.screenshots ? (
          <ScreenshotGallery screenshots={note.screenshots} />
        ) : (
          <p className="text-text-muted">No screenshots available.</p>
        );

      case "unknowns":
        return note.unknowns && note.unknowns.length > 0 ? (
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

      default:
        return null;
    }
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

