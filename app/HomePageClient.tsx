"use client";

import { useState, useMemo, useEffect } from "react";
import { TopBar } from "@/components/common/TopBar";
import { DrawerScene } from "@/components/drawer/DrawerScene";
import { searchNotes, filterByCategory, sortNotes, SortMode } from "@/lib/search";
import { Note } from "@/lib/types";

interface HomePageClientProps {
  initialNotes: Note[];
  categories: string[];
}

export function HomePageClient({ initialNotes, categories }: HomePageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("date");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const filteredNotes = useMemo(() => {
    let notes = initialNotes;

    // Search
    if (searchQuery.trim()) {
      notes = searchNotes(searchQuery, notes);
    }

    // Filter by category
    if (selectedCategory) {
      notes = filterByCategory(notes, selectedCategory);
    }

    // Sort
    notes = sortNotes(notes, sortMode);

    return notes;
  }, [initialNotes, searchQuery, selectedCategory, sortMode]);

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
  };

  // Prevent body scrolling on main page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
    };
  }, []);

  return (
    <div 
      className="relative h-screen overflow-hidden flex flex-col"
      style={{ 
        touchAction: 'none',
        overscrollBehavior: 'none'
      }}
    >
      <TopBar />
      <div className="flex-1 overflow-hidden" style={{ touchAction: 'none', overscrollBehavior: 'none' }}>
      <DrawerScene
        notes={filteredNotes}
        allNotes={initialNotes}
        activeCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        onNoteSelect={handleNoteSelect}
        selectedNote={selectedNote}
        onNoteDeselect={() => setSelectedNote(null)}
      />
      </div>
    </div>
  );
}

