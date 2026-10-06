const base=new URL('.',import.meta.url);
const courses=await fetch(new URL('courses.json',base),{cache:'no-store'}).then(r=>r.json());
for(const nav of document.querySelectorAll('[data-course-nav]')){
 const active=nav.dataset.courseNav==='chapter'?courses.find(c=>{const u=new URL(c.href,base);return u.pathname===location.pathname&&u.search===location.search})?.id:nav.dataset.courseNav;
 for(const course of courses){const link=document.createElement('a');link.href=new URL(course.href,base);link.textContent=course.title;if(course.id===active)link.setAttribute('aria-current','page');nav.append(link)}
}
const grid=document.getElementById('course-cards');
if(grid){for(const course of courses){const card=document.createElement('a');card.className='chapter-card';card.href=new URL(course.href,base);const title=document.createElement('h3');title.className='chapter-title';title.textContent=course.title;const description=document.createElement('p');description.className='chapter-summary';description.textContent=course.description;const action=document.createElement('span');action.className='chapter-meta';action.textContent=course.action;card.append(title,description,action);grid.append(card)}}
