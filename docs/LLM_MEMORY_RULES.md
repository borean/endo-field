# LLM Memory Rules (Pinned)

You are building a personal pediatric endocrinology notes site for a single author. Author edits content directly in the repo using Cursor (no CMS).

## Scope

- Stack: Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + shadcn/ui.
- Content: Markdown/MDX files in `content/notes/**`.
- Search: client-side fuzzy search (Fuse.js or Minisearch).
- No Three.js. Use CSS 3D transforms + Framer Motion for the "filing cabinet" animation.

## Content Model (frontmatter)

- `title` (string, required)
- `slug` (string; auto from filename if absent)
- `date` (ISO)
- `updated` (ISO)
- `category` (one of predefined strings)
- `tags` (string[])
- `sources` (array of `{ title, url, doi?, pmid? }`)
- `screenshots` (array of `{ path, caption? }`)
- `explainer` (short paragraph)
- `unknowns` (string[]; open questions)
- `readingOrder` (number; optional for manual sorting/pinning within a category)
- `pinned` (boolean)
- `draft` (boolean)
- `language` ("en" | "tr")
- `keywords` (string[]; for SEO/search boost)

## UI Principles

- Main view: "Filing cabinet drawer" (3D-ish top-down). Tabs are folder tabs.
- Tap/click a tab: folder lifts to eye level (A4) and transitions into full 2D reading mode.
- While in reading mode: narrow side gutters show blurred cabinet background for continuity.

## Animation Constraints

- 60fps target, hardware-accelerated transforms only (`transform`, `opacity`).
- Reduce motion preference respected (`prefers-reduced-motion`).
- Interruptible transitions (allow quick back/forward).

## Search & Filter

- Filter by category, tags, year, text query.
- Query highlights in results.
- Sort modes: relevance | date | readingOrder | title.

## Internationalization

- Light i18n: `language` field per note; UI Chrome stays EN unless explicitly changed later.

## Accessibility

- Keyboard focus states for tabs.
- ARIA roles for tabs, dialog/reader.
- Ensure color-contrast ≥ 4.5:1.

## Don'ts

- No data mutation outside repo files.
- No auto-scraping; sources are explicitly listed by the author.
- No hidden network calls for search; index is built locally at runtime or statically.

## Deliverables to request from the LLM

- Only generate files under `app/`, `components/`, `lib/`, `content/`, `styles/`, `docs/`.
- Follow folder structure in `docs/STRUCTURE.md`.
- Ask before adding new deps not listed in `docs/SCAFFOLDING.md`.

