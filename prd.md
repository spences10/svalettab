# Svalettab PRD

A modern replacement for
[Palettab](https://github.com/tholman/palettab) — the beloved browser
extension that's been abandoned for 10+ years. Built with SvelteKit
and Fontsource.

## What is it?

A single-page app that displays a random color palette with font
samples. Every page load shows fresh inspiration. That's it.

## Core Behavior

On load:

1. Pick a random 5-color palette
2. Pick 5 random fonts (one per swatch)
3. Display as 5 full-height vertical columns
4. Each column shows the font name rendered in that font, with
   appropriate contrast

On click:

- Clicking a color swatch → copies the hex code to clipboard (toast
  confirmation)
- Clicking the font name → opens Fontsource page for that font in new
  tab

Refresh button (or keyboard shortcut) → regenerates palette + fonts
without full page reload

## UI Layout

```
┌──────┬──────┬──────┬──────┬──────┐
│      │      │      │      │      │
│ #hex │ #hex │ #hex │ #hex │ #hex │
│      │      │      │      │      │
│ Font │ Font │ Font │ Font │ Font │
│ Name │ Name │ Name │ Name │ Name │
│      │      │      │      │      │
└──────┴──────┴──────┴──────┴──────┘
```

- Each column is 20% width, 100vh height
- Font name positioned toward bottom of each swatch
- Hex code shown smaller, above or below font name
- Text color auto-calculated for contrast (dark text on light colors,
  light text on dark)

## Tech Stack

- **SvelteKit** (already scaffolded)
- **Fontsource** for self-hosted variable fonts
- **No external API dependencies** — palettes bundled in app

## Fonts

Install ~15-20 interesting variable fonts from Fontsource. Mix of:

- Sans (Space Grotesk, Outfit, Sora, Work Sans, DM Sans, Manrope,
  etc.)
- Serif (Playfair Display, Crimson Pro, Fraunces, Bitter)
- Mono (JetBrains Mono, Source Code Pro)
- Display (Josefin Sans, Raleway, Quicksand)

All fonts loaded upfront. Pick 5 randomly per view.

## Palettes

Bundle ~30-50 curated 5-color palettes in a JSON/TS file. Each
palette:

```ts
{
  name: string,
  colors: [string, string, string, string, string], // hex codes
  author?: string
}
```

Source palettes from:

- Hand-picked favorites
- Popular ones from coolors.co, colorhunt.co
- Classic design palettes

No runtime API calls. Everything local.

## Features

### MVP

- [x] Random palette + fonts on load
- [x] Contrast-aware text colors
- [x] Click color → copy hex to clipboard
- [x] Click font → open Fontsource page
- [x] Refresh button (and spacebar/R keyboard shortcut)
- [x] Subtle hover states on swatches
- [x] Mobile responsive (stack vertically on narrow screens)

### Nice to Have (later)

- [ ] Share URL with encoded palette
- [ ] Lock individual colors while refreshing others
- [ ] Dark mode toggle
- [ ] Export palette as CSS variables / Tailwind config
- [ ] Browser extension packaging

## Non-Goals

- No user accounts
- No saving favorites (for now)
- No palette API integration
- No complex animations

## File Structure

```
src/
  lib/
    fonts.ts        # font definitions + imports
    palettes.ts     # curated palette data
    contrast.ts     # text color calculation util
  routes/
    +page.svelte    # the entire app, basically
    +layout.svelte  # font imports, global styles
  app.css           # minimal global styles
```

## Design Notes

- Keep it minimal like the original
- Smooth transitions when refreshing
- Slight shadow or border between swatches for definition
- Font rendering should be crisp — use font-display: swap

## Success Criteria

Someone opens the page, sees beautiful colors and fonts, copies a hex
code, and feels inspired. Done in under 2 seconds load time.
