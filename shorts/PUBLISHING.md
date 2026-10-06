# Published short courses

This is one part of the Inference Engineering learning hub. Keep Flow control and Shared inference as distinct courses alongside llm-d foundations. The root hub is the single course selector; courses.json owns course names and routes. The interactive learners remain the maintained references.

Only published posts enter `lessons.json`. Drafts and planned lessons stay in the private content pipeline. Do not expose future chapters, placeholder players, or unpublished videos on this page.

## Add a chapter after Alexa publishes

1. Confirm the live X post belongs to Alexa and contains the intended video. Record its URL and verification date. A saved draft or upload Ready state is insufficient.
2. Match the post to the reviewed local video and final copy in the canonical series manifest. If matching is uncertain, leave the chapter out and request only the missing evidence.
3. Retain the final post text; use concise lesson copy to explain a necessary technical qualification. Preserve the established video style. Compute the video's SHA-256, record its encoded width and height, and generate its poster.
4. Upload only that published lesson's video to the course release. Add the manifest entry with `publication` and `videoSha256`, in course order. Do not reorder or renumber the other course.
5. Run `node scripts/check-short-courses.cjs`. Review desktop/mobile layout before metadata loads, video playback on the actual course page, learner and post links, and interactive toggle if present. Capture a screenshot and retain video evidence in the private content record.
6. Commit only the intended files, push to `main` as authorized, and verify GitHub Pages plus the live media URL. Update the canonical work log.

Keep the paired `shared-inference/policy-lab/` and benchmark repository `learn/policy-lab/` sources synchronized when their animation changes. New policy examples can be maintained in the interactive learners before a social release, but do not add their short-video chapters to this course until the corresponding post is published.
