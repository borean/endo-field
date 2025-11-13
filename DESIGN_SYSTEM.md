# Endo-Field Design System

**OP-1 Field × Clinical Precision aesthetic**  
*Using Inter + Berkeley Mono with IBM Plex Mono fallback*

run on localhost:5555
---

## Table of Contents

1. [Introduction](#introduction)
2. [Core Principles](#core-principles)
3. [Design Tokens](#design-tokens)
   - [Typography](#typography)
   - [Color System](#color-system)
   - [Spacing & Layout](#spacing--layout)
4. [Layout System](#layout-system)
   - [Architecture](#architecture)
   - [Components](#layout-components)
   - [Constants & Utilities](#constants--utilities)
5. [UI Components](#ui-components)
   - [Buttons](#buttons)
   - [Icons](#icons)
6. [Visual Effects](#visual-effects)
   - [Textures & Micro-Motion](#textures--micro-motion)
   - [Motion](#motion)
   - [Environmental Lighting](#environmental-lighting)
7. [Text & Interaction](#text--interaction)
8. [Implementation Guidelines](#implementation-guidelines)
9. [References](#references)

---

## Introduction

This design system serves as the central reference for the Endo-Field project — a personal pediatric endocrinology notes site with a precision instrument aesthetic. All design decisions, component specifications, and implementation guidelines are documented here to ensure consistency across the codebase.

**Repository:** [https://github.com/borean/endo-field.git](https://github.com/borean/endo-field.git)

### Philosophy

Create a medical-study notebook that feels like a **precision instrument** — analog warmth × digital clarity.  
**Tone:** calm · matte · engineered · functional.

---

## Core Principles

### Scalability & Abstraction

- **Highest abstraction possible**: All components must be reusable and configurable. No hardcoded values.
- **Single source of truth**: Design tokens (colors, spacing, typography) defined once in CSS variables and Tailwind config.
- **DRY (Don't Repeat Yourself)**: Changes to design tokens automatically propagate to all components.
- **Component composition**: Build complex UIs from small, reusable components.
- **No manual work**: Use utilities, hooks, and abstractions to avoid repetitive code.

### Icon Usage

- **Icons only, no emojis**: Use Lucide React icons exclusively for all visual indicators.
- **Consistent icon styling**: All icons use `stroke-width: 1.5`, `stroke-linecap: round`, `stroke-linejoin: round`.
- **Icon sizing**: Use consistent size classes (`h-4 w-4`, `h-5 w-5`, etc.) defined in a central utility.
- **Semantic icons**: Icons must have semantic meaning and proper ARIA labels.

### Design Token System

- **CSS Variables**: All colors, spacing, and typography defined as CSS custom properties.
- **Tailwind Config**: Extend Tailwind with design tokens for type-safe usage.
- **Theme-aware**: All tokens support light/dark mode automatically.
- **Scalable**: Adding new tokens or modifying existing ones affects entire system.

### Component Architecture

- **Atomic design**: Components follow atomic design principles (atoms → molecules → organisms).
- **Props-based configuration**: Components accept props for all customizable aspects.
- **Default values**: Sensible defaults that can be overridden.
- **Composition over configuration**: Prefer component composition over complex prop APIs.

---

## Design Tokens

### Typography

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root {
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "Berkeley Mono", "IBM Plex Mono", ui-monospace, monospace;
}
```

**Typography Scale:**

| Element | Font | Weight | Notes |
|---------|------|--------|-------|
| Headings | Inter | 600–700 | letter-spacing: -0.02em |
| Body | Inter | 400 | font-optical-sizing: auto |
| Code / Notes | Berkeley Mono → IBM Plex Mono | 400–500 | line-height: 1.55 |
| Labels / Buttons | Inter | 500–600 | tracking: +0.04em |

**Fallback Rule:**  
Use IBM Plex Mono whenever Berkeley Mono is unlicensed or unavailable. IBM Plex Mono shares Berkeley's proportions, open counters, and minimal stroke contrast while being fully open-source (SIL OFL).

### Color System

#### Light Mode

| Token | Hex | Purpose |
|-------|-----|---------|
| `--bg` | `#F6F7F7` | Background |
| `--surface` | `#FFFFFF` | Cards |
| `--text` | `#1A1A1A` | Primary text |
| `--text-muted` | `#5C5F66` | Secondary text |
| `--border` | `#E0E2E2` | Dividers |
| `--accent` | `#2B9BF3` | Primary / Link |
| `--accent-alt` | `#FF8855` | Warning / Highlight |
| `--success` | `#3DBE7A` | Confirmation |
| `--danger` | `#E33E2B` | Destructive |
| `--code-bg` | `#F1F2F3` | Mono background |

#### Dark Mode

| Token | Hex | Purpose |
|-------|-----|---------|
| `--bg` | `#111213` | Background |
| `--surface` | `#18191A` | Elevated areas |
| `--text` | `#E8E9EB` | Primary text |
| `--text-muted` | `#9A9EA3` | Secondary |
| `--border` | `#262728` | Dividers |
| `--accent` | `#3EA7FF` | Primary |
| `--accent-alt` | `#FF9B64` | Highlight |
| `--success` | `#44D48C` | Success |
| `--danger` | `#FF5C45` | Destructive |
| `--code-bg` | `#1E1F20` | Mono background |

### Spacing & Layout

**Base Grid System:**
- Grid: 8px (base), 4px sub-grid
- Border radius: 16px (cards), 12px (inputs)
- Corner shape: squircle (progressive enhancement on supported platforms)
- Line height: 1.6 (body) / 1.3 (headings)
- Max content width: 68ch
- White space: measured and necessary

---

## Layout System

### Philosophy

The Endo-Field layout system follows **highest abstraction principles** with a hierarchical component architecture. All layout values are defined in a single source of truth (`lib/layout.ts`), and components are built as reusable, configurable primitives that compose together.

### Architecture

The layout system consists of four core primitives:

```
AppShell (Root)
  └─ LayoutProvider (Context)
      ├─ PageContainer (Page-level wrapper)
      │   └─ Section (Content sections)
      │       └─ [Your Content]
      └─ TopBar, DrawerScene, etc.
```

### Layout Components

#### AppShell

**Location:** `components/layout/AppShell.tsx`

Root application container providing base structure.

**Props:**
- `children`: ReactNode
- `className?`: string
- `applyBackground?`: boolean (default: true)
- `backgroundClass?`: string

**Usage:**
```tsx
<AppShell>
  {children}
</AppShell>
```

#### LayoutProvider

**Location:** `components/layout/LayoutProvider.tsx`

Context provider for cascading default layout values.

**Props:**
- `defaults?`: LayoutContextValue
  - `defaultContainer?`: ContainerSize
  - `defaultMaxWidth?`: ContainerSize
  - `defaultPadding?`: PaddingSize
  - `defaultSpacing?`: SpacingSize

**Usage:**
```tsx
<LayoutProvider defaults={{
  defaultContainer: "xl",
  defaultMaxWidth: "xl",
  defaultPadding: "md",
  defaultSpacing: "md",
}}>
  {children}
</LayoutProvider>
```

#### PageContainer

**Location:** `components/layout/PageContainer.tsx`

Standardized page wrapper with configurable container width, padding, and centering.

**Props:**
- `children`: ReactNode
- `container?`: ContainerSize (default: "xl")
- `maxWidth?`: ContainerSize
- `centered?`: boolean (default: true)
- `applyPadding?`: boolean (default: true)
- `paddingVariant?`: "page" | "section" | "card" (default: "page")
- `padding?`: PaddingSize | "none"
- `className?`: string

**Usage:**
```tsx
<PageContainer
  container="xl"
  maxWidth="5xl"
  padding="lg"
>
  {pageContent}
</PageContainer>
```

#### Section

**Location:** `components/layout/Section.tsx`

Reusable section wrapper with spacing, container width, and background variants.

**Props:**
- `children`: ReactNode
- `id?`: string
- `container?`: ContainerSize
- `maxWidth?`: ContainerSize
- `centered?`: boolean (default: true)
- `applySpacing?`: boolean (default: true)
- `spacing?`: "none" | "sm" | "md" | "lg" | "xl" | "2xl" (default: "lg")
- `variant?`: "default" | "surface" | "muted" | "transparent" (default: "default")
- `padding?`: PaddingSize | "none" (default: "none")
- `className?`: string

**Usage:**
```tsx
<Section
  spacing="xl"
  variant="surface"
  container="xl"
>
  {sectionContent}
</Section>
```

### Constants & Utilities

All layout values are defined in `lib/layout.ts` as the **single source of truth**.

#### Container Widths

```typescript
container: {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  "5xl": "64rem",    // 1024px - content layouts
  "7xl": "80rem",    // 1280px - wide layouts
  content: "68ch",   // Max content width for readability
  full: "100%",
}
```

#### Spacing System (8px base grid, 4px sub-grid)

```typescript
spacing: {
  grid: "8px",
  "sub-grid": "4px",
  xs: "0.5rem",   // 8px
  sm: "1rem",     // 16px
  md: "1.5rem",   // 24px
  lg: "2rem",     // 32px
  xl: "3rem",     // 48px
  "2xl": "4rem",  // 64px
  "3xl": "6rem",  // 96px
}
```

#### Padding System

```typescript
padding: {
  page: {
    mobile: "1rem",    // 16px
    tablet: "1.5rem",  // 24px
    desktop: "2rem",   // 32px
  },
  section: {
    mobile: "1.5rem",  // 24px
    tablet: "2rem",    // 32px
    desktop: "3rem",   // 48px
  },
  card: {
    sm: "1rem",   // 16px
    md: "1.5rem", // 24px
    lg: "2rem",   // 32px
    xl: "3rem",   // 48px
  },
}
```

#### Z-Index Layers

```typescript
zIndex: {
  base: 0,
  dropdown: 1000,
  sticky: 1010,
  fixed: 1020,
  modal: 1030,
  popover: 1040,
  tooltip: 1050,
  overlay: 9999,
}
```

#### Utility Functions

**`createContainerClasses(config: LayoutConfig)`**  
**Location:** `lib/utils.ts`

Generates responsive container classes from layout configuration.

```typescript
const classes = createContainerClasses({
  container: "xl",
  maxWidth: "5xl",
  centered: true,
});
```

**`getZIndexClass(layer: ZIndexLayer)`**  
**Location:** `lib/layout.ts`

Returns z-index class for specified layer.

```typescript
const zIndex = getZIndexClass("sticky"); // Returns "z-[1010]"
```

### Implementation Examples

#### Example 1: Standard Page Layout

```tsx
<PageContainer container="xl" padding="lg">
  <Section spacing="md">
    <h1>Page Title</h1>
  </Section>
  
  <Section spacing="xl" variant="surface">
    <p>Main content...</p>
  </Section>
</PageContainer>
```

#### Example 2: Full-Width Section

```tsx
<Section
  container="full"
  spacing="lg"
  variant="muted"
  padding="md"
>
  <PageContainer container="xl">
    <p>Content with full-width background</p>
  </PageContainer>
</Section>
```

#### Example 3: Reader View

```tsx
<PageContainer
  container="xl"
  maxWidth="5xl"
  padding="lg"
>
  <Section spacing="md" padding="none">
    <Button>Back</Button>
  </Section>
  
  <Section spacing="xl" padding="none">
    <div className="card">
      <NoteContent />
    </div>
  </Section>
</PageContainer>
```

### Design Principles

1. **Single Source of Truth**: All layout values defined in `lib/layout.ts`
2. **No Hardcoded Values**: All spacing, padding, and container widths use constants
3. **Props-Based Configuration**: Components accept props for all customizable aspects
4. **Composition Over Configuration**: Build complex layouts by composing primitives
5. **Type Safety**: Full TypeScript support with proper types
6. **Responsive by Default**: All components handle responsive breakpoints automatically

### Component Hierarchy

```
app/layout.tsx
  └─ LayoutProvider
      └─ AppShell
          ├─ TopBar (uses PageContainer)
          ├─ DrawerScene (uses Section)
          └─ NoteReader (uses PageContainer + Section)
```

### File Structure

```
components/layout/
  ├─ AppShell.tsx
  ├─ PageContainer.tsx
  ├─ Section.tsx
  ├─ LayoutProvider.tsx
  └─ index.ts

lib/
  ├─ layout.ts          # Single source of truth for all layout constants
  └─ utils.ts           # Layout utility functions
```

### Migration Guide

**Before:**
```tsx
<div className="min-h-screen bg-bg dark:bg-dark-bg">
  <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
    {content}
  </div>
</div>
```

**After:**
```tsx
<PageContainer
  container="xl"
  maxWidth="5xl"
  padding="lg"
>
  {content}
</PageContainer>
```

### Anti-Patterns

**Don't:**
- Hardcode spacing values: `className="py-8"`
- Use inline styles for layout
- Create custom wrapper divs for common patterns
- Duplicate layout logic across components

**Do:**
- Use layout primitives: `<Section spacing="lg">`
- Reference constants from `lib/layout.ts`
- Compose components for complex layouts
- Use `LayoutProvider` for cascading defaults

---

## UI Components

### Buttons

| Type | Light BG | Dark BG | Text | Use |
|------|----------|---------|------|-----|
| Primary | `#2B9BF3` | `#3EA7FF` | `#FFF` | Save / Confirm |
| Warning | `#FF8855` | `#FF9B64` | `#FFF` | Caution |
| Danger | `#E33E2B` | `#FF5C45` | `#FFF` | Delete |
| Secondary | `#EDEEEE` | `#2A2B2C` | `#1A1A1A` / `#E8E9EB` | Neutral |
| Disabled | `#E6E7E8` | `#2A2B2C` | `#9EA1A3` / `#707274` | Inactive |

**Specifications:**
- Border radius: 16px
- Corner shape: squircle (on supported platforms)
- Transition: 120ms ease-in-out
- Hover: ≈ 4% darker

### Icons

**Library:** Lucide Icons

**Styling:**
- Stroke width: 1.5px
- Stroke linecap: round
- Stroke linejoin: round

**CSS:**
```css
.icon {
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

**Guidelines:**
- Use outline icons only; no fills or color glyphs
- All icons must have semantic meaning and proper ARIA labels

---

## Visual Effects

### Corner Shape: Squircle

**Progressive Enhancement** — applies on Safari 18+, Chrome with experimental flags

Squircle (superellipse) corners provide smoother, more organic rounded corners compared to traditional circular arcs. This creates a more refined, Apple-like aesthetic that aligns with the OP-1 Field precision instrument design.

**Implementation:**
```css
@supports (corner-shape: squircle) {
  .card,
  .drawer-tab,
  [class*="rounded-card"],
  [class*="rounded-input"] {
    corner-shape: squircle;
  }
}
```

**Applied to:**
- All cards (16px border-radius)
- All inputs (12px border-radius)
- Drawer tabs
- Code blocks
- Inline code
- Text highlights

**Fallback:** Standard `border-radius` on unsupported browsers.

### Textures & Micro-Motion

#### Dither Overlay

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.03) 1px,
    transparent 1px
  );
  background-size: 2px 2px;
  opacity: 0.25;
  mix-blend-mode: multiply;
}
```

#### Grain Panel

```css
.card {
  background: linear-gradient(180deg, #fcfcfc, #f6f7f7);
  position: relative;
}

.card::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX///+nxBvIAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==");
  opacity: 0.15;
  pointer-events: none;
  border-radius: inherit;
}
```

#### Hard-Edge Shadow

```css
.card {
  box-shadow: 1px 1px 0 #DADCDC;
}
```

#### Scanline Drift

```css
@keyframes scanline {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 4px;
  }
}

body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    transparent 0 3px,
    rgba(0, 0, 0, 0.04) 3px 4px
  );
  animation: scanline 2s linear infinite;
  opacity: 0.2;
}
```

#### Glass Panel

```css
.glass {
  backdrop-filter: blur(12px) saturate(140%);
  background: rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
}
```

### Motion

**Duration:** 100–140ms  
**Easing:** `cubic-bezier(0.25, 0.1, 0.25, 1)`

**Principles:**
- No bounce; only fade or 2px translate
- Goal: mechanical precision, not delight
- Motion serves feedback, not entertainment
- Every effect is tactile and instrumental

### Environmental Lighting

**Optional visual layer — "Field Light"**

#### Intent

To simulate the **physical presence** of paper or card surfaces under ambient light, as seen in high-end document editors. This system should evoke the **OP-1 Field** material feel: powder-coated aluminum lit by real light, not fake gradients.

#### Core Concept

Each main surface (card, sheet, note, panel) can receive:
- A **directional light gradient** that reacts to pointer or device motion
- A **soft environment shadow** that subtly fades into the background
- Optional **intensity slider** or auto-adjust based on system theme (brighter in dark mode)

#### Implementation

**Light gradient:**
```css
.card {
  --light-x: 0.3;
  --light-y: 0.2;
  background: radial-gradient(
    circle at calc(50% + var(--light-x) * 40%) calc(50% + var(--light-y) * 40%),
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.75) 30%,
    rgba(0, 0, 0, 0.05) 100%
  );
  transition: background 0.2s ease-out;
}
```

**Pointer mapping:**
```javascript
document.addEventListener('pointermove', e => {
  const x = (e.clientX / window.innerWidth - 0.5).toFixed(2);
  const y = (e.clientY / window.innerHeight - 0.5).toFixed(2);
  document.documentElement.style.setProperty('--light-x', x);
  document.documentElement.style.setProperty('--light-y', y);
});
```

**Ambient shadow:**
```css
.card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.08), transparent 70%);
  mix-blend-mode: multiply;
  opacity: 0.4;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.card:hover::before {
  opacity: 0.55;
}
```

#### Aesthetic Guidelines

| Parameter | Light Mode | Dark Mode |
|-----------|------------|-----------|
| Shadow color | `rgba(0, 0, 0, 0.08)` | `rgba(0, 0, 0, 0.35)` |
| Light hue | neutral white (`#fffdfc`) | bluish white (`#eaf3ff`) |
| Highlight intensity | 0.8–1.0 | 0.6–0.8 |
| Ambient softness | 12–24px blur | 18–36px blur |

#### Design Philosophy

- The environment shadow is felt, not seen
- Use minimal motion (≤ 0.3s) — should evoke studio photography, not game rendering
- This effect should never compete with text clarity; fade entirely under modals or focus states
- Light direction and grain overlays must combine softly to maintain Endo-Field's analog feel

---

## Text & Interaction

### Text Decoration

**Links:**
- Underline: 1px solid accent, offset 2px
- Hover: accent-alt color

**Highlights:**
```css
.text-highlight {
  background: rgba(43, 155, 243, 0.12);
  border-radius: 4px;
}
```

**Inline code:**
```css
code {
  font-family: var(--font-mono);
  background: var(--code-bg);
  padding: 0.1em 0.25em;
  border-radius: 4px;
}
```

### Interaction Philosophy

- **Hover**: tilt or reveal, never bounce
- **Motion**: serves feedback, not entertainment
- **Every effect**: tactile and instrumental

### Visual Identity

| Attribute | Should feel like |
|-----------|------------------|
| Material | Powder-coated aluminum |
| Color Mood | Cool daylight, low glare |
| Typography | Clinical precision |
| Motion | Analog drift |
| Emotion | Trust and focus |

---

## Implementation Guidelines

### For LLM Code Generation

When generating UI, CSS, or component code:

- Use Inter + Berkeley Mono (fallback IBM Plex Mono)
- Follow this color + motion system exactly
- Apply dither / grain / hard-shadow microtextures
- Maintain clinical clarity and OP-1 Field restraint
- The interface must look like a scientific instrument rendered in code — minimal, precise, and alive in texture

### Stack Requirements

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **UI Components**: shadcn/ui
- **No Three.js**: Use CSS 3D transforms + Framer Motion for animations

### File Organization

```
components/
  ├─ layout/          # Layout primitives (AppShell, PageContainer, Section, LayoutProvider)
  ├─ drawer/          # Filing cabinet drawer components
  ├─ reader/          # Note reader components
  ├─ common/          # Shared components (TagChips, CategoryBadge, SearchInput)
  └─ ui/              # shadcn/ui components

lib/
  ├─ layout.ts        # Single source of truth for layout constants
  ├─ utils.ts         # Utility functions
  ├─ types.ts         # TypeScript type definitions
  ├─ notes.ts         # Note loading and processing
  ├─ search.ts        # Search functionality
  └─ mdx.ts           # MDX rendering

styles/
  └─ globals.css      # Global styles and CSS variables
```

### Best Practices

1. **Always use layout primitives** instead of custom wrapper divs
2. **Reference constants** from `lib/layout.ts` for all spacing and sizing
3. **Compose components** rather than creating monolithic components
4. **Respect reduced motion** preferences (`prefers-reduced-motion`)
5. **Maintain type safety** with proper TypeScript types
6. **Follow the design tokens** — never hardcode values

---

## References

### Project Documentation

- **Component Map**: See `docs/COMPONENT_MAP.md`
- **Animation Spec**: See `docs/ANIMATION_SPEC.md`
- **Project Structure**: See `docs/STRUCTURE.md`
- **LLM Memory Rules**: See `docs/LLM_MEMORY_RULES.md`
- **Scaffolding Guide**: See `docs/SCAFFOLDING.md`

### External Resources

- **Lucide Icons**: [https://lucide.dev](https://lucide.dev)
- **Tailwind CSS**: [https://tailwindcss.com](https://tailwindcss.com)
- **Framer Motion**: [https://www.framer.com/motion](https://www.framer.com/motion)
- **shadcn/ui**: [https://ui.shadcn.com](https://ui.shadcn.com)

---

*Last updated: 2025*

