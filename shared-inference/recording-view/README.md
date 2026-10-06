# Shared learner animations

`architecture-demo.html`, `batch-demo.html` and `priority-demo.html` reuse the
maintained diagram assets through `architecture-demo.js`. Add `?embed=1` for the
learner player: only playback controls remain, and reduced-motion preferences
are respected. The default pages retain deterministic frame export controls for
video production. No external dependencies or build step are needed.

The ordinary learner loads these only after Play walkthrough. Changing a topic
or diagram setting removes the player, avoiding hidden background animation.
Timing is editorial; this is a conceptual request flow, not runtime measurements.
