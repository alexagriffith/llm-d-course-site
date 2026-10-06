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
 const video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='none';video.poster=item.poster;video.src=data.videoBase+item.src;video.setAttribute('aria-label',item.title);video.width=item.width;video.height=item.height;video.style.aspectRatio=`${item.width} / ${item.height}`;
 const player=document.createElement('div');player.className='lesson-player';
 const play=document.createElement('button');play.className='lesson-play';play.textContent='▶ Play video';play.setAttribute('aria-label','Play '+item.title);
 const message=document.createElement('p');message.className='media-error';message.setAttribute('role','status');message.hidden=true;
 const showError=()=>{message.replaceChildren(document.createTextNode('Video could not load. '));const fallback=document.createElement('a');fallback.href=video.src;fallback.textContent='Open video directly';message.append(fallback);message.hidden=false;play.hidden=false;play.disabled=false;play.textContent='▶ Try again'};
 play.onclick=async()=>{play.disabled=true;play.textContent='Loading…';try{await video.play();message.hidden=true}catch{showError()}finally{play.disabled=false}};
 video.addEventListener('play',()=>{play.hidden=true});video.addEventListener('error',showError);
 player.append(video,play);
 video.addEventListener('play',()=>document.querySelectorAll('video').forEach(v=>{if(v!==video)v.pause()}));
 const tools=document.createElement('div');tools.className='tools';
 const link=document.createElement('a');link.href=item.learner;link.textContent='Open the learner →';tools.append(link);const original=document.createElement('a');original.href=item.publication.url;original.textContent='Published post ↗';tools.append(original);
 if(item.animation){const button=document.createElement('button');button.textContent='Try the animation';button.setAttribute('aria-expanded','false');let frame;button.onclick=()=>{if(frame){frame.remove();frame=null;player.hidden=false;button.textContent='Try the animation';button.setAttribute('aria-expanded','false');return}video.pause();player.hidden=true;frame=document.createElement('iframe');frame.src=item.animation;frame.title=item.title+' interactive animation';player.after(frame);button.textContent='Show video';button.setAttribute('aria-expanded','true')};tools.prepend(button)}
 const details=document.createElement('details'),summary=document.createElement('summary'),post=document.createElement('pre');summary.textContent='Post text';linkedText(post,item.post);details.append(summary,post);
 card.append(group,title,intro,player,message,tools,details);root.append(card);
}
if(location.hash)document.getElementById(location.hash.slice(1))?.scrollIntoView();
