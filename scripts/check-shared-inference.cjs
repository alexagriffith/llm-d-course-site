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
assert.deepEqual(fs.readdirSync(path.join(section,'review-candidates')).sort(),expected);
for(const name of expected){
 const svg=fs.readFileSync(path.join(section,'review-candidates',name),'utf8');
 assert(svg.includes('<svg')&&svg.includes('</svg>'),name);
 assert(!/IBM|Behrendt|\/Users\/|<script|<foreignObject/i.test(svg),name);
 if(name.startsWith('architecture-results'))assert(svg.includes('M1000 351 V699 Q1000 711 988 711 H915'),name);
}
assert(fs.readFileSync(path.join(root,'index.html'),'utf8').includes('href="shared-inference/"'));
console.log('PASS: six topics,24 SVGs, one-elbow response, control hierarchy, stable slots/pager, no review/proposal/private content. Browser rendering remains a separate check.');
