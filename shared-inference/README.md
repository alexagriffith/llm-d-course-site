# Shared inference

Six interactive, code-grounded topics: architecture, batch submission and execution,
priority, queues and overload, errors and retry, and control-plane objects.

`index.html` is self-contained except for the 35 SVGs in `review-candidates/`.
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
diagram snapshots; run the bundle check after regeneration.

## Source baseline

- Router: `166b75847dd609378efbb05d17f9068d174c967a` (experimental flow-control implementation).
- Batch Gateway: `32b1db5a2864884cb3e4274830d6cf0c7085fd03`.
- [Async HTTP client and error mapping](https://github.com/llm-d/llm-d-async/blob/d17f472292fcf14a121b9b68f827c77adbd19d09/pkg/asyncworker/http_client.go).
- KServe reconciliation: `193f65f4e`, `pkg/controller/v1alpha2/llmisvc/`.

Transport failure means the HTTP client reports an error without returning an
inference response object to its caller; it does not prove that the backend did
no work. Response-body read errors are a separate code path.

Run `node scripts/check-shared-inference.cjs` from the repository root to check
the bundle, scope, scripts and asset references. Browser interaction and visual
checks are separate from this static test.
