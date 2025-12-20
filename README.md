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

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) with Svelte 5 runes
- [Tailwind CSS](https://tailwindcss.com/) v4
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
