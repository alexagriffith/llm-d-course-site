const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'shorts'),data=JSON.parse(fs.readFileSync(path.join(dir,'lessons.json')));
const ids=new Set();for(const x of data.lessons){assert(!ids.has(x.id),'Duplicate lesson');ids.add(x.id);assert(/^https:\/\/x\.com\/alexa_griffith_\/status\/\d+$/.test(x.publication?.url),'Unpublished chapter: '+x.id);assert(/^[a-f0-9]{64}$/.test(x.videoSha256),'Missing video hash');assert(fs.existsSync(path.join(dir,x.poster)),'Missing poster '+x.id);assert(!x.src.includes('/'),'Asset filename only');if(x.animation)assert(fs.existsSync(path.resolve(dir,x.animation.split('?')[0].replace(/\/$/,'/index.html'))),'Missing animation '+x.id);}
assert(fs.readFileSync(path.join(dir,'course.css'),'utf8').includes('video[hidden]'),'Hidden video rule missing');
for(const p of ['course.js','flow-control.html','shared-inference.html'])assert(fs.existsSync(path.join(dir,p)));
console.log('PASS: '+ids.size+' published lessons, unique IDs, publication URLs, hashes, posters, interactive assets and toggle rule.');
