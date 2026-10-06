function linkedText(element,text){
 const pattern=/https:\/\/[^\s]+/g;let start=0;
 for(const match of text.matchAll(pattern)){element.append(document.createTextNode(text.slice(start,match.index)));const a=document.createElement('a');a.href=match[0];a.textContent=match[0];element.append(a);start=match.index+match[0].length}element.append(document.createTextNode(text.slice(start)));
}
const data=await fetch('lessons.json').then(r=>r.json());
const root=document.getElementById('lessons'),nav=document.getElementById('contents');root.textContent='';
const selected=data.lessons.filter(item=>item.publication?.url).filter(item=>document.body.dataset.course==='shared-inference'?item.id.startsWith('inference-'):!item.id.startsWith('inference-'));
for(const [i,item] of selected.entries()){
 const a=document.createElement('a');a.href='#'+item.id;a.textContent=`${i+1}. ${item.title}`;nav.append(a);
 const card=document.createElement('article');card.id=item.id;
 const group=document.createElement('div');group.className='group';group.textContent=item.group;
 const title=document.createElement('h2');title.textContent=`${i+1}. ${item.title}`;
 const intro=document.createElement('p');linkedText(intro,item.body);
 const video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='none';video.poster=item.poster;video.src=data.videoBase+item.src;video.setAttribute('aria-label',item.title);
 video.addEventListener('play',()=>document.querySelectorAll('video').forEach(v=>{if(v!==video)v.pause()}));
 const tools=document.createElement('div');tools.className='tools';
 const link=document.createElement('a');link.href=item.learner;link.textContent='Open the learner →';tools.append(link);const original=document.createElement('a');original.href=item.publication.url;original.textContent='Published post ↗';tools.append(original);
 if(item.animation){const button=document.createElement('button');button.textContent='Try the animation';button.setAttribute('aria-expanded','false');let frame;button.onclick=()=>{if(frame){frame.remove();frame=null;video.hidden=false;button.textContent='Try the animation';button.setAttribute('aria-expanded','false');return}video.pause();video.hidden=true;frame=document.createElement('iframe');frame.src=item.animation;frame.title=item.title+' interactive animation';video.after(frame);button.textContent='Show video';button.setAttribute('aria-expanded','true')};tools.prepend(button)}
 const details=document.createElement('details'),summary=document.createElement('summary'),post=document.createElement('pre');summary.textContent='Post text';linkedText(post,item.post);details.append(summary,post);
 card.append(group,title,intro,video,tools,details);root.append(card);
}
if(location.hash)document.getElementById(location.hash.slice(1))?.scrollIntoView();
