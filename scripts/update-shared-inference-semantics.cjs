// Idempotent source-parity updates; retain the reviewed SVG geometry and styles.
const fs=require('node:fs'),path=require('node:path');
const dir=path.resolve(__dirname,'../shared-inference/review-candidates');
for(const name of fs.readdirSync(dir).filter(n=>n.endsWith('.svg')&&!n.includes('-background'))){
 let svg=fs.readFileSync(path.join(dir,name),'utf8');
 svg=svg.replaceAll('<tspan x="465" y="498">Priority</tspan>','<tspan x="465" y="498">Job</tspan>')
  .replaceAll('x="465" y="540">batch jobs','x="465" y="540">PostgreSQL')
  .replaceAll('batch job priority queue','PostgreSQL job queue')
  .replaceAll('batch API enqueues · batch processor dequeues','API stores job · processor claims job')
  .replaceAll('>BatchJobPriority<','>PostgreSQL queue<').replaceAll('>PQEnqueue<','>Store validating job<').replaceAll('>Processor dequeues<','>Processor claims job<')
  .replaceAll('>Looks up objective priority<','>Reads cached objective priority<')
  .replaceAll('1. resolves the named InferenceObjective','1. reads the cached InferenceObjective')
  .replaceAll('>Sync HTTP requests<','>Direct HTTP requests<')
  .replaceAll('>HTTP request · objective name in header<','>x-llm-d-inference-objective: interactive<');
 svg=svg.replace(/<!-- source-parity:start -->[\s\S]*?<!-- source-parity:end -->/g,'');
 let extra='';
 if(name==='batch-submission.svg'){
  svg=svg.replace('>Enqueue job<','>Store job<').replace('>Dequeue job<','>Claim job<')
   .replace('x="780" y="587">Priority','x="780" y="587">Job').replace('x="780" y="625">batch jobs','x="780" y="625">PostgreSQL');
  extra='<g id="batch-upload-storage"><rect class="box box-batch" x="660" y="365" width="190" height="86" rx="9"/><text class="title" x="755" y="395">Input files</text><text class="review-copy" x="755" y="428" style="font-size:15px">Shared storage · JSONL</text><path class="path-batch" d="M550 400 H660"/><text class="review-copy" x="605" y="386" style="font-size:14px">Store input</text><path class="path-batch" d="M660 435 H550"/><text class="review-copy" x="605" y="461" style="font-size:14px">Stored</text></g><g id="batch-job-store-ack"><path class="path-batch" d="M700 630 H550"/><text class="review-copy" x="625" y="655" style="font-size:14px">Stored</text></g>';
 }
 if(name.startsWith('batch-output-')){
  svg=svg.replace('Later: download by file ID','1. Check status · GET /v1/batches/{id}');
  extra='<style>#batch-job-queue{display:none!important}</style><g id="batch-output-status-sequence"><text class="review-copy" x="232.5" y="785" style="font-size:15px">2. Read output_file_id from status</text><text class="review-copy" x="232.5" y="815" style="font-size:15px">3. GET /v1/files/{id}/content</text></g>';
  if(name==='batch-output-results.svg')extra+='<g id="batch-output-save-ack"><path class="path-batch" d="M420 300 H495 Q515 300 515 320 V496 Q515 516 535 516 H550"/><text class="review-copy" x="495" y="350" style="font-size:15px;text-anchor:end">Stored</text></g><text class="review-copy" x="232.5" y="755" style="font-size:16px">1. Check status · GET /v1/batches/{id}</text>';
 }
 if(extra)svg=svg.replace('</svg>',`<!-- source-parity:start -->${extra}<!-- source-parity:end --></svg>`);
 fs.writeFileSync(path.join(dir,name),svg);
}
