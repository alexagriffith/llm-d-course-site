# llm-d: Inference Engineering, Explained

**▶ Live site: https://alexagriffith.github.io/llm-d-course-site/**

A small, linkable site that plays a set of animated explainers in order — the llm-d
course plus companion Red Hat AI inference-stack animations. Built to be shared: send
someone the URL above and they work through the modules top to bottom.

## How it's structured (and why)

**The video files do not live in this repo.** Git is bad at large binaries — every
re-render would bloat history forever, and GitHub caps files at 100&nbsp;MB. So:

- **This repo** = the website only (`index.html`, `style.css`, `chapters.json`). Tiny, fast, versioned.
- **The videos** = hosted as GitHub Release assets and referenced by URL (see below). Master
  copies live in `~/animations/` (backed up to Drive), which is the single source of truth.

The website and the videos stay in sync through `chapters.json`.

## Adding or reordering modules

Everything is driven by `chapters.json` — no code changes needed.

1. Add the video file as an asset on the `videos-v1` GitHub Release
   (`gh release upload videos-v1 <file>.mp4 --repo alexagriffith/llm-d-course-site`).
2. Add an entry under the right section in `chapters.json`, with `src` set to the
   asset's **filename only** (order in the file = order on the page).
3. Commit + push. Done.

The site builds each video URL as `videoBase` + `/` + `src`. Any item whose `src` is
already a full `https://` URL is used as-is instead.

## Hosting the videos

The videos are hosted as assets on the **`videos-v1` GitHub Release** of this repo, and
`videoBase` in `chapters.json` points at that release's download URL:

```
https://github.com/alexagriffith/llm-d-course-site/releases/download/videos-v1
```

Because release assets are stored flat (no folders), each `src` in `chapters.json` is just
the filename. Master copies of all animations still live in `~/animations/` (backed up to
Drive); the release holds only the ~56&nbsp;MB the site actually references.

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
