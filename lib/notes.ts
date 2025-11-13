import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Note, NoteFrontmatter } from "./types";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content/notes");

/**
 * Get all markdown files recursively
 */
function getAllMarkdownFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith(".md") && !file.startsWith("_")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Load and process all notes
 */
export function getAllNotes(): Note[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = getAllMarkdownFiles(contentDirectory);
  
  const notes = files
    .map((filePath) => {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const readingTimeResult = readingTime(content);

      // Generate slug from filename if not provided
      const relativePath = path.relative(contentDirectory, filePath);
      const slug =
        data.slug ||
        relativePath.replace(/\.md$/, "").replace(/\\/g, "/");

      return {
        ...(data as NoteFrontmatter),
        slug,
        content,
        readingTime: readingTimeResult.minutes,
        url: `/note/${slug}`,
      } as Note;
    })
    .filter((note) => !note.draft)
    .sort((a, b) => {
      // Sort by readingOrder if available, then by date, then by title
      if (a.readingOrder !== undefined && b.readingOrder !== undefined) {
        return a.readingOrder - b.readingOrder;
      }
      if (a.readingOrder !== undefined) return -1;
      if (b.readingOrder !== undefined) return 1;

      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateA !== dateB) {
        return dateB - dateA; // Newest first
      }

      return a.title.localeCompare(b.title);
    });

  return notes;
}

/**
 * Get a note by slug
 */
export function getNoteBySlug(slug: string): Note | undefined {
  const notes = getAllNotes();
  return notes.find((note) => note.slug === slug);
}

/**
 * Get notes by category
 */
export function getNotesByCategory(category: string): Note[] {
  return getAllNotes().filter((note) => note.category === category);
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  getAllNotes().forEach((note) => {
    if (note.category) {
      categories.add(note.category);
    }
  });
  return Array.from(categories).sort();
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllNotes().forEach((note) => {
    if (note.tags) {
      note.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

/**
 * Group notes by category
 */
export function groupNotesByCategory(): Record<string, Note[]> {
  const grouped: Record<string, Note[]> = {};
  getAllNotes().forEach((note) => {
    const category = note.category || "Misc";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(note);
  });
  return grouped;
}
