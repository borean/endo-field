# Component Map

```
AppShell
├─ TopBar
│  ├─ Logo
│  ├─ SearchInput
│  ├─ QuickFilters (CategorySelect, TagChips, SortMenu)
│  └─ SettingsButton
├─ Main
│  ├─ DrawerScene (3D context)
│  │  ├─ DrawerBackground (depth, blur)
│  │  ├─ FolderRow (scrollable row of tabs)
│  │  │  └─ FolderTab (repeated)
│  │  └─ LiftedFolder (when active)
│  │     ├─ FolderCover (click -> open)
│  │     └─ LiftTransition (motion wrapper)
│  └─ NoteReader (2D mode; shown when a folder opens)
│     ├─ NoteHeader (title, metadata)
│     │  ├─ TagChips
│     │  ├─ CategoryBadge
│     │  └─ DateInfo
│     ├─ InnerTabs (Overview | Explainer | Sources | Screenshots | Unknowns)
│     │  ├─ TabList
│     │  └─ TabPanel (MDX content)
│     ├─ SourceCitations (list + external links)
│     ├─ ScreenshotGallery (lightbox)
│     └─ ReaderFooter (prev/next, back-to-drawer)
└─ Overlay
   ├─ CommandPalette (K)
   └─ Toasts
```

# Data / Utilities

- `useNotesIndex()`: builds search index from frontmatter.
- `useActiveFolder()`: manages selected folder/tab and lift state.
- `mdx-compiler`: render MDX for note body.
- `filters`: category, tag, date, sort.

