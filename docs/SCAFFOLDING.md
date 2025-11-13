# Initial Scaffolding (Next.js + Tailwind + Framer Motion + shadcn + MDX)

## 0) Create project

```bash
pnpm create next-app@latest peds-notes --ts --eslint --app --src-dir false --tailwind --import-alias "@/*"
cd peds-notes
```

## 1) Deps

```bash
pnpm add framer-motion fuse.js next-mdx-remote gray-matter reading-time clsx
pnpm add -D @types/fuse.js
```

### Option A: Contentlayer (type-safe MD/MDX)

```bash
pnpm add contentlayer next-contentlayer
```

### OR Option B: Velite (lighter)

```bash
pnpm add velite
```

## 2) shadcn/ui

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button input badge tabs dropdown-menu command dialog tooltip toast
```

## 3) Lint/format (optional)

```bash
pnpm add -D prettier prettier-plugin-tailwindcss
```

## 4) Files/Dirs

```bash
mkdir -p docs components/{drawer,reader,ui,common} content/notes/{assets/screenshots,2025} lib styles public/icons
```

## 5) Add pinned docs

(Copy the files from /docs in this plan.)

## 6) Git + Vercel

```bash
git init && git add . && git commit -m "chore: scaffold"
```

Push to GitHub in Cursor; then import on Vercel

## 7) Dev

```bash
pnpm dev
```

