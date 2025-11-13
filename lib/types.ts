/**
 * TypeScript type definitions for the Endo—Field notes system
 */

export interface Source {
  title: string;
  url: string;
  doi?: string;
  pmid?: string;
}

export interface Screenshot {
  path: string;
  caption?: string;
}

export interface NoteFrontmatter {
  title: string;
  slug?: string;
  date: string;
  updated?: string;
  category?: string;
  tags?: string[];
  sources?: Source[];
  screenshots?: Screenshot[];
  explainer?: string;
  unknowns?: string[];
  readingOrder?: number;
  pinned?: boolean;
  draft?: boolean;
  language?: "en" | "tr";
  keywords?: string[];
}

export interface Note extends NoteFrontmatter {
  slug: string;
  content: string;
  readingTime?: number;
  url: string;
}

export type SortMode = "relevance" | "date" | "readingOrder" | "title";

export type Category =
  | "Growth"
  | "Thyroid"
  | "Adrenal"
  | "Puberty"
  | "Diabetes"
  | "Calcium"
  | "Genetics"
  | "Pituitary"
  | "Misc";

