const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const section=path.join(root,'shared-inference');
const html=fs.readFileSync(path.join(section,'index.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
const views=JSON.parse(script.match(/const views=(\[[^\n]+\]);/)[1]);
assert.deepEqual(views.map(v=>v.id),['architecture','batch','priority','queues','retry','objects']);
assert(!/deployment|IBM|Behrendt|\/Users\/|localStorage|clear scope checks|review criteria/i.test(html));
assert(html.includes('position:fixed;bottom:0'));
assert(html.includes('.view-controls{height:144px;'));
assert(html.includes("controls.append(group)"));
assert(html.includes("content:'Callers'"));assert(html.includes("content:'Show'"));
assert(html.includes("window.scrollTo(0,0)"));
const expected=[...['requests','results'].flatMap(f=>['','-live','-sync','-async'].map(c=>'architecture-'+f+c)),
 'batch-submission','batch','batch-results','priority','priority-ranking','queues-requests','queues-results','queues-all','queues-protection','queues-eviction','queues-eviction-async','retry','retry-server','retry-transport','objects-created','objects-routing'].map(n=>n+'.svg').sort();
const variants=expected.filter(n=>/^(architecture-(requests|results)(-async)?|queues-(requests|results|all|eviction-async)|retry(-server|-transport)?)\.svg$/.test(n)).map(n=>n.replace('.svg','-background.svg'));
expected.push(...variants);expected.sort();
assert.deepEqual(fs.readdirSync(path.join(section,'review-candidates')).sort(),expected);
assert(!html.includes('data-workload'), 'No redundant workload selector');
assert(!/for batch collection|batch processor collects it|Background app selects|Batch collector selects/.test(html),'No stale batch-only Details');
for(const name of variants){const svg=fs.readFileSync(path.join(section,'review-candidates',name),'utf8');assert(svg.includes('id="background-application"'),name);assert.equal(svg,fs.readFileSync(path.join(section,'review-candidates',name.replace('-background.svg','.svg')),'utf8'), 'Old links must show the same shared view');assert(!svg.includes('opacity:.4!important'),name);}
for(const name of expected){
 const svg=fs.readFileSync(path.join(section,'review-candidates',name),'utf8');
 assert(svg.includes('<svg')&&svg.includes('</svg>'),name);
 const background=svg.match(/<g id="background-application">([\s\S]*?)<\/g>/);
 if(background){
  assert.equal((background[1].match(/<text /g)||[]).length,1,`${name}: background title only, no subtext`);
  assert(background[1].includes('>Background application</text>'),name);
 }
 const entry=svg.match(/<g id="background-request">([\s\S]*?)<\/g>/);
 if(entry)assert(entry[1].includes('>Enqueue</tspan>')&&entry[1].includes('>requests</tspan>'),`${name}: consistent queue-entry label`);
 assert(!svg.includes('Queue producer / consumer'),name);
 assert(!svg.includes('<text x="55" y="62"'),'No added top narration');
 if(/^(retry(-server|-transport)?|queues-all)(-background)?\.svg$/.test(name)){
  assert(svg.includes('id="background-request"')&&svg.includes('id="background-result"'),name);
  assert(svg.includes('Q400 693 412 711'),`${name}: distinguish crossing from junction`);
 }
 assert(!/IBM|Behrendt|\/Users\/|<script|<foreignObject/i.test(svg),name);
 if(name.startsWith('architecture-results'))assert(svg.includes('M1000 351 V699 Q1000 711 988 711 H915'),name);
}
assert(fs.readFileSync(path.join(root,'index.html'),'utf8').includes('href="shared-inference/"'));
console.log(`PASS: six topics, ${expected.length} SVGs, configured background collectors, one-elbow response, stable slots/pager. Browser rendering remains a separate check.`);
