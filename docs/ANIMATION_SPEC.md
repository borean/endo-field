# Filing Cabinet Animation Spec

## States

- **S0 DrawerIdle**: tabs visible in 3D top-down.
- **S1 FolderLift**: selected folder lifts towards camera.
- **S2 FolderOpen**: folder morphs into A4 flat plane (2D reader).
- **S3 ReaderActive**: inner tabs/content visible; cabinet blurred behind.
- **S4 ReaderClose**: reverse to S0 with graceful easing.

## Triggers

- Click/Tap FolderTab -> S0→S1→S2→S3.
- Back button or Esc -> S3→S4→S0.

## Motion Details (Framer Motion pseudocode)

### FolderTab → LiftedFolder (S1)

- duration: 280ms
- easing: [0.2, 0.8, 0.2, 1]
- transforms:
  - scale: 1 → 1.08
  - translateY: 0 → -24px
  - rotateX: 6deg → 0deg
  - perspective: 1000px (via parent)
- shadow: sm → xl
- opacity: 1 → 1

### S1→S2 (morph to A4 plane)

- duration: 320ms
- easing: [0.22, 1, 0.36, 1] (standard "out")
- transforms:
  - scale: 1.08 → 1
  - translateY: -24px → 0
  - rotateX: 0deg (stay)
- width/height: animate to reader container (via `layoutId`)
- Background (DrawerBackground)
  - blur: 0px → 8px during S2
  - brightness: 100% → 85%
  - duration: 220ms, synced with S2 start

### InnerTabs entrance (S3)

- stagger: 50ms
- each Tab: y: 8 → 0, opacity: 0 → 1 (160ms)

### ReaderClose (S4)

- reverse above timings; background blur back to 0px (200ms)

## Accessibility / Prefers Reduced Motion

- If `prefers-reduced-motion`, skip S1/S2 transforms; fade to Reader (opacity 0→1, 120ms).
- Keep focus management: move focus to NoteHeader on open; back to previously focused FolderTab on close.

## Performance

- Only animate `transform` and `opacity`.
- Use `will-change: transform` on animating elements.
- Limit shadows during motion; switch to static shadow after settle.

## Interruptibility

- If user re-clicks another tab during S1/S2, cancel and transition to that folder's S1.

