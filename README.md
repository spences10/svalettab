# Svalettab

A modern replacement for
[Palettab](https://github.com/tholman/palettab) — the beloved browser
extension that's been abandoned for 10+ years. Built with SvelteKit
and Fontsource.

## What is it?

A single-page app that displays a random color palette with font
samples. Every refresh shows fresh inspiration. That's it.

## Features

- **50 curated color palettes** — hand-picked for design inspiration
- **18 variable fonts** — from Fontsource, beautifully rendered
- **Click to copy** — tap any color to copy the hex code
- **Font links** — click font names to explore on Fontsource
- **Keyboard shortcuts** — press `Space` or `R` to refresh
- **Smooth animations** — cards fly in with satisfying Svelte
  transitions
- **Responsive** — works on mobile and desktop
- **Contrast-aware** — text automatically adjusts for readability
- **Dark mode** — system preference + manual toggle
- **WCAG contrast badges** — see accessibility ratings at a glance
- **Color formats** — switch between HEX, HSL, and OKLCH
- **Reduced motion** — respects `prefers-reduced-motion`

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) with Svelte 5 runes
- [Fontsource](https://fontsource.org/) variable fonts
- No external API dependencies — everything bundled

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Type check
pnpm check

# Build for production
pnpm build

# Build browser extension
pnpm build:extension
```

## Store Screenshots

Generate store assets from source images in `store-assets/source/`:

```bash
mkdir -p store-assets/output && cd store-assets/source && i=1; for f in *.png; do magick "$f" -resize 1280x800^ -gravity center -extent 1280x800 "../output/screenshot-${i}.png" && echo "Resized $f -> screenshot-${i}"; i=$((i+1)); done
```

## Keyboard Shortcuts

| Key     | Action               |
| ------- | -------------------- |
| `Space` | Generate new palette |
| `R`     | Generate new palette |

## Credits

Inspired by the original [Palettab](https://palettab.com/) by
[Tim Holman](https://github.com/tholman).

## License

MIT
