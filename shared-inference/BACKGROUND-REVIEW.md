# Shared-inference source-parity review

## 2026-10-06 learner parity update

Fetched source refs without changing either source checkout. Effective pins:
Batch Gateway `c5b979390015941546b553f34b1968fcf2db9f6e`, router
`d4b8afd3c265d1b94720de068bc5b96369c22354`, async
`d17f472292fcf14a121b9b68f827c77adbd19d09`. KServe remains the previously
reviewed `193f65f4e` baseline; this pass does not refresh its reconciliation behavior.

All 37 snapshots receive consistent job queue and cached-objective terminology,
including hidden sibling groups and the 11 compatibility copies. The HTML retains
six topics, fixed control slots, collapsed Details, component layout and navigation.
Direct HTTP dispatch is distinguished from the asynchronous batch-job API. The
batch submission snapshot adds storage success and job-store acknowledgment;
input storage is shown twice to keep the upload and processing phases readable.
The output snapshots hide the job queue, show storage success, and list status,
output_file_id and content download in order. Priority names the current header
and cached objective lookup. Details explain controller-maintained pool/objective
state, concurrency, finalization, configured result destinations and retry limits.

| Mechanism | Versioned source evidence |
| --- | --- |
| API creates file ID, stores content/metadata, then replies | [file_handler.go:323–430](https://github.com/llm-d/llm-d-batch-gateway/blob/c5b979390015941546b553f34b1968fcf2db9f6e/internal/apiserver/file/file_handler.go#L323-L430) |
| API stores validating batch and returns; no separate initial enqueue | [batch_handler.go:177–222](https://github.com/llm-d/llm-d-batch-gateway/blob/c5b979390015941546b553f34b1968fcf2db9f6e/internal/apiserver/batch/batch_handler.go#L177-L222) |
| PostgreSQL selects and atomically claims unowned validating jobs, earliest SLO first | [batch_queue.go:101–130](https://github.com/llm-d/llm-d-batch-gateway/blob/c5b979390015941546b553f34b1968fcf2db9f6e/internal/database/postgresql/batch_queue.go#L101-L130) |
| Processor reads file metadata and stored contents; parses individual JSONL records | [fileio.go:130–158](https://github.com/llm-d/llm-d-batch-gateway/blob/c5b979390015941546b553f34b1968fcf2db9f6e/internal/processor/worker/fileio.go#L130-L158), [preprocessor.go:83–175](https://github.com/llm-d/llm-d-batch-gateway/blob/c5b979390015941546b553f34b1968fcf2db9f6e/internal/processor/worker/preprocessor.go#L83-L175) |
| Direct requests can run concurrently; configured admission limits dispatcher work | [dispatcher_direct.go:39–68](https://github.com/llm-d/llm-d-batch-gateway/blob/c5b979390015941546b553f34b1968fcf2db9f6e/internal/processor/pipeline/dispatcher_direct.go#L39-L68), [dispatcher_aimd.go:80–110](https://github.com/llm-d/llm-d-batch-gateway/blob/c5b979390015941546b553f34b1968fcf2db9f6e/internal/processor/pipeline/dispatcher_aimd.go#L80-L110) |
| Async dispatcher subscribes, records pending IDs, submits, then waits for collection | [dispatcher_async.go:41–71](https://github.com/llm-d/llm-d-batch-gateway/blob/c5b979390015941546b553f34b1968fcf2db9f6e/internal/processor/pipeline/dispatcher_async.go#L41-L71) |
| Finalization uploads nonempty files, stores metadata and records terminal file IDs | [finalizer.go:118–186](https://github.com/llm-d/llm-d-batch-gateway/blob/c5b979390015941546b553f34b1968fcf2db9f6e/internal/processor/worker/finalizer.go#L118-L186), [storage success:250–255](https://github.com/llm-d/llm-d-batch-gateway/blob/c5b979390015941546b553f34b1968fcf2db9f6e/internal/processor/worker/finalizer.go#L250-L255) |
| Client gets batch status, then downloads through API Server and storage without job queue | [batch_handler.go:367–393](https://github.com/llm-d/llm-d-batch-gateway/blob/c5b979390015941546b553f34b1968fcf2db9f6e/internal/apiserver/batch/batch_handler.go#L367-L393), [file_handler.go:602–649](https://github.com/llm-d/llm-d-batch-gateway/blob/c5b979390015941546b553f34b1968fcf2db9f6e/internal/apiserver/file/file_handler.go#L602-L649) |
| Current objective header and accepted legacy alias | [metadata/consts.go:45–48](https://github.com/llm-d/llm-d-router/blob/d4b8afd3c265d1b94720de068bc5b96369c22354/pkg/epp/metadata/consts.go#L45-L48) |
| Controller pool binding, unset priority normalization and local cached lookup | [inferenceobjective_reconciler.go:63–76](https://github.com/llm-d/llm-d-router/blob/d4b8afd3c265d1b94720de068bc5b96369c22354/pkg/epp/controller/inferenceobjective_reconciler.go#L63-L76), [datastore.go:202–236](https://github.com/llm-d/llm-d-router/blob/d4b8afd3c265d1b94720de068bc5b96369c22354/pkg/epp/datastore/datastore.go#L202-L236), [director.go:175–214](https://github.com/llm-d/llm-d-router/blob/d4b8afd3c265d1b94720de068bc5b96369c22354/pkg/epp/requestcontrol/director.go#L175-L214) |
| Producer defaults and result consumption; no automatic broadcast to both applications | [redis_sortedset_producer.go:187–194](https://github.com/llm-d/llm-d-async/blob/d17f472292fcf14a121b9b68f827c77adbd19d09/producer/redis_sortedset_producer.go#L187-L194), [BRPOP consumption:259–275](https://github.com/llm-d/llm-d-async/blob/d17f472292fcf14a121b9b68f827c77adbd19d09/producer/redis_sortedset_producer.go#L259-L275) |
| Result destination precedence: queue configuration, envelope, default | [sortedset_impl.go:730–753](https://github.com/llm-d/llm-d-async/blob/d17f472292fcf14a121b9b68f827c77adbd19d09/pkg/redis/sortedset_impl.go#L730-L753) |
| Ordinary send failure vs deadline/shutdown exceptions | [http_client.go:42–49](https://github.com/llm-d/llm-d-async/blob/d17f472292fcf14a121b9b68f827c77adbd19d09/pkg/asyncworker/http_client.go#L42-L49), [worker.go:300–345](https://github.com/llm-d/llm-d-async/blob/d17f472292fcf14a121b9b68f827c77adbd19d09/pkg/asyncworker/worker.go#L300-L345) |

Validation: static bundle and semantic checks; idempotent regeneration; offline SVG
rendering and desktop Chromium interaction checks across all 27 selectable states
(26 unique images): every image loaded, all diagram tops stayed at 382 CSS px,
control slots did not overflow and no JavaScript errors occurred. Inspected the changed batch
submission, output request/response, and priority renders. No inference workload was
executed; source semantics, rendered review, user acceptance and publication remain
separate. This update preserves existing UI behavior and does not claim new mobile
certification. Earlier reviews below retain their original source/version scope.

---

# Shared inference review — 2026-09-14

## Current revision — supersedes the selector design below

Latest caption and Details pass: removed both enqueue captions from the generator
and all 35 exports, preserving connectors. Inspected fresh architecture-request,
combined-queue and admission-retry renders. Rewrote Details using STYLE-LAW:
explicit actors, literal queue language, mechanism before limits, and full sentences.
Mode-specific explanations now precede shared queue notes. Shared notes use one
source across architecture, queues and retry. Retained pinned implementation
conditions and failure-path exceptions. Rechecked router objective lookup locally
and async worker cancellation/deadline handling against the pinned source below.
Built-in browser verified expanded Details in all five topics that have them;
all images loaded. Static consistency and whitespace checks passed. This scoped
pass does not expand the earlier browser-pixel or runtime validation claims.

Removed the extra workload selector, top narration and background-node subtext.
Both producers appear in shared request/return diagrams. Eleven old background
URLs are identical compatibility copies of the canonical views, not separate modes.

Independent technical audit confirmed pinned async/router/batch behavior and
existing KServe source evidence. Details now cover Async Processor objective-header
configuration and ordinary send failure versus shutdown cancellation, deadlines,
and response-body errors. Batch direct HTTP dispatch is distinguished from its
asynchronous job API. Results use configured destinations or supported routing
metadata; IDs correlate results, not consumers. No automatic broadcast is implied.

New source checks:
- [Result destination precedence](https://github.com/llm-d/llm-d-async/blob/d17f472292fcf14a121b9b68f827c77adbd19d09/pkg/redis/sortedset_impl.go#L730-L745)
- [Worker cancellation and error paths](https://github.com/llm-d/llm-d-async/blob/d17f472292fcf14a121b9b68f827c77adbd19d09/pkg/asyncworker/worker.go#L300-L348)
- [Async objective configuration](https://github.com/llm-d/llm-d-async/blob/d17f472292fcf14a121b9b68f827c77adbd19d09/README.md)

Independent offline visual review inspected all 24 canonical SVGs, then re-rendered
eight changed views. Fixed crossed enqueue labels, bridged the combined-flow
crossing, showed both retry producers, restored dim background context in admission
and live eviction, and labeled both architecture result returns. Final enqueue
inset adjustment was re-rendered and inspected in the combined map.

Built-in browser checked all 25 selectable states using 24 unique images: every
image loaded; diagram top remained 386 CSS px; control slots did not overflow.
Static bundle, alias equality, label and crossing checks pass. Browser captures
remain clipped: visual evidence is offline SVG inspection plus browser DOM/layout
and interaction checks, not full pixel-level browser/mobile certification. No
runtime inference workload was run; this is not user approval or live publication.

## October6 animation integration

Architecture, batch and priority now offer optional playback through the same
maintained SVG assets and `recording-view/architecture-demo.js`. Default diagrams
remain unchanged. Browser checks exercised all three playback entry points,
Play/Pause/Next scene, restoring the diagram on mode change, and removal of hidden
players on topic change. Architecture includes independent background submission
and configured result collection; priority distinguishes cached lookup, pool
membership and endpoint choice. Final source passes bundle/JS/whitespace checks.

## Historical a405d5d selector review (superseded)

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
