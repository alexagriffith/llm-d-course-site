// Idempotent augmentation of the existing, versioned SVG snapshots.
const fs=require('node:fs'), path=require('node:path');
const dir=path.resolve(__dirname,'../shared-inference/review-candidates');
const node='<g id="background-application"><rect class="box box-batch" x="75" y="675" width="230" height="72" rx="10"/><text class="title" x="190" y="711">Background application</text></g>';
const request='<g id="background-request"><path class="path-batch" d="M305 711 H388 Q400 693 412 711 H525"/><text class="edge-label" x="455" y="681" text-anchor="middle"><tspan x="455">Enqueue</tspan><tspan x="455" dy="18">requests</tspan></text></g>';
const batchLabel='<text id="batch-enqueue-label" class="edge-label" x="630" y="614" text-anchor="start">Enqueue requests</text>';
const result='<g id="background-result"><path class="path-batch" d="M825 887 V918 Q825 938 805 938 H210 Q190 938 190 918 V747"/><text class="edge-label" x="330" y="924" text-anchor="middle">Result · request ID</text></g>';
for(const name of fs.readdirSync(dir).filter(n=>n.endsWith('.svg')&&!n.includes('-background'))){
 let svg=fs.readFileSync(path.join(dir,name),'utf8').replace(/<!-- background:start -->[\s\S]*?<!-- background:end -->/g,'');
 svg=svg.replaceAll('Optional async transport','Optional queued dispatch');
 svg=svg.replace(/<text id="batch-enqueue-label"[^>]*>[^<]*<\/text>/g,'');
 svg=svg.replace(/(<g\b[^>]*id="async-publish-path"[^>]*>)([\s\S]*?)(<\/g>)/,(_,open,body,close)=>open+body+batchLabel+close);
 const relevant=/^architecture-(requests|results)(-async)?\.svg$/.test(name)||/^queues-(requests|results|all|eviction-async)\.svg$/.test(name)||/^retry(?:-server|-transport)?\.svg$/.test(name);
 if(relevant){
  svg=svg.replace(/<desc id="svg-desc">[\s\S]*?<\/desc>/,'<desc id="svg-desc">Shared queued inference supports batch processors and compatible background applications. Queue symbols are logical roles. Each workload collects from configured outputs using request IDs; result paths do not imply automatic routing or broadcast. Retry schedule is a Redis-style example.</desc>');
  const req=name.includes('requests')||name==='queues-all.svg'||name.startsWith('retry');
  const ret=!name.includes('requests');
  const requestPath=ret?request:request.replace('M305 711 H388 Q400 693 412 711 H525','M305 711 H525');
  const batchResultLabel=name.startsWith('architecture-results')?'<text id="batch-result-label" class="edge-label" x="435" y="790" text-anchor="end" style="font-size:16px;fill:#c9b9ff">Result · request ID</text>':'';
  const extra=node+(req?requestPath:'')+(ret?result:'')+batchResultLabel;
  svg=svg.replace('</svg>',`<!-- background:start -->${extra}<style>#background-request .edge-label,#background-result .edge-label{font-size:16px;fill:#c9b9ff}</style><!-- background:end --></svg>`);
 }
 if(['queues-protection.svg','queues-eviction.svg'].includes(name))svg=svg.replace('</svg>',`<!-- background:start -->${node}<style>#background-application{opacity:.4}</style><!-- background:end --></svg>`);
 fs.writeFileSync(path.join(dir,name),svg);
 if(relevant){
  // Preserve previously shared direct links, but retire the inconsistent filter.
  fs.writeFileSync(path.join(dir,name.replace('.svg','-background.svg')),svg);
 }
}
