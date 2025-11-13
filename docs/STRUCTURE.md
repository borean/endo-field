# Folder Structure Blueprint

```
.
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx                      # DrawerScene entry (S0)
│  ├─ note/
│  │  └─ [slug]/page.tsx            # Reader view (S3)
│  └─ api/                          # (optional) none for now
├─ components/
│  ├─ drawer/
│  │  ├─ DrawerScene.tsx
│  │  ├─ DrawerBackground.tsx
│  │  ├─ FolderRow.tsx
│  │  ├─ FolderTab.tsx
│  │  └─ LiftedFolder.tsx
│  ├─ reader/
│  │  ├─ NoteReader.tsx
│  │  ├─ NoteHeader.tsx
│  │  ├─ InnerTabs.tsx
│  │  ├─ SourceCitations.tsx
│  │  └─ ScreenshotGallery.tsx
│  ├─ ui/                           # shadcn components
│  └─ common/
│     ├─ TagChips.tsx
│     ├─ CategoryBadge.tsx
│     └─ SearchInput.tsx
├─ content/
│  └─ notes/
│     ├─ 2025/
│     │  └─ 2025-11-10-klinefelter-mini.md
│     └─ assets/
│        └─ screenshots/...
├─ docs/
│  ├─ LLM_MEMORY_RULES.md
│  ├─ COMPONENT_MAP.md
│  ├─ ANIMATION_SPEC.md
│  ├─ STRUCTURE.md
│  └─ SCAFFOLDING.md
├─ lib/
│  ├─ notes.ts                      # load frontmatter, build index
│  ├─ search.ts                     # Fuse.js/Minisearch helpers
│  ├─ mdx.ts                        # MDX renderer
│  └─ types.ts                      # TS types for frontmatter
├─ styles/
│  └─ globals.css
├─ public/
│  └─ icons/ ...
├─ contentlayer.config.ts           # or velite.config.ts (choose one)
├─ next.config.mjs
├─ tailwind.config.ts
├─ tsconfig.json
├─ package.json
└─ README.md
```

