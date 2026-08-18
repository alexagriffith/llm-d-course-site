# llm-d: Inference Engineering, Explained

**▶ Live site: https://alexagriffith.github.io/llm-d-course-site/**

A small, linkable site that plays a set of animated explainers in order — the llm-d
course plus companion Red Hat AI inference-stack animations. Built to be shared: send
someone the URL above and they work through the modules top to bottom.

## How it's structured (and why)

**The video files do not live in this repo.** Git is bad at large binaries — every
re-render would bloat history forever, and GitHub caps files at 100&nbsp;MB. So:

- **This repo** = the website only (`index.html`, `style.css`, `chapters.json`). Tiny, fast, versioned.
- **The videos** = hosted separately and referenced by URL. The master copies live in
  Google Drive (`~/animations/`, backed up to Drive), which is the single source of truth.

This is the "keep it in Drive **and** GitHub" split: Drive holds the bytes, GitHub holds
the presentation, and the two stay in sync through `chapters.json`.

## Adding or reordering modules

Everything is driven by `chapters.json` — no code changes needed.

1. Add the video file to the animation library (`~/animations/…`, which syncs to Drive).
2. Add an entry under the right section in `chapters.json` (order in the file = order on the page).
3. Commit + push. Done.

Set `videoBase` in `chapters.json` to your hosting root so the site can find the videos
(see below). Any item whose `src` is already a full `https://` URL is used as-is.

## Hosting the videos

Pick one:

- **Google Drive (simplest):** put the animation folder in a shared Drive folder, then set
  `videoBase` to a path/URL your player can reach. For reliable inline `<video>` playback,
  a direct-file CDN (below) is smoother than Drive share links, which don't always stream well.
- **Cloudflare R2 / Backblaze B2 / S3 (recommended for a public link):** upload `~/animations/`
  contents, make the bucket public-read, set `videoBase` to the bucket's public URL. Cheap,
  clean URLs, streams properly. This is the best option for a link your manager can hand around.

## Publishing the site (GitHub Pages)

The site is **already published** at
**https://alexagriffith.github.io/llm-d-course-site/** via GitHub Pages,
deploying from `main` / root. Every push to `main` re-publishes automatically —
no extra steps.

To confirm or change the setup: **Settings → Pages → Deploy from branch → main / root**.

## Local preview

```
python3 -m http.server 8000
# open http://localhost:8000
```
