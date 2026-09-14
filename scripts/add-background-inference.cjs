// Idempotent augmentation of the existing, versioned SVG snapshots.
const fs=require('node:fs'), path=require('node:path');
const dir=path.resolve(__dirname,'../shared-inference/review-candidates');
const node='<g id="background-application"><rect class="box box-batch" x="75" y="675" width="230" height="72" rx="10"/><text class="title" x="190" y="704">Background application</text><text class="micro" x="190" y="729" style="font-size:14px">Queue producer / consumer</text></g>';
const request='<g id="background-request"><path class="path-batch" d="M305 711 H525"/><text class="edge-label" x="410" y="691" text-anchor="middle">Inference request</text></g>';
const result='<g id="background-result"><path class="path-batch" d="M825 887 V918 Q825 938 805 938 H210 Q190 938 190 918 V747"/><text class="edge-label" x="330" y="924" text-anchor="middle">Result · request ID</text></g>';
for(const name of fs.readdirSync(dir).filter(n=>n.endsWith('.svg')&&!n.includes('-background'))){
 let svg=fs.readFileSync(path.join(dir,name),'utf8').replace(/<!-- background:start -->[\s\S]*?<!-- background:end -->/g,'');
 svg=svg.replaceAll('Optional async transport','Optional queued dispatch');
 const relevant=/^architecture-(requests|results)(-async)?\.svg$/.test(name)||/^queues-(requests|results|all)\.svg$/.test(name);
 if(relevant){
  const req=name.includes('requests')||name==='queues-all.svg';
  // Results default to the batch collector. A separate variant selects the
  // application collector; never imply broadcast to both consumers.
  const extra=req?node+request:'';
  svg=svg.replace('</svg>',`<!-- background:start -->${extra}<text x="55" y="62" fill="#aebdca" font-size="17">${req?'Batch or application can enqueue inference requests. Physical queues are configured.':'Batch result collector shown. Select Background to see application result collection.'}</text><!-- background:end --></svg>`);
 }
 fs.writeFileSync(path.join(dir,name),svg);
 if(relevant||/^retry(?:-server|-transport)?\.svg$/.test(name)||name==='queues-eviction-async.svg'){
  let variant=svg.replace(/<!-- background:start -->[\s\S]*?<!-- background:end -->/g,'').replace(/<text\b[^>]*>Final outcomes<\/text>/g,'');
  const req=name.includes('requests')||name==='queues-all.svg';
  const ret=!name.includes('requests');
  const css=`#async-publish-path,#result-collect,#queue-result-collection{display:none!important}#batch-ingress,#batch-api,#batch-job-queue,#batch-processor{opacity:.4!important}`;
  variant=variant.replace('</svg>',`<!-- background:start -->${node}${req?request:''}${ret?result:''}<style>${css}#background-request .edge-label,#background-result .edge-label{font-size:16px;fill:#c9b9ff}</style><text x="55" y="62" fill="#aebdca" font-size="17">Background application: compatible request messages; results collected from its configured output.</text><!-- background:end --></svg>`);
  fs.writeFileSync(path.join(dir,name.replace('.svg','-background.svg')),variant);
 }
}
