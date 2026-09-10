const pageHeader = document.querySelector('.page-header');
const pageNav = document.querySelector('.page-nav');

if (pageHeader && pageNav) {
  const menuButton = document.createElement('button');
  menuButton.className = 'mobile-menu-toggle';
  menuButton.type = 'button';
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-controls', 'page-navigation');
  menuButton.innerHTML = '<span class="mobile-menu-icon" aria-hidden="true"><i></i><i></i><i></i></span><span>Menu</span>';
  pageNav.id = 'page-navigation';
  pageHeader.insertBefore(menuButton, pageNav);

  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector(':scope > span:last-child').textContent = 'Menu';
    pageNav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.querySelector(':scope > span:last-child').textContent = opening ? 'Close' : 'Menu';
    pageNav.classList.toggle('is-open', opening);
    document.body.classList.toggle('menu-open', opening);
  });

  pageNav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}
