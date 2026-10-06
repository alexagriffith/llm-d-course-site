// Optional playback reuses the same source and motion as the reviewed social demos.
// The ordinary diagram and its existing controls remain the default view.
(() => {
  const demos={architecture:'architecture',batch:'batch',priority:'priority'};
  const style=document.createElement('style');
  style.textContent='.learner-animation{display:block;width:100%;border:1px solid #364f67;border-radius:6px;background:#07111d}.candidate-tools .animation-toggle{margin-right:12px;font-size:13px}';
  document.head.append(style);
  const resets=[];
  for(const [id,demo] of Object.entries(demos)){
    const card=document.getElementById(id),figure=card.querySelector('.candidate'),diagram=figure.querySelector('a'),tools=figure.querySelector('.candidate-tools');
    const button=document.createElement('button');button.type='button';button.className='animation-toggle';button.textContent='Play walkthrough';button.setAttribute('aria-expanded','false');
    let frame,resize;
    const reset=()=>{frame?.remove();resize?.disconnect();frame=null;diagram.hidden=false;button.textContent='Play walkthrough';button.setAttribute('aria-expanded','false')};
    button.onclick=()=>{
      if(frame){reset();return}
      frame=document.createElement('iframe');frame.className='learner-animation';frame.title=card.querySelector('h2').textContent+' animated walkthrough';frame.src=`recording-view/${demo}-demo.html?embed=1`;frame.id=id+'-animation';
      button.setAttribute('aria-controls',frame.id);button.setAttribute('aria-expanded','true');button.textContent='Show diagram';diagram.hidden=true;diagram.after(frame);
      resize=new ResizeObserver(()=>{if(frame)frame.style.height=Math.ceil(figure.clientWidth*.75+112)+'px'});resize.observe(figure);
    };
    tools.prepend(button);resets.push(reset);
    card.addEventListener('click',e=>{if(e.target.closest('.view-controls'))reset()});
  }
  window.addEventListener('hashchange',()=>resets.forEach(reset=>reset()));
})();
