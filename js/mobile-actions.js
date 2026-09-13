const mobileActions=document.createElement('nav');
mobileActions.className='mobile-action-bar';
mobileActions.setAttribute('aria-label','Quick contact actions');
mobileActions.innerHTML=`
  <a href="tel:+17738073505" aria-label="Call ThinkFit Club">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.54 3.5.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.18 2.4.54 3.5a1 1 0 0 1-.24 1z"/></svg>
    <span>Call</span>
  </a>
  <a href="mailto:Teamzeefitness1@gmail.com" aria-label="Email ThinkFit Club">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3zM3 6l9 7 9-7"/></svg>
    <span>Email</span>
  </a>
  <a class="mobile-action-primary" href="/contact/#consultation" aria-label="Request a consultation">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a7 7 0 0 0-7 7c0 4.7 7 11 7 11s7-6.3 7-11a7 7 0 0 0-7-7zm0 4v6m-3-3h6"/></svg>
    <span>Consult</span>
  </a>`;
document.body.appendChild(mobileActions);

// A visual cue only: preserve the provider's native scrolling and scrollbar.
const membershipFrames=document.querySelectorAll('iframe[src*="go.streamfit.com/embed/memberships/"]');
if(membershipFrames.length){
  const scrollStyles=document.createElement('link');
  scrollStyles.rel='stylesheet';
  scrollStyles.href=new URL('../css/membership-scroll.css',document.currentScript.src).href;
  document.head.appendChild(scrollStyles);
  const scrollCues=[];
  membershipFrames.forEach(frame=>{
    const container=frame.parentElement;
    container.classList.add('membership-scroll-container');
    const cue=document.createElement('span');
    cue.className='membership-scroll-cue';
    cue.setAttribute('aria-hidden','true');
    cue.appendChild(document.createElement('span')).className='membership-chevron-up';
    cue.appendChild(document.createElement('span')).className='membership-chevron-down';
    container.appendChild(cue);
    scrollCues.push({container,cue});
  });
  const positionScrollCues=()=>{
    const mobile=window.matchMedia('(max-width:760px)').matches;
    // Keep the cue within the visible embed, clear of the header and action bar.
    const viewportBottom=window.innerHeight-90;
    scrollCues.forEach(({container,cue})=>{
      if(!mobile){cue.style.removeProperty('top');cue.style.removeProperty('visibility');return;}
      const rect=container.getBoundingClientRect();
      const visibleTop=Math.max(rect.top+12,90);
      const visibleBottom=Math.min(rect.bottom-12,viewportBottom);
      cue.style.visibility=visibleBottom-visibleTop>=42?'visible':'hidden';
      const top=Math.max(12,Math.min(rect.height-54,(visibleTop+visibleBottom)/2-rect.top-21));
      cue.style.top=top+'px';
    });
  };
  let cueFramePending=false;
  const scheduleCuePosition=()=>{
    if(cueFramePending)return;
    cueFramePending=true;
    requestAnimationFrame(()=>{cueFramePending=false;positionScrollCues();});
  };
  window.addEventListener('scroll',scheduleCuePosition,{passive:true});
  window.addEventListener('resize',scheduleCuePosition);
  membershipFrames.forEach(frame=>frame.addEventListener('load',scheduleCuePosition));
  if(window.ResizeObserver){
    const cueResizeObserver=new ResizeObserver(scheduleCuePosition);
    scrollCues.forEach(({container})=>cueResizeObserver.observe(container));
  }
  positionScrollCues();
}
