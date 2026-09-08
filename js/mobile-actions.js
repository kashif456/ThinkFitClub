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
  <a class="mobile-action-primary" href="/contact/" aria-label="Request a consultation">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a7 7 0 0 0-7 7c0 4.7 7 11 7 11s7-6.3 7-11a7 7 0 0 0-7-7zm0 4v6m-3-3h6"/></svg>
    <span>Consult</span>
  </a>`;
document.body.appendChild(mobileActions);
