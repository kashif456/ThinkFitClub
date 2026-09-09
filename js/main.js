const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('.mobile-menu');

function closeMenu(){toggle.setAttribute('aria-expanded','false');
toggle.setAttribute('aria-label','Open menu');
menu.classList.remove('open');
menu.setAttribute('aria-hidden','true');
document.body.classList.remove('menu-open')}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';
if(open){closeMenu()}else{toggle.setAttribute('aria-expanded','true');
toggle.setAttribute('aria-label','Close menu');
menu.classList.add('open');
menu.setAttribute('aria-hidden','false');
document.body.classList.add('menu-open')}});

menu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));

let reviewIndex=0;
const stage=document.querySelector('.testimonial-stage');
const count=document.querySelector('.review-count');

function renderReview(){const item=window.THINKFIT_TESTIMONIALS?.[reviewIndex];
if(!stage||!count||!item)return;
stage.innerHTML=`<blockquote>${item.quote}</blockquote><cite>${item.name}<span>${item.club}</span></cite>`;
count.textContent=`${String(reviewIndex+1).padStart(2,'0')} / ${String(window.THINKFIT_TESTIMONIALS.length).padStart(2,'0')}`}
document.querySelector('.review-prev')?.addEventListener('click',()=>{reviewIndex=(reviewIndex-1+window.THINKFIT_TESTIMONIALS.length)%window.THINKFIT_TESTIMONIALS.length;
renderReview()});

document.querySelector('.review-next')?.addEventListener('click',()=>{reviewIndex=(reviewIndex+1)%window.THINKFIT_TESTIMONIALS.length;
renderReview()});
if(stage)renderReview();

const membershipFrame=document.querySelector('.membership-frame');
document.querySelectorAll('.club-tab[data-src]').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('.club-tab[data-src]').forEach(item=>{
    item.classList.toggle('active',item===tab);
    item.setAttribute('aria-selected',String(item===tab));
  });
  if(membershipFrame){membershipFrame.title=`${tab.dataset.club} passes and membership`;
  membershipFrame.src=tab.dataset.src;}
}));
const year=document.querySelector('#year');
if(year)year.textContent=new Date().getFullYear();
