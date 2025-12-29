# Build Instructions

For Firefox Add-ons source code review.

## Prerequisites

- Node.js 20+
- pnpm 9+

## Build Extension

```bash
pnpm install
pnpm build:extension
```

Output in `dist-extension/`:

- `chrome/` - unpacked Chrome extension
- `firefox/` - unpacked Firefox extension
- `svalettab-chrome.zip` - Chrome Web Store submission
- `svalettab-firefox.zip` - Firefox Add-ons submission
