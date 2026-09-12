(()=>{
  const accounts=[{label:'Niles',handle:'thinkfitclub_niles'},{label:'Elmwood Park',handle:'thinkfitclub_elmwood'}];
  const icon='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>';
  const createLink=account=>{
    const link=document.createElement('a');
    link.className='instagram-link';
    link.href='https://www.instagram.com/'+account.handle+'/';
    link.target='_blank';link.rel='noopener noreferrer';
    link.setAttribute('aria-label',account.label+' Instagram (opens in new tab)');
    link.innerHTML=icon+'<span>'+account.label+'</span><span aria-hidden="true">↗</span>';
    return link;
  };
  const footer=document.querySelector('footer');
  if(footer){
    const group=document.createElement('nav');
    group.className='instagram-links';group.setAttribute('aria-label','Follow our clubs on Instagram');
    accounts.forEach(account=>group.appendChild(createLink(account)));
    footer.appendChild(group);
  }
  document.querySelectorAll('.location-overview-card').forEach((card,index)=>{
    const account=accounts[index];
    if(account)card.querySelector('.location-actions')?.appendChild(createLink(account));
  });
  const directContact=document.querySelector('.direct-contact');
  if(directContact)accounts.forEach(account=>directContact.appendChild(createLink(account)));
  const clubAccount=document.body.classList.contains('location-niles')?accounts[0]:window.location.pathname.includes('/elmwood-park/')?accounts[1]:null;
  if(clubAccount)document.querySelector('.hero-actions')?.appendChild(createLink(clubAccount));
})();
