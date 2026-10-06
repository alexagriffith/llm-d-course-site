# Shared inference

Six interactive, code-grounded topics: architecture, batch submission and execution,
priority, queues and overload, errors and retry, and control-plane objects.

`index.html` uses 37 SVGs in `review-candidates/` plus the optional animation adapter.
Keep the directory together when publishing. No build step or external library
is required. Deployment proposals and authoring/review controls are excluded.

These diagrams describe the audited implementations and optional configurations,
not a claim that every release or deployment enables every feature. Priority
does not by itself guarantee reserved capacity.

Background applications can publish compatible inference messages without Batch
Gateway. The architecture, queue-flow and async error views show batch and
background paths together, without an additional workload filter. The result
paths represent separately configured collectors, not automatic routing or broadcast.
The queue symbols represent roles, not a requirement to share physical queues.
The separate retry schedule depicts the Redis-style transport implementation.
See the pinned [standalone producer and result subscriber example](https://github.com/llm-d/llm-d-async/blob/d17f472292fcf14a121b9b68f827c77adbd19d09/README.md).

`node scripts/add-background-inference.cjs` reproducibly augments the checked-in
diagram snapshots, including the source-parity updates in
`scripts/update-shared-inference-semantics.cjs`; run the bundle check after regeneration.

## Source baseline

- Router: `d4b8afd3c265d1b94720de068bc5b96369c22354` (experimental flow-control implementation).
- Batch Gateway: `c5b979390015941546b553f34b1968fcf2db9f6e`.
- [Async HTTP client and error mapping](https://github.com/llm-d/llm-d-async/blob/d17f472292fcf14a121b9b68f827c77adbd19d09/pkg/asyncworker/http_client.go).
- KServe reconciliation: `193f65f4e`, `pkg/controller/v1alpha2/llmisvc/`.

Transport failure means the HTTP client reports an error without returning an
inference response object to its caller; it does not prove that the backend did
no work. Response-body read errors are a separate code path.

Run `node scripts/check-shared-inference.cjs` from the repository root to check
the bundle, scope, scripts and asset references. Browser interaction and visual
checks are separate from this static test.

The batch job queue is the PostgreSQL query/claim path over validating, unclaimed
batch rows. The API stores the job before acknowledging it. Input and output
file storage are separate from that queue; completed-file download uses the API
Server and file storage only. The input diagram repeats the same logical storage
role in the upload and processing phases. Request 1–3 show individual work items,
not a requirement to dispatch serially. See [source-parity review](BACKGROUND-REVIEW.md)
for current source pointers and validation boundaries.

## Optional walkthroughs

Architecture, batch and priority offer **Play walkthrough**, using the same SVGs and
renderer as the reviewed demo videos. The normal diagram layout remains the default.
**Show diagram**, changing a mode or changing topics stops playback and restores it.
The embedded player offers Play/Pause/Next scene; reduced-motion settings use manual
scene stepping. Keep `learner-animations.js` and `recording-view/` with the bundle.

The architecture walkthrough includes a separate background application submitting
and consuming a configured async result. The priority walkthrough highlights the
cached objective lookup and pool information used by Endpoint Picker. Highlights
do not depict a request-time Kubernetes API call. Pool membership and per-request
pod selection remain distinct.
