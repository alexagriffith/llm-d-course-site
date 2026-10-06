/* Shared playback/export adapter: maintained learner SVGs and explicit traffic edges. */
(async () => {
  const canvas = document.querySelector('#stage'), ctx = canvas.getContext('2d');
  const $ = id => document.getElementById(id), ns = 'http://www.w3.org/2000/svg';
  const embedded=new URLSearchParams(location.search).has('embed');
  if(embedded){const style=document.createElement('style');style.textContent='body{display:block;min-height:0;background:#07111d}canvas{width:100%;height:auto}nav{padding:10px;gap:8px}#focus,#frame,#export,#export-frames,#download{display:none!important}';document.head.append(style)}
  const batchOnly=document.documentElement.dataset.demo==='batch';
  const priorityOnly=document.documentElement.dataset.demo==='priority';
  let duration=30000;
  const blue='#80c4ff', violet='#c5adff';
  const diagramFont='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  // Each tuple: existing source edge, start/end within this scene, receiving node.
  const scenes = [
    {caller:'Live', flow:'Requests', asset:'architecture-requests-live', ms:4400, color:blue, crop:[465,105,1000,440], steps:[['#live-request-path path',450,2200,'#gateway-node'],['#selected-upstream-path',2700,3400,'#vllm-2-node']]},
    {caller:'Live', flow:'Responses', asset:'architecture-results-live', ms:4000, color:blue, crop:[465,105,1000,440], steps:[['#caller-response-upstream',300,900,'#gateway-node'],['#live-inference-response path',1300,3000,'#owner-live']]},
    {caller:'Batch', flow:'Direct HTTP request', asset:'architecture-requests-sync', ms:4700, color:violet, crop:[185,45,1180,755], steps:[['#sync-http-request-path',550,2300,'#gateway-node'],['#selected-upstream-path',2800,3500,'#vllm-2-node']]},
    {caller:'Batch', flow:'Direct HTTP response', asset:'architecture-results-sync', ms:4600, color:violet, crop:[185,45,1180,755], steps:[['#caller-response-upstream',450,1200,'#gateway-node'],['#sync-inference-return',1650,3450,'#batch-processor-node']]},
    {caller:'Async', flow:'Queued request (alternative)', asset:'architecture-requests-async', ms:5600, color:violet, crop:[185,45,1180,755], steps:[['#async-publish-path path',500,1300],['#async-consume-path path',1600,2000,'#async-processor-node'],['#async-http-request-path',2300,3600,'#gateway-node'],['#selected-upstream-path',4050,4700,'#vllm-2-node']]},
    {caller:'Async', flow:'Final results to batch processor', asset:'architecture-results-async', ms:6700, color:violet, crop:[185,45,1180,755], steps:[['#caller-response-upstream',350,900,'#gateway-node'],['#async-response-downstream',1200,2350,'#async-processor-node'],['#result-publish path',2650,3200],['#result-collect path',3550,5700,'#batch-processor-node']]}
  ];
  // Durations are editorial: allow reading time for file operations, keep transport brisk.
  scenes.forEach((s,i)=>s.ms=[1050,950,1700,1500,2800,2700][i]);
  scenes.push({caller:'Batch output',flow:'Save results',asset:batchOnly?'architecture-results-sync':'architecture-results-async',retrieval:true,ms:batchOnly?7100:6300,color:violet,crop:[185,45,1180,755],steps:[]});
  scenes.splice(2,0,{caller:'Batch input',flow:'Upload file → file ID',asset:'architecture-requests-sync',input:true,ms:9400,color:violet,crop:[185,45,1180,755],steps:[
    ['#bookend-upload',0,1,'#api-server-node'],['#bookend-store',0,1,'#architecture-output-storage-node'],['#bookend-input-stored',0,1,'#api-server-node'],['#bookend-file-id',0,1],
    ['#bookend-create',0,1,'#api-server-node'],['#bookend-enqueue',0,1],['#bookend-queued',0,1,'#api-server-node'],['#bookend-batch-id',0,1],['#bookend-dequeue',0,1,'#batch-processor-node'],
    ['#bookend-read-input',0,1,'#architecture-output-storage-node'],['#bookend-input-file',0,1,'#batch-processor-node']
  ]});
  const output=scenes[scenes.length-1];output.caller='Batch output';output.flow='Retrieve file';output.steps=[
    ['#bookend-save-output',0,1,'#architecture-output-storage-node'],['#bookend-output-stored',0,1,'#batch-processor-node'],['#bookend-status',0,1,'#api-server-node'],['#bookend-status-result',0,1],['#bookend-download',0,1,'#api-server-node'],
    ['#bookend-read-output',0,1,'#architecture-output-storage-node'],['#bookend-output-to-api',0,1,'#api-server-node'],['#bookend-output-file',0,1]
  ];
  // A separate compatible producer; its result queue is configured for this app.
  for(const response of [false,true])scenes.push({caller:'Async',background:true,flow:response?'Consume result':'Queued request',asset:response?'architecture-results-async':'architecture-requests-async',ms:1800,color:blue,crop:[185,45,1180,755],steps:response?[
    ['#caller-response-upstream',0,1,'#gateway-node'],['#async-response-downstream',0,1,'#async-processor-node'],['#result-publish path',0,1],['#demo-background-result',0,1]
  ]:[['#demo-background-request',0,1],['#async-consume-path path',0,1,'#async-processor-node'],['#async-http-request-path',0,1,'#gateway-node'],['#selected-upstream-path',0,1,'#vllm-2-node']]});
  const smooth = x => {x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};
  // Brief velocity ramps soften starts and stops without slowing the whole route.
  const travelEase=x=>{x=Math.max(0,Math.min(1,x));const ramp=.08,normal=1-ramp;return x<ramp?x*x/(2*ramp*normal):x>1-ramp?1-(1-x)*(1-x)/(2*ramp*normal):(x-ramp/2)/normal};
  let animation, elapsed=0, origin=0, running=false, recorder, chunks=[], downloadUrl;
  const image = async svg => {
    const img=new Image(), url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml'}));
    img.src=url;await img.decode();URL.revokeObjectURL(url);return img;
  };
  try {
    await Promise.all(scenes.map(async s => {
      const response=await fetch(`../review-candidates/${s.asset}.svg`);
      if(!response.ok) throw new Error(`Missing ${s.asset}`);
      const doc=new DOMParser().parseFromString(await response.text(),'image/svg+xml');
      const svg=doc.documentElement;
      if(s.retrieval){
        // Extend the same async response diagram; keep all existing components in place.
        svg.querySelector('#architecture-client-download-request').setAttribute('d','M225 516 H265');
        svg.querySelector('#architecture-storage-read-request').setAttribute('d','M355 480 V410');
        const request=svg.querySelector('#architecture-output-retrieval-request');
        request.querySelectorAll('rect,text').forEach(el=>el.remove());
        for(const [x,y,w,copy] of [[80,436,170,'Retrieve output'],[375,395,135,'Read output']]){
          const box=doc.createElementNS(ns,'rect');Object.entries({x,y,width:w,height:28,rx:4,fill:'#152b40',stroke:'#49677f',class:'connector-label-background'}).forEach(([k,v])=>box.setAttribute(k,v));
          const text=doc.createElementNS(ns,'text');Object.entries({x:x+w/2,y:y+20,class:'output-copy'}).forEach(([k,v])=>text.setAttribute(k,v));text.textContent=copy;request.append(box,text);
        }

        const override=doc.createElementNS(ns,'style');override.textContent='#architecture-output-storage,#architecture-output-persist,#architecture-output-retrieval-request,#architecture-output-retrieval-response{display:block!important}';svg.append(override);
      }
      const asyncResponseLabel=svg.querySelector('#async-response-path rect');
      if(asyncResponseLabel){asyncResponseLabel.setAttribute('x','905');asyncResponseLabel.setAttribute('width','190')}
      if(s.retrieval)svg.querySelector('#architecture-output-persist .output-copy').textContent='Save output file';
      // Responses retrace the request route without moving any component.
      svg.querySelector('#sync-inference-return').setAttribute('d','M880 315 C870 315 860 320 850 325 C790 350 760 516 680 516');
      svg.querySelector('#async-response-downstream').setAttribute('d','M880 315 C870 315 860 321 850 330 C820 370 825 510 825 675');
      for(const [group,x,y,w,copy] of [['#sync-inference-response',705,403,180,'HTTP response'],['#async-response-path',725,570,175,'HTTP response']]){
        const label=svg.querySelector(group+' rect'),text=svg.querySelector(group+' text');
        label.setAttribute('x',x);label.setAttribute('y',y);label.setAttribute('width',w);
        text.setAttribute('x',x+w/2);text.setAttribute('y',y+20);text.textContent=copy;
      }
      // Wrap long component names rather than shrinking type inside the boxes.
      const relabel=(selector,lines,x,y,size=26)=>{
        const label=svg.querySelector(selector);if(!label)return;
        label.textContent='';label.setAttribute('style',`font-size:${size}px!important;font-weight:700;text-anchor:middle;dominant-baseline:middle`);
        lines.forEach((line,i)=>{const span=doc.createElementNS(ns,'tspan');span.setAttribute('x',x);span.setAttribute('y',y+(i-(lines.length-1)/2)*Math.max(28,size+2));span.textContent=line;label.append(span)});
      };
      relabel('#batch-api .title',['API','Server'],325,516);
      relabel('#batch-processor .small-title',['Batch','processor'],615,516,24);
      relabel('#batch-job-queue .small-title',['Job','queue'],465,508,24);
      {
        svg.querySelector('#job-queue-node').setAttribute('d','M414 470 H516 A9 46 0 0 1 516 562 H414 A9 46 0 0 1 414 470 Z');
        svg.querySelector('#batch-job-queue .queue-rib').setAttribute('d','M414 470 A9 46 0 0 1 414 562 M516 470 A9 46 0 0 0 516 562');
        svg.querySelector('#batch-job-queue .micro').setAttribute('y','550');
      }
      relabel('#async-processor .title',['Async','Processor'],825,711);
      relabel('#async-queue .title',['Request','queue'],615,711);
      relabel('#result-shell .title',['Result','queue'],1065,711);
      // Shorten the empty live ingress span so its components can fill the frame.
      if(s.caller==='Live'){
        svg.querySelector('#owner-live').setAttribute('x','495');
        svg.querySelector('#live-origin .title').setAttribute('x','580');
        svg.querySelector('#live-request-path path').setAttribute('d','M665 315 H880');
        svg.querySelector('#live-inference-response path').setAttribute('d','M880 315 H665');
        svg.querySelector('#live-flow-label text').setAttribute('x','770');
        svg.querySelector('#live-inference-response rect').setAttribute('x','677');
        svg.querySelector('#live-inference-response text').setAttribute('x','763');
      }
      if(s.caller!=='Live'){
        // Enlarge type and box height in place, preserving the accepted arrangement.
        const larger=doc.createElementNS(ns,'style');larger.textContent='.title{font-size:28px!important}';svg.append(larger);
        for(const selector of ['#api-server-node','#batch-processor-node','#batch-shell > rect:first-child']){
          const box=svg.querySelector(selector);box.setAttribute('y','466');box.setAttribute('height','100');
        }
        relabel('#batch-shell > .title',['Batch','client'],140,516,32);
        relabel('#batch-api .title',['API','Server'],325,516,32);
        relabel('#batch-processor .small-title',['Batch','processor'],615,516,27);
        relabel('#batch-job-queue .small-title',['Job','queue'],465,509,27);
        svg.querySelector('#batch-job-queue .micro').textContent='PostgreSQL';
        relabel('#async-processor .title',['Async','Processor'],825,711,30);
        relabel('#async-queue .title',['Request','queue'],615,711,30);
        relabel('#result-shell .title',['Result','queue'],1065,711,30);
      }
      if(s.caller!=='Live'){
        svg.querySelector('#async-publish-path path').setAttribute('d','M615 566 V675');
        const collected=svg.querySelector('#result-collect path');collected.setAttribute('d',collected.getAttribute('d').replace('V552','V566'));
        svg.querySelector('#architecture-output-persist path').setAttribute('d','M615 466 V395 Q615 375 595 375 H420');
        if(s.retrieval){
          svg.querySelector('#architecture-storage-read-request').setAttribute('d','M355 466 V410');
          svg.querySelector('#architecture-storage-file-response').setAttribute('d','M325 410 V466');
          svg.querySelector('#architecture-client-file-response').setAttribute('d','M325 566 V630 Q325 650 305 650 H160 Q140 650 140 630 V566');
        }
      }
      // Phase is already in the large header. Keep the diagram itself stable and uncluttered.
      const phaseStyle=doc.createElementNS(ns,'style');phaseStyle.textContent='#batch-flow-label,#live-flow-label,#sync-flow-label,#async-flow-label,#live-inference-response rect,#live-inference-response text,#sync-inference-response rect,#sync-inference-response text,#async-response-path rect,#async-response-path text{display:none!important}';svg.append(phaseStyle);
      const translated=(el)=>{let x=0,y=0;for(let n=el;n&&n!==svg;n=n.parentElement){x+=Number(n.getAttribute('data-demo-x')||0);y+=Number(n.getAttribute('data-demo-y')||0)}return [x,y]};
      const shift=(selector,x,y)=>{const el=svg.querySelector(selector);if(el){el.style.setProperty('transform',`translate(${x}px, ${y}px)`,'important');el.setAttribute('data-demo-x',x);el.setAttribute('data-demo-y',y)}};
      // Direct and queued batch dispatch share exactly the same persistent component positions.
      if(s.caller!=='Live'){
        for(const id of ['batch-shell','batch-api','batch-job-queue','batch-processor'])shift('#'+id,150,-70);
        for(const id of ['entry','picker','pool','picker-consult','selected-upstream','caller-response-upstream'])shift('#'+id,-100,-60);
        svg.querySelector('#sync-http-request-path').setAttribute('d','M830 446 C875 446 900 365 900 291');
        svg.querySelector('#sync-inference-return').setAttribute('d','M900 291 C900 365 875 446 830 446');
      }
      if(s.caller==='Async'||s.retrieval){
        // Add queued dispatch below the unchanged direct-batch architecture.
        for(const id of ['async-shell','async-queue','async-processor'])shift('#'+id,150,-90);
        // Preserve the source parent wrapper (-240,+140), then move the lower queue up.
        shift('#result-shell',150,-130);
        shift('#architecture-retry-context',150,-130);
        const retryLabels=svg.querySelectorAll('#architecture-retry-context .small-title');
        retryLabels.forEach((label,i)=>{label.setAttribute('y',837+i*28);label.style.setProperty('font-size','26px','important')});
        const retryContext=doc.createElementNS(ns,'style');retryContext.textContent=`#architecture-retry-context{display:${batchOnly?'none':'block'}!important}#architecture-retry-context .micro{display:none!important}`;svg.append(retryContext);
        svg.querySelector('#owner-async').setAttribute('height','235');
        svg.querySelector('#async-publish-path path').setAttribute('d','M765 496 V515 Q765 530 750 530 H645 Q630 530 630 545 V606 Q630 621 645 621 H675');
        svg.querySelector('#async-consume-path path').setAttribute('d','M855 621 H885');
        svg.querySelector('#async-http-request-path').setAttribute('d','M975 585 C975 470 900 400 900 291');
        svg.querySelector('#async-response-downstream').setAttribute('d','M900 291 C900 400 975 470 975 585');
        svg.querySelector('#result-publish path').setAttribute('d','M975 657 V685');
        svg.querySelector('#result-collect path').setAttribute('d','M975 757 V760 Q975 780 955 780 H620 Q600 780 600 760 V560 Q600 545 615 545 H745 Q765 545 765 525 V496');
        if(s.retrieval)for(const id of ['architecture-output-storage','architecture-output-persist','architecture-output-retrieval-request','architecture-output-retrieval-response'])shift('#'+id,150,-70);
      }
      if(s.caller==='Async'){
        const app=svg.querySelector('#background-application');app.style.setProperty('display','block','important');app.style.opacity=s.background?'1':'.65';
        const box=app.querySelector('rect');for(const [key,value] of Object.entries({x:205,y:571,width:230,height:100}))box.setAttribute(key,value);
        relabel('#background-application .title',['Background','application'],320,621,26);
      }
      if(s.background){
        const context=doc.createElementNS(ns,'style');context.textContent='#batch-shell,#batch-api,#batch-job-queue,#batch-processor,#owner-batch{opacity:.25!important}';svg.append(context);
        // Logical queue roles stay in place; this destination belongs to the app.
        relabel('#result-shell .title',['App result','queue'],1065,711,28);
        for(const [id,d] of [['demo-background-request','M435 621 H675'],['demo-background-result','M975 757 V760 Q975 780 955 780 H340 Q320 780 320 760 V671']]){
          const edge=doc.createElementNS(ns,'path');edge.setAttribute('id',id);edge.setAttribute('d',d);edge.setAttribute('class','path-live');svg.append(edge);
        }
      }
      if(s.input||s.retrieval){
        s.focusCrop=[185,150,680,500];
        shift('#architecture-output-storage',150,-150);
        const storage=svg.querySelector('#architecture-output-storage-node');storage.setAttribute('height','90');
        svg.querySelector('#architecture-output-storage .title').textContent=s.input?'Input files':'Output files';
        const bookendStyle=doc.createElementNS(ns,'style');bookendStyle.textContent='#architecture-output-storage{display:block!important}#architecture-output-persist,#architecture-output-retrieval-request,#architecture-output-retrieval-response{display:none!important}';svg.append(bookendStyle);
        const shapes={
          upload:'M375 446 H415',store:'M475 396 V280','input-stored':'M475 280 V396',
          'file-id':'M415 446 H375','batch-id':'M415 446 H375',
          create:'M375 446 H415',enqueue:'M535 446 H555',queued:'M555 446 H535',dequeue:'M675 446 H700',
          'read-input':'M765 396 V271 C765 251 749 235 729 235 H570',
          'input-file':'M570 235 H729 C749 235 765 251 765 271 V396',
          'save-output':'M765 396 V271 C765 251 749 235 729 235 H570','output-stored':'M570 235 H729 C749 235 765 251 765 271 V396',download:'M375 446 H415',status:'M375 446 H415','status-result':'M415 446 H375',
          'read-output':'M475 396 V280','output-to-api':'M475 280 V396',
          'output-file':'M415 446 H375'
        };
        for(const [key,d] of Object.entries(shapes)){const edge=doc.createElementNS(ns,'path');edge.setAttribute('id','bookend-'+key);edge.setAttribute('d',d);edge.setAttribute('class','path-batch');edge.style.visibility='hidden';svg.append(edge)}
      }
      // Every scene owns its visible traffic edges. Request/setup/error paths cannot leak into a response.
      const visibleEdges=s.steps.map(([selector])=>selector).concat('#picker-extproc-path');
      const edgeStyle=doc.createElementNS(ns,'style');
      edgeStyle.textContent='svg > path:not(.box):not(.queue-rib),svg > g path:not(.box):not(.queue-rib){display:none!important}'+visibleEdges.map(selector=>`${selector}{display:block!important}`).join('');
      svg.append(edgeStyle);
      if(s.input){const establish=doc.createElementNS(ns,'style');establish.textContent='#sync-http-request-path,#selected-upstream-path{display:block!important;opacity:.5}';svg.append(establish)}
      if(s.caller==='Async'){
        const directContext=doc.createElementNS(ns,'path');directContext.setAttribute('d','M830 446 C875 446 900 365 900 291');
        directContext.setAttribute('style','display:block!important;fill:none;stroke:#8fa2b3;stroke-width:2;opacity:.25;marker-start:none;marker-end:none');svg.append(directContext);
      }
      if(s.caller==='Async'&&!s.background&&s.asset.includes('requests')){
        const background=doc.createElementNS(ns,'path');background.setAttribute('id','background-option');background.setAttribute('d','M435 621 H675');
        background.setAttribute('style','display:block!important;fill:none;stroke:#a78bfa;stroke-width:2;stroke-dasharray:5 6;opacity:.45;marker-end:url(#arrow-violet)');svg.append(background);
      }
      s.revealAsync=s.caller==='Async'&&!s.background&&s.asset.includes('requests');
      const callbackStyle=doc.createElementNS(ns,'style');callbackStyle.textContent='#picker-consult{display:block!important}';svg.append(callbackStyle);
      if(s.caller!=='Async'){const noBackground=doc.createElementNS(ns,'style');noBackground.textContent='#background-application{display:none!important}';svg.append(noBackground)}
      if(s.caller!=='Async'&&!s.retrieval){const noRetry=doc.createElementNS(ns,'style');noRetry.textContent='#architecture-retry-context{display:none!important}';svg.append(noRetry)}
      const framing=doc.createElementNS(ns,'style');framing.textContent=`.title{font-size:${s.caller==='Live'?26:28}px!important}.tag{font-size:16px!important;letter-spacing:0}.edge-label,.flow-label{font-size:16px!important;letter-spacing:0}#batch-job-queue .micro{font-size:13px!important}#background-request,#background-result,#architecture-requeue,#architecture-retry-write,#batch-result-label{display:none!important}`;svg.append(framing);
      s.paths=s.steps.map(([selector,start,end,node])=>{
        const el=svg.querySelector(selector);if(!el)throw new Error(`Missing edge ${selector} in ${s.asset}`);
        const p=document.createElementNS(ns,'path');p.setAttribute('d',el.getAttribute('d'));
        const [tx,ty]=translated(el);const length=p.getTotalLength(), samples=Array.from({length:241},(_,i)=>{const a=p.getPointAtLength(length*i/240);return [a.x+tx,a.y+ty]});
        const target=node?svg.querySelector(node):null;const [nx,ny]=target?translated(target):[0,0];
        return {selector,start,end,samples,length,node:target?Object.fromEntries(['x','y','width','height','rx'].map(k=>[k,Number(target.getAttribute(k)||0)+(k==='x'?nx:k==='y'?ny:0)])):null};
      });
      const live=s.caller==='Live';
      const lead=s.input||s.retrieval?1150:s.revealAsync?320:live?0:s.asset.includes('results')?0:80;
      const gap=live?0:40,hold=s.input?950:s.retrieval?500:s.background&&s.asset.includes('results')?400:live?0:60;
      const travel=s.ms-lead-gap*(s.paths.length-1)-hold;
      // Cap geometric weighting: a long return route must not dominate the story.
      const weights=s.input?[.7,.7,.6,1.1,.9,.6,.6,.8,.6,1.1,1.1]:s.retrieval?[1,1,1,1,1,1,1,1.3]:s.caller==='Async'&&s.asset.includes('results')?[.65,1,.6,1]:s.paths.map(p=>Math.max(130,Math.min(300,p.length)));
      const weight=weights.reduce((a,b)=>a+b,0);
      const inputPhases=['upload','upload','upload','upload','create','create','create','create','dequeue','read','read'];
      const inputCallouts=['Upload and store input file','Upload and store input file','Upload and store input file','Return file ID','Create and queue batch job','Create and queue batch job','Create and queue batch job','API returns batch ID','Dequeue batch job','Read input file → return contents','Read input file → return contents'];
      {
        for(const i of [4,5,6])inputCallouts[i]='Create and store batch job';
        inputCallouts[8]='Claim batch job';
      }
      const outputCallouts=['Save output file · confirm stored','Save output file · confirm stored','Status → output file ID','Status → output file ID','Retrieve output file','Retrieve output file','Retrieve output file','Retrieve output file'];
      const outputPhases=['save','save','status','status','retrieve','retrieve','retrieve','retrieve'];
      let cursor=lead;
      s.paths.forEach((p,i)=>{
        p.start=cursor;p.end=cursor+travel*weights[i]/weight;cursor=p.end+gap;
        s.steps[i][1]=p.start;s.steps[i][2]=p.end;
        p.phase=s.input?inputPhases[i]:s.retrieval?outputPhases[i]:null;
        p.callout=s.input?inputCallouts[i]:s.retrieval?outputCallouts[i]:null;
      });
      if(s.input||s.retrieval){
        // Keep one connection through each round trip; budget reading time, not transit delay.
        const starts=s.input?[1150,1550,2150,2750,3550,4200,4550,4900,5600,6200,7000]:[1150,1800,2400,2700,3100,3500,3900,4300];
        s.paths.forEach((p,i)=>{p.start=starts[i];p.end=i+1<starts.length?starts[i+1]-40:s.ms-500;s.steps[i][1]=p.start;s.steps[i][2]=p.end;});
      }
      s.paths.forEach(p=>{p.phaseEnd=s.paths.find(n=>n.start>p.start&&n.phase!==p.phase)?.start??s.ms;});
      {
        // HTTP pairs share neutral tracks; queued transfers appear only when active.
        // A future result-collection loop otherwise resembles an extra owner box.
        const tracks=doc.createElementNS(ns,'style');
        const httpEdges=['#live-request-path path','#live-inference-response path','#sync-http-request-path','#sync-inference-return','#async-http-request-path','#async-response-downstream','#selected-upstream-path','#caller-response-upstream'];
        tracks.textContent=visibleEdges.filter(x=>x!=='#picker-extproc-path').map(x=>httpEdges.includes(x)?`${x}{stroke:#617c8e!important;opacity:.45!important;marker-start:none!important;marker-end:none!important}`:`${x}{visibility:hidden!important}`).join('');svg.append(tracks);
      }
      // Keep labels legible and above the animated line. Paths are emphasized underneath labels.
      // Labels are rendered as an overlay; hidden SVG strokes can otherwise leave
      // marker glyphs behind. Only the canvas owns traffic arrowheads.
      svg.querySelectorAll('path').forEach(el=>{if(el.id!=='picker-extproc-path'||priorityOnly){
        el.style.setProperty('marker-start','none','important');
        el.style.setProperty('marker-end','none','important');
      }});
      if(priorityOnly&&s.caller==='Live'){
        // Same learner components and rendering as the published architecture clip.
        // Only this chapter's configuration reference and header value are added.
        svg.querySelector('#pool .tag').textContent='MODEL SERVER PODS';
        const extra=doc.createElementNS(ns,'g');extra.setAttribute('id','priority-context');
        const add=(tag,attrs,copy)=>{const el=doc.createElementNS(ns,tag);for(const [k,v]of Object.entries(attrs))el.setAttribute(k,v);if(copy)el.textContent=copy;extra.append(el);return el};
        add('rect',{x:700,y:10,width:310,height:78,rx:10,fill:'#0b1b2b',stroke:'#49677f','stroke-width':1.5});
        add('text',{x:720,y:39,class:'title',style:'font-size:24px!important;font-weight:500;fill:#b9c9d8;text-anchor:start'},'InferenceObjective');
        add('text',{x:720,y:69,class:'title',style:'font-size:23px!important;font-weight:600;text-anchor:start'},'interactive · priority 10');
        add('rect',{x:1185,y:10,width:260,height:78,rx:10,fill:'#0b1b2b',stroke:'#49677f','stroke-width':1.5});
        add('text',{x:1205,y:39,class:'title',style:'font-size:24px!important;font-weight:500;fill:#b9c9d8;text-anchor:start'},'InferencePool');
        add('text',{x:1205,y:69,class:'title',style:'font-size:23px!important;font-weight:600;text-anchor:start'},'Pod selector');
        add('text',{x:580,y:389,class:'title',style:'font-size:20px!important;fill:#b9c9d8'},'objective: interactive');
        // Structural relationships remain visible; EPP-use links are drawn by phase.
        add('line',{x1:1010,y1:49,x2:1185,y2:49,stroke:'#7890a5','stroke-width':2});
        add('text',{x:1097,y:30,class:'title',style:'font-size:23px!important;font-weight:500;fill:#b9c9d8'},'poolRef');
        add('line',{x1:1315,y1:88,x2:1315,y2:125,stroke:'#7890a5','stroke-width':2});
        svg.append(extra);
        const config=svg.cloneNode(true);
        for(const child of [...config.children])if(!['defs','style'].includes(child.tagName)&&child.id!=='priority-context')child.remove();
        const transparent=doc.createElementNS(ns,'style');transparent.textContent='svg{background:transparent!important}';config.append(transparent);
        s.configImage=await image(config);extra.remove();
      }
      s.image=await image(svg);
      if(s.revealAsync){
        const before=svg.cloneNode(true),hide=doc.createElementNS(ns,'style');
        hide.textContent=['#async-shell','#async-queue','#async-processor','#result-shell','#architecture-retry-context','#background-application','#background-option',...s.steps.map(([selector])=>selector)].map(selector=>`${selector}{display:none!important}`).join('');before.append(hide);s.beforeAsync=await image(before);
      }
      if(s.input||s.retrieval){
        const focused=svg.cloneNode(true),hide=doc.createElementNS(ns,'style');
        hide.textContent=['#entry','#picker','#pool','#picker-consult','#async-shell','#async-queue','#async-processor','#result-shell','#architecture-retry-context','#background-application','#sync-http-path','#selected-upstream','#caller-response-upstream'].map(selector=>`${selector}{display:none!important}`).join('');focused.append(hide);s.focusImage=await image(focused);
        const focusedLabels=focused.cloneNode(true),onlyText=doc.createElementNS(ns,'style');onlyText.textContent='svg{background:transparent!important}path,line,polyline,polygon,circle,ellipse,rect:not(.connector-label-background){visibility:hidden!important}';focusedLabels.append(onlyText);s.focusLabels=await image(focusedLabels);
      }
      const labels=svg.cloneNode(true), style=doc.createElementNS(ns,'style');
      style.textContent='svg{background:transparent!important}path,line,polyline,polygon,circle,ellipse,rect:not(.connector-label-background){visibility:hidden!important}';labels.append(style);s.labels=await image(labels);
    }));
    // One continuity rule for all request/response pairs. Return geometry is derived
    // from its request, so later layout edits cannot silently create a second route.
    let pairCount=0;
    const pair=(request,response)=>{
      if(!request||!response)throw new Error('Missing request/response pair');
      const distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
      if(distance(request.samples[0],response.samples.at(-1))>1||distance(request.samples.at(-1),response.samples[0])>1)throw new Error('Request/response ports differ: '+response.selector);
      response.samples=request.samples.slice().reverse();response.length=request.length;pairCount++;
    };
    for(const scene of scenes){
      if(scene.input||scene.retrieval){
        const pairs=scene.input?[['upload','file-id'],['store','input-stored'],['create','batch-id'],['enqueue','queued'],['read-input','input-file']]:[['save-output','output-stored'],['status','status-result'],['download','output-file'],['read-output','output-to-api']];
        for(const [from,to] of pairs)pair(scene.paths.find(p=>p.selector==='#bookend-'+from),scene.paths.find(p=>p.selector==='#bookend-'+to));
      }else if(scene.asset.includes('results')){
        const request=scenes.find(s=>s.caller===scene.caller&&Boolean(s.background)===Boolean(scene.background)&&s.asset.includes('requests')&&!s.input);
        scene.carryPaths=request.paths.slice(-2);
        scene.paths.slice(0,2).forEach((p,i)=>pair(scene.carryPaths[1-i],p));
      }
    }
    if(pairCount!==17)throw new Error('Incomplete continuity pass');
    // Close-ups run as connected exchanges. Brief node handoffs replace the old
    // fast-arrow/long-pause rhythm; reading holds follow completed outcomes.
    for(const s of scenes.filter(s=>s.focusCrop)){
      const scale=Math.min(1392/s.focusCrop[2],896/s.focusCrop[3]);
      let cursor=1150;
      const holds=s.input?{3:650,7:500,8:180}:batchOnly?{1:550,2:200,3:570}:{1:550};
      for(let i=0;i<s.paths.length;i++){
        const p=s.paths[i];p.start=cursor;
        p.moveMs=Math.max(280,Math.min(680,p.length*scale/.85));
        p.arrival=p.start+p.moveMs;p.end=p.arrival;
        cursor=p.arrival+85+(holds[i]||0);
        s.steps[i][1]=p.start;s.steps[i][2]=p.end;
      }
      // Use spare time for the final returned result, never an idle transit gap.
      if(cursor>s.ms-850)throw new Error('Close-up exceeds reading/zoom budget');
      s.paths.forEach(p=>{p.phaseEnd=s.paths.find(n=>n.start>p.start&&n.phase!==p.phase)?.start??s.ms;});
    }

    for(const s of scenes)for(const p of s.paths){
      p.fullPath=new Path2D();p.fullPath.moveTo(...p.samples[0]);for(const point of p.samples.slice(1))p.fullPath.lineTo(...point);
    }
    if(batchOnly){
      // Show one representative inference exchange; the processor can dispatch
      // many requests concurrently subject to its configured limits.
      const input=scenes.find(s=>s.input),output=scenes.find(s=>s.retrieval);
      const request=scenes.find(s=>s.caller==='Batch'&&!s.input&&!s.retrieval&&s.asset.includes('requests'));
      const response=scenes.find(s=>s.caller==='Batch'&&!s.input&&!s.retrieval&&s.asset.includes('results'));
      const exchanges=[
        {...request,caller:'Batch',flow:'Request'},
        {...response,caller:'Batch',flow:'Response'}
      ];
      scenes.splice(0,scenes.length,input,...exchanges,output);
      duration=scenes.reduce((total,s)=>total+s.ms,0);
    }
    if(priorityOnly){
      const req=scenes.find(s=>s.caller==='Live'&&s.asset.includes('requests'));
      const res=scenes.find(s=>s.caller==='Live'&&s.asset.includes('results'));
      const ext=(reverse,start,end)=>{const points=reverse?[[1000,247],[1000,279]]:[[1000,279],[1000,247]];
        const samples=Array.from({length:241},(_,i)=>points[0].map((v,j)=>v+(points[1][j]-v)*i/240));
        const fullPath=new Path2D();fullPath.moveTo(...points[0]);fullPath.lineTo(...points[1]);
        return {selector:reverse?'priority-ext-return':'priority-ext-request',samples,length:32,start,end,fullPath};};
      const introMs=2200;
      const a={...req,ms:9700,priority:true,crop:[465,0,1000,545],paths:[
        {...req.paths[0],start:200,end:1050},ext(false,1050,1450),ext(true,4650,5050),{...req.paths[1],start:5200,end:5950}
      ]};
      const b={...res,ms:3000,priority:true,crop:[465,0,1000,545],carryPaths:[a.paths[0],a.paths[3]],paths:[
        {...res.paths[0],start:0,end:550},ext(false,600,1000),ext(true,1050,1450),{...res.paths[1],start:1500,end:2450}
      ]};
      a.paths=a.paths.map(p=>({...p,start:p.start+introMs,end:p.end+introMs}));
      scenes.splice(0,scenes.length,a,b);duration=12700;
    }
    let offset=0;scenes.forEach(s=>{s.offset=offset;offset+=s.ms});if(Math.abs(offset-duration)>0.01)throw new Error('Unexpected duration');
    const drawScene=(s,t,alpha=1)=>{
      ctx.save();ctx.globalAlpha=alpha;ctx.fillStyle='#edf4fb';ctx.font=`600 48px ${diagramFont}`;ctx.fillText(batchOnly?'Batch inference':'Shared inference',48,75);
      ctx.fillStyle=s.color;ctx.font=`500 34px ${diagramFont}`;const current=s.paths.filter(p=>t>=p.start).at(-1)||((s.input||s.retrieval)?s.paths[0]:null);const phase=s.priority?(s.asset.includes('results')?'Response':'Request'):current?.phase||s.flow;if(!s.priority)ctx.fillText(s.focusCrop?s.caller:`${s.background?'Background app':s.caller==='Async'?'Batch (async)':s.caller} · ${phase}`,48,128);
      // Trim unused SVG margins; each caller keeps identical request/response framing.
      let focus=s.focusCrop?smooth((t-400)/650):0;if(s.input)focus*=1-smooth((t-(s.ms-700))/700);
      const crop=s.focusCrop?s.crop.map((v,i)=>v+(s.focusCrop[i]-v)*focus):s.crop;
      const [x,y,w,h]=crop, bodyHeight=s.priority?690:s.caller==='Live'?860:896, bodyTop=s.priority?95:s.caller==='Live'?174:164, scale=Math.min((s.caller==='Live'?1344:1392)/w,bodyHeight/h), dx=(1440-w*scale)/2,dy=bodyTop+(bodyHeight-h*scale)/2;
      ctx.save();ctx.translate(dx-x*scale,dy-y*scale);ctx.scale(scale,scale);ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();const reveal=s.revealAsync?smooth(t/320):1;if(s.focusImage&&focus>0){ctx.save();ctx.globalAlpha*=1-focus;ctx.drawImage(s.image,0,0,1500,970);ctx.restore();ctx.save();ctx.globalAlpha*=focus;ctx.drawImage(s.focusImage,0,0,1500,970);ctx.restore()}else if(reveal<1){ctx.drawImage(s.beforeAsync,0,0,1500,970);ctx.save();ctx.globalAlpha*=reveal;ctx.drawImage(s.image,0,0,1500,970);ctx.restore()}else ctx.drawImage(s.image,0,0,1500,970);
      if(s.priority){
        // Retain the source's node outlines; use a single quiet focus outline to
        // make the current decision visible without glows or moving components.
        const isResponse=s.asset.includes('results');
        ctx.save();ctx.globalAlpha*=isResponse?1:smooth(t/320);ctx.drawImage(s.configImage,0,0,1500,970);ctx.restore();
        // Reveal a complete configuration relationship only for its explanation.
        // Opacity is editorial emphasis, not a request-time Kubernetes RPC.
        if(!isResponse){
          const connection=(start,end,segments,box)=>{
            const opacity=Math.min(smooth((t-start)/180),smooth((end-t)/180));
            if(opacity<=0)return;
            ctx.save();ctx.globalAlpha*=opacity;ctx.strokeStyle='#7890a5';ctx.lineWidth=2;
            for(const [x1,y1,x2,y2]of segments){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}
            ctx.strokeStyle='#80c4ff';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(...box,10);ctx.stroke();
            ctx.restore();
          };
          connection(3650,5700,[[900,88,900,175]],[700,10,310,78]);
          connection(5700,7400,[[1185,75,1100,175]],[1185,10,260,78]);
        }
        const requestTime=t-2200;
        const selected=isResponse||requestTime>=3500;
        if(!isResponse&&requestTime>=3500&&requestTime<5200){ctx.save();ctx.globalAlpha*=Math.min(smooth((requestTime-3500)/180),smooth((5200-requestTime)/180));ctx.strokeStyle='#80c4ff';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(880,175,240,72,10);ctx.stroke();ctx.restore();}
        if(selected){ctx.save();ctx.globalAlpha*=smooth((isResponse?t+500:requestTime-3500)/220);ctx.strokeStyle='#edf4fb';ctx.lineWidth=2.5;ctx.beginPath();ctx.roundRect(1202,276,226,78,10);ctx.stroke();ctx.restore();}
      }
      // Preserve completed HTTP tracks across every caller's response transition.
      if(s.carryPaths){
        ctx.strokeStyle=s.color;ctx.lineWidth=5;ctx.lineCap='round';ctx.lineJoin='round';
        for(const p of s.carryPaths)ctx.stroke(p.fullPath);
      }
      for(const p of s.paths){
        const phaseOpacity=p.phase&&p.phase!==phase?1-smooth((t-p.phaseEnd)/240):1;
        if(phaseOpacity<=0)continue;
        // Match the async motion curve. Travel time follows visible distance,
        // rather than forcing long return loops into the short-hop duration.
        const closeupScale=s.focusCrop?Math.min(1392/s.focusCrop[2],896/s.focusCrop[3]):1;
        const moveMs=p.moveMs??(s.focusCrop?Math.min(p.end-p.start-100,Math.max(160,p.length*closeupScale/1.05)):p.end-p.start);
        const arrival=p.start+moveMs;
        const progress=travelEase((t-p.start)/(arrival-p.start));if(!progress)continue;
        const end=progress*240,index=Math.floor(end), a=p.samples[index],b=p.samples[Math.min(index+1,240)],f=end-index,tip=[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f];
        ctx.save();ctx.globalAlpha*=phaseOpacity;ctx.strokeStyle=s.color;ctx.lineWidth=5;ctx.lineCap='round';ctx.lineJoin='round';if(progress===1)ctx.stroke(p.fullPath);else{ctx.beginPath();ctx.moveTo(...p.samples[0]);for(let i=1;i<=index;i++)ctx.lineTo(...p.samples[i]);ctx.lineTo(...tip);ctx.stroke();}
        if(p===current){const headOpacity=s.focusCrop?Math.min(smooth((t-p.start)/65),1-smooth((t-((s.paths[s.paths.indexOf(p)+1]?.start??s.ms)-85))/80)):1;ctx.globalAlpha*=headOpacity;const sampleAt=u=>{u=Math.max(0,Math.min(240,u));const j=Math.floor(u),a=p.samples[j],b=p.samples[Math.min(240,j+1)],f=u-j;return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f]};const delta=3/p.length*240,q=sampleAt(end-delta),r=sampleAt(end+delta),angle=Math.atan2(r[1]-q[1],r[0]-q[0]);ctx.save();ctx.translate(...tip);ctx.rotate(angle);ctx.beginPath();ctx.moveTo(-11,-6);ctx.lineTo(0,0);ctx.lineTo(-11,6);ctx.stroke();ctx.restore();}

        ctx.restore();
      }
      if(reveal>=1){if(s.focusLabels&&focus>0){ctx.save();ctx.globalAlpha*=focus;ctx.drawImage(s.focusLabels,0,0,1500,970);ctx.restore();ctx.save();ctx.globalAlpha*=1-focus;ctx.drawImage(s.labels,0,0,1500,970);ctx.restore()}else ctx.drawImage(s.labels,0,0,1500,970);}
      ctx.restore();
      if(s.priority){
        const response=s.asset.includes('results');
        const copy=response?'Return response through the gateway':
          t<2200?'Endpoint Picker watches both resources':t<3650?'Request carries objective: interactive':t<5700?'Look up the cached objective’s priority':t<7400?'Endpoint Picker selects a pod':'Gateway forwards to the selected pod';
        // Same fixed-caption treatment as batch; raised above social video controls.
        ctx.save();ctx.fillStyle='#0c2136';ctx.strokeStyle='#54a7ff';ctx.lineWidth=1.5;
        ctx.beginPath();ctx.roundRect(260,782,920,72,12);ctx.fill();ctx.stroke();
        ctx.font=`650 32px ${diagramFont}`;ctx.fillStyle='#edf4fb';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(copy,720,819);ctx.restore();
      }
      // Screen-space caption stays fixed while the diagram camera and arrows move.
      if(current?.callout&&focus>0){
        ctx.save();ctx.globalAlpha*=focus;
        ctx.fillStyle='#1b1836';ctx.strokeStyle='#a78bfa';ctx.lineWidth=1.5;
        ctx.beginPath();ctx.roundRect(310,977,820,72,12);ctx.fill();ctx.stroke();
        ctx.font=`650 34px ${diagramFont}`;ctx.fillStyle='#edf4fb';ctx.textAlign='center';ctx.textBaseline='middle';
        const i=s.paths.indexOf(current);let first=i,last=i;
        while(first>0&&s.paths[first-1].callout===current.callout)first--;
        while(last+1<s.paths.length&&s.paths[last+1].callout===current.callout)last++;
        const next=s.paths[last+1];
        // Keep one readable label through short request/acknowledgment exchanges.
        const fadeIn=first?smooth((t-s.paths[first].start)/90):1;
        const fadeOut=next?smooth((next.start-t)/90):1;
        ctx.globalAlpha*=Math.min(fadeIn,fadeOut);ctx.fillText(current.callout,720,1014);ctx.restore();
      }
      ctx.restore();
    };
    const render=t=>{
      t=Math.max(0,Math.min(duration-1,t));const index=scenes.findIndex(s=>t<s.offset+s.ms),s=scenes[index],local=t-s.offset;
      ctx.fillStyle='#07111d';ctx.fillRect(0,0,1440,1080);
      if(index&&s.caller!==scenes[index-1].caller&&!s.retrieval&&!s.revealAsync&&!scenes[index-1].input&&local<280){const a=smooth(local/280);drawScene(scenes[index-1],scenes[index-1].ms,1-a);drawScene(s,local,a)}else drawScene(s,local);
      canvas.setAttribute('aria-label',`Shared inference: ${s.caller}, ${s.flow}`);canvas.dataset.scene=s.asset;canvas.dataset.time=String(Math.round(t));
    };
    const finish=()=>{running=false;$('pause').disabled=true;$('play').disabled=false;$('next').disabled=false;$('focus').disabled=false;$('export').disabled=false;$('export-frames').disabled=false;if(recorder?.state==='recording')recorder.stop();$('status').textContent=`Finished · ${duration/1000} seconds`};
    const tick=now=>{elapsed=Math.min(duration,now-origin);render(elapsed);if(elapsed<duration)animation=requestAnimationFrame(tick);else finish()};
    const play=()=>{cancelAnimationFrame(animation);running=true;origin=performance.now()-elapsed;$('play').disabled=true;$('next').disabled=true;$('focus').disabled=true;$('export').disabled=true;$('export-frames').disabled=true;$('pause').disabled=Boolean(recorder?.state==='recording');$('status').textContent='Playing';animation=requestAnimationFrame(tick)};
    $('focus').onclick=()=>{cancelAnimationFrame(animation);running=false;const s=scenes.find(s=>elapsed<s.offset+s.ms)||scenes[scenes.length-1];elapsed=s.offset+s.ms*.55;render(elapsed);$('status').textContent='Midpoint preview'};
    $('frame').onclick=()=>{const a=document.createElement('a');a.download='architecture-frame.png';a.href=canvas.toDataURL('image/png');a.click()};
    $('play').onclick=()=>{elapsed=0;play()};
    $('pause').onclick=()=>{cancelAnimationFrame(animation);running=false;$('pause').disabled=true;$('play').disabled=false;$('next').disabled=false;$('focus').disabled=false;$('export').disabled=false;$('export-frames').disabled=false;$('status').textContent='Paused'};
    $('next').onclick=()=>{const i=scenes.findIndex(s=>elapsed<s.offset+s.ms);elapsed=scenes[(i+1)%scenes.length].offset+scenes[(i+1)%scenes.length].ms-1;render(elapsed);$('status').textContent='Scene preview'};
    $('export').onclick=()=>{
      if(!canvas.captureStream||!window.MediaRecorder){$('status').textContent='Video export unavailable in this browser';return}
      chunks=[];const stream=canvas.captureStream(60);recorder=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp9',videoBitsPerSecond:12000000});
      recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
      recorder.onstop=()=>{stream.getTracks().forEach(t=>t.stop());if(downloadUrl)URL.revokeObjectURL(downloadUrl);downloadUrl=URL.createObjectURL(new Blob(chunks,{type:'video/webm'}));$('download').href=downloadUrl;$('download').textContent='Download video';$('download').hidden=false;$('status').textContent='Video ready to download';};
      $('download').download='01-architecture-continuous.webm';elapsed=0;render(0);recorder.start();play();
    };
    // Deterministic export avoids dropped capture frames and browser video-encoder artifacts.
    // JPEG frames are loss-minimized at quality .98; encode the downloaded tar at60fps.
    $('export-frames').onclick=async()=>{
      cancelAnimationFrame(animation);running=false;
      const controls=['play','pause','next','focus','export','export-frames'];controls.forEach(id=>$(id).disabled=true);
      const parts=[],encoder=new TextEncoder(),fps=60,count=Math.round(duration*fps/1000);
      const field=(header,offset,size,value)=>header.set(encoder.encode(value).subarray(0,size),offset);
      try{
        for(let i=0;i<count;i++){
          render(i*1000/fps);
          const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Frame encoding failed')),'image/jpeg',.98));
          const header=new Uint8Array(512),name=`frame-${String(i).padStart(5,'0')}.jpg`;
          field(header,0,100,name);field(header,100,8,'0000644\0');field(header,108,8,'0000000\0');field(header,116,8,'0000000\0');
          field(header,124,12,blob.size.toString(8).padStart(11,'0')+'\0');field(header,136,12,'00000000000\0');
          header.fill(32,148,156);header[156]=48;field(header,257,6,'ustar\0');field(header,263,2,'00');
          const sum=header.reduce((a,b)=>a+b,0);field(header,148,8,sum.toString(8).padStart(6,'0')+'\0 ');
          parts.push(header,blob,new Uint8Array((512-blob.size%512)%512));
          if(i%30===0){$('status').textContent=`Exporting frames ${i+1}/${count}`;await new Promise(requestAnimationFrame)}
        }
        parts.push(new Uint8Array(1024));
        if(downloadUrl)URL.revokeObjectURL(downloadUrl);
        downloadUrl=URL.createObjectURL(new Blob(parts,{type:'application/x-tar'}));
        $('download').href=downloadUrl;$('download').download=priorityOnly?'03-priority-config-focus-frames.tar':batchOnly?'02-batch-dedicated-frames.tar':'01-architecture-background-final-frames.tar';$('download').textContent='Download frames';$('download').hidden=false;
        $('status').textContent=`Frame sequence ready · ${count} frames at ${fps} fps`;
      }catch(error){$('status').textContent=error.message;console.error(error)}
      finally{controls.filter(id=>id!=='pause').forEach(id=>$(id).disabled=false)}
    };
    $('export-frames').disabled=false;
    render(0);$('play').disabled=false;$('next').disabled=false;$('focus').disabled=false;$('export').disabled=false;$('status').textContent=`Ready · ${duration/1000} seconds`;document.documentElement.dataset.demoReady='true';canvas.dataset.continuityPairs=String(pairCount);
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){render(scenes[0].ms-1);$('status').textContent='Reduced motion · use Next scene'}else if(embedded){play()}
  }catch(error){$('status').textContent=error.message;document.documentElement.dataset.demoError=error.message;console.error(error)}
})();
