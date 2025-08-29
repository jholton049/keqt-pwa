# KEQT Worksheet PWA

This folder contains a Progressive Web App (PWA) wrapper for your uploaded `keqt-worksheet-offline.html` so it can be "installed" on iPad as a Home Screen app and used offline.

## Quick Start (GitHub Pages / Netlify)
1. Upload all files in this folder to a static host (GitHub Pages, Netlify, Cloudflare Pages, etc.).
2. Open the URL in Safari on iPad.
3. Tap the Share icon → **Add to Home Screen**.
4. Launch from the Home Screen. After the first load, it will work offline.

## Local Test
- Use any static server in this folder: e.g. `python3 -m http.server 5173` then open `http://<your-ip>:5173` on iPad (same network). iOS requires HTTP(S) origin for service workers; opening `file://` won't register SW.

## Notes
- `manifest.json` sets the standalone display and app icons.
- `service-worker.js` caches the app for offline use.
- Replace icons in `/icons` with your brand assets if desired.
