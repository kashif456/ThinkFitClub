(()=>{
  const accounts=[{label:'Niles',handle:'thinkfitclub_niles'},{label:'Elmwood Park',handle:'thinkfitclub_elmwood'}];
  const icon='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>';
  const createLink=account=>{
    const link=document.createElement('a');
    link.className='instagram-link';
    link.href='https://www.instagram.com/'+account.handle+'/';
    link.target='_blank';link.rel='noopener noreferrer';
    link.setAttribute('aria-label',account.label+' Instagram (opens in new tab)');
    link.innerHTML=icon;
    return link;
  };
  document.querySelectorAll('.location-overview-card').forEach((card,index)=>{
    const account=accounts[index];
    if(account){const link=createLink(account);link.classList.add('location-instagram');card.appendChild(link);}
  });
  document.querySelectorAll('.home-v2 .location-card.niles,.home-v2 .location-card.elmwood').forEach(card=>{
    const account=card.classList.contains('niles')?accounts[0]:accounts[1];
    const wrapper=document.createElement('div');
    wrapper.className='home-location-social';
    card.replaceWith(wrapper);
    wrapper.appendChild(card);
    const link=createLink(account);
    link.classList.add('home-location-instagram');
    wrapper.appendChild(link);
  });
  const directContact=document.querySelector('.direct-contact');
  if(directContact)accounts.forEach(account=>{const link=createLink(account);const label=document.createElement('span');label.textContent=account.label;link.appendChild(label);directContact.appendChild(link);});
  const clubAccount=document.body.classList.contains('location-niles')?accounts[0]:window.location.pathname.includes('/elmwood-park/')?accounts[1]:null;
  if(clubAccount){const hero=document.querySelector('.subhero');if(hero){const link=createLink(clubAccount);link.classList.add('location-instagram');hero.appendChild(link);}}
})();
