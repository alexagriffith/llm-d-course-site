# Background application integration — 2026-09-14

Scope: branch-only update; no deployment or cross-region behavior added.

The existing Request queue is a logical role, not a batch-job queue. Compatible
applications can produce inference messages without Batch Gateway. Result
collection is configured and correlated by request ID, not automatically routed
back to producers. Separate batch/background collector variants prevent implied
broadcast. This follows the pinned llm-d-async README standalone publisher and
subscriber example at d17f472292fcf14a121b9b68f827c77adbd19d09. Existing HTTP
classification and retry semantics are unchanged. The retry schedule is a
Redis-style example; transport implementations differ.

Consistency scope:
- Architecture: both producers in request overview; selectable background
  request/result examples, preserving live/sync/async filters.
- Queues: background variants of request, result and combined maps; admission
  remains a caller-independent routing explanation.
- Async eviction and all error mechanisms: select batch or application collector.
- Batch API remains explicitly batch-specific. Priority and control-plane topics
  have no producer dependency and are unchanged.

Checks performed:
- Static bundle check passes: six topics, 35 SVGs, script syntax, expected asset
  set, stable control slots/pager, one-elbow architecture response and no private
  project material. Background variants explicitly suppress batch collection.
- Built-in browser: loaded all six topics; each had diagram top 386 CSS px,
  width 1340 CSS px, controls 144 CSS px, and loaded image. Exercised architecture
  caller/direction filters, background queue directions, four background error
  modes, and background-to-batch heading restoration.
- Independent source/geometry review found stale headings, incorrect dimming IDs,
  inherited alt text and ambiguous default control labels; corrected.
- Offline rendering: all 11 background variants rendered. Inspected request
  candidate, combined queue and transport-failure layouts. Removed detached
  Final outcomes label from background variants.

Limitations: browser screenshots were clipped by the capture surface, so this
is not a full visual sign-off on every mode or a responsive/mobile certification.
No runtime inference workload was executed. User approval and live publication
remain separate from these checks.
