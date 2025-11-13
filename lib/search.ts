import Fuse from "fuse.js";
import { Note, SortMode } from "./types";
import { getAllNotes } from "./notes";

let searchIndex: Fuse<Note> | null = null;

/**
 * Initialize search index
 */
export function initializeSearch(notes: Note[]): Fuse<Note> {
  if (searchIndex) {
    return searchIndex;
  }

  searchIndex = new Fuse(notes, {
    keys: [
      { name: "title", weight: 0.4 },
      { name: "content", weight: 0.3 },
      { name: "tags", weight: 0.15 },
      { name: "keywords", weight: 0.15 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
  });

  return searchIndex;
}

/**
 * Search notes by query
 */
export function searchNotes(query: string, notes: Note[]): Note[] {
  if (!query.trim()) {
    return notes;
  }

  const index = initializeSearch(notes);
  const results = index.search(query);
  return results.map((result) => result.item);
}

/**
 * Filter notes by category
 */
export function filterByCategory(notes: Note[], category: string | null): Note[] {
  if (!category) {
    return notes;
  }
  return notes.filter((note) => note.category === category);
}

/**
 * Filter notes by tags
 */
export function filterByTags(notes: Note[], tags: string[]): Note[] {
  if (tags.length === 0) {
    return notes;
  }
  return notes.filter((note) => {
    if (!note.tags) return false;
    return tags.some((tag) => note.tags!.includes(tag));
  });
}

/**
 * Filter notes by year
 */
export function filterByYear(notes: Note[], year: number | null): Note[] {
  if (!year) {
    return notes;
  }
  return notes.filter((note) => {
    const noteYear = new Date(note.date).getFullYear();
    return noteYear === year;
  });
}

/**
 * Sort notes
 */
export function sortNotes(notes: Note[], mode: SortMode): Note[] {
  const sorted = [...notes];

  switch (mode) {
    case "relevance":
      // Already sorted by search relevance if applicable
      return sorted;

    case "date":
      return sorted.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA; // Newest first
      });

    case "readingOrder":
      return sorted.sort((a, b) => {
        if (a.readingOrder !== undefined && b.readingOrder !== undefined) {
          return a.readingOrder - b.readingOrder;
        }
        if (a.readingOrder !== undefined) return -1;
        if (b.readingOrder !== undefined) return 1;
        return 0;
      });

    case "title":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return sorted;
  }
}

/**
 * Get all available years from notes
 */
export function getAvailableYears(notes: Note[]): number[] {
  const years = new Set<number>();
  notes.forEach((note) => {
    const year = new Date(note.date).getFullYear();
    years.add(year);
  });
  return Array.from(years).sort((a, b) => b - a);
}

/**
 * Highlight search matches in text
 */
export function highlightMatches(text: string, query: string): string {
  if (!query.trim()) {
    return text;
  }

  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, '<mark class="text-highlight">$1</mark>');
}

