"use client";

import React from "react";
import { ArrowLeft, Calendar, Clock, Info } from "lucide-react";
import { Note } from "@/lib/types";
import { TagChips } from "@/components/common/TagChips";
import { CategoryBadge } from "@/components/common/CategoryBadge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NoteHeaderProps {
  note: Note;
  onBack?: () => void;
  className?: string;
  showInfo?: boolean;
  onToggleInfo?: () => void;
}

export function NoteHeader({ note, onBack, className, showInfo = false, onToggleInfo }: NoteHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <header className={cn("mb-8", className)}>
      {onBack && (
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent mb-6 transition-colors duration-motion"
        >
          <ArrowLeft className="h-4 w-4 icon" />
          <span>Back to drawer</span>
        </Link>
      )}

      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
            {note.category && <CategoryBadge category={note.category} />}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 icon" />
              <span>{formatDate(note.date)}</span>
            </div>
            {note.updated && note.updated !== note.date && (
              <div className="flex items-center gap-1">
                <span>Updated: {formatDate(note.updated)}</span>
              </div>
            )}
            {note.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 icon" />
                <span>{Math.ceil(note.readingTime)} min read</span>
              </div>
            )}
          </div>
        </div>
        {onToggleInfo && (
          <button
            onClick={onToggleInfo}
            className={cn(
              "p-2 rounded-input",
              "text-text-muted hover:text-text hover:bg-code-bg",
              "transition-colors duration-motion",
              "focus:outline-none",
              showInfo && "text-accent bg-code-bg"
            )}
            aria-label={showInfo ? "Hide references" : "Show references"}
          >
            <Info className="h-5 w-5 icon" />
          </button>
        )}
      </div>

      {note.tags && note.tags.length > 0 && (
        <TagChips tags={note.tags} className="mt-4" />
      )}

      {note.explainer && (
        <div className="mt-6 p-4 rounded-input bg-code-bg border border-border">
          <p className="text-sm text-text-muted leading-relaxed">{note.explainer}</p>
        </div>
      )}
    </header>
  );
}

