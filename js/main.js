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

const northwestMembership=document.querySelector('.home-v2 .club-tab.disabled');
if(northwestMembership){
  const northwestButton=document.createElement('button');
  northwestButton.className='club-tab';
  northwestButton.type='button';
  northwestButton.setAttribute('role','tab');
  northwestButton.setAttribute('aria-selected','false');
  northwestButton.dataset.club='Northwest';
  northwestButton.dataset.src='https://go.streamfit.com/embed/memberships/957-thinkfit-club-nw-elk-grove';
  northwestButton.innerHTML='<span>NW</span><small>Elk Grove · Schaumburg</small>';
  northwestMembership.replaceWith(northwestButton);
}
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

const siteHeader=document.querySelector('.home-v2 .site-header');
function updateStickyHeader(){siteHeader?.classList.toggle('is-scrolled',window.scrollY>24)}
if(siteHeader){
  window.addEventListener('scroll',updateStickyHeader,{passive:true});
  updateStickyHeader();
}

const heroImage=document.querySelector('.home-v2 .hero-image');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let parallaxFrame;
function updateHeroParallax(){
  parallaxFrame=undefined;
  if(!heroImage||reduceMotion.matches||window.innerWidth<=900){
    if(heroImage)heroImage.style.transform='';
    return;
  }
  const offset=Math.min(window.scrollY*.11,42);
  heroImage.style.transform=`translate3d(0,${offset}px,0)`;
}
if(heroImage){
  window.addEventListener('scroll',()=>{
    if(!parallaxFrame)parallaxFrame=requestAnimationFrame(updateHeroParallax);
  },{passive:true});
  window.addEventListener('resize',updateHeroParallax,{passive:true});
  reduceMotion.addEventListener?.('change',updateHeroParallax);
  updateHeroParallax();
}
// Give the home hero a scroll cue only until the visitor starts scrolling.
(() => {
  const cue = document.querySelector('.hero-actions .text-link[href="#locations"]');
  if (!cue) return;
  const stopAnimation = () => cue.classList.add('is-scrolled');
  if (window.scrollY > 20 || window.location.hash) stopAnimation();
  const onScroll = () => {
    if (window.scrollY <= 20) return;
    stopAnimation();
    window.removeEventListener('scroll', onScroll);
  };
  cue.addEventListener('click', stopAnimation);
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Northwest is open; keep the compact regional label together in tight hero layouts.
const homeEyebrow=document.querySelector('.home-v2 .hero .eyebrow');
if(homeEyebrow)homeEyebrow.innerHTML='<span class="eyebrow-line"></span><span class="eyebrow-brand">THINKFIT</span><span class="eyebrow-line"></span><span class="hero-marquee"><span class="hero-marquee-track"><span class="hero-marquee-group"><span>NILES</span><i></i><span>ELMWOOD PARK</span><i></i><span>NW (ELK GROVE, SCHAUMBURG)</span><i></i></span><span class="hero-marquee-group" aria-hidden="true"><span>NILES</span><i></i><span>ELMWOOD PARK</span><i></i><span>NW (ELK GROVE, SCHAUMBURG)</span><i></i></span></span></span>';
const locationCount=document.querySelector('.home-v2 .value-points article:nth-child(2) span');
if(locationCount)locationCount.textContent='Chicagoland locations—all open';
const northwestCard=document.querySelector('.home-v2 .location-card.northwest');
if(northwestCard){
  northwestCard.classList.remove('upcoming');
  const status=northwestCard.querySelector('p');
  const address=northwestCard.querySelector('h3 + span');
  const link=northwestCard.querySelector('b');
  if(status)status.textContent='NOW OPEN · ELK GROVE / SCHAUMBURG';
  if(address)address.textContent='1102 E Nerge Rd · Elk Grove Village, IL';
  if(link)link.innerHTML='Explore Northwest <i>↗</i>';
}
