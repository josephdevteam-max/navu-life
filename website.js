/* Small, local-only enhancements. No API calls, analytics, forms, or storage. */
(() => {
  'use strict';
  const viewer = document.querySelector('[data-screenshot-viewer]');
  if (viewer && typeof viewer.showModal === 'function') {
    let opener;
    const close = () => viewer.close();
    document.querySelectorAll('.meal-capture, [data-tour-full]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        opener = link;
        const preview = viewer.querySelector('[data-screenshot-image]');
        preview.src = link.href;
        preview.alt = (link.querySelector('img') || document.querySelector('[data-tour-screen]')).alt;
        viewer.showModal();
        document.documentElement.classList.add('screenshot-open');
      });
    });
    viewer.querySelector('[data-screenshot-close]').addEventListener('click', close);
    viewer.addEventListener('click', event => { if (event.target === viewer) close(); });
    viewer.addEventListener('close', () => {
      document.documentElement.classList.remove('screenshot-open');
      if (opener && opener.isConnected) opener.focus({preventScroll: true});
    });
    // Native dialog handles Escape, focus containment, and the inert background.
  }
  const menu = document.querySelector('.mobile-menu');
  const closeMenu = () => { if (menu) menu.open = false; };
  if (menu) {
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.open) {
        closeMenu();
        menu.querySelector('summary').focus();
      }
    });
    document.addEventListener('click', event => {
      if (menu.open && !menu.contains(event.target)) closeMenu();
    });
    window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
  }

  // Keep the old safety anchor useful even though the content is now a FAQ.
  const openHashTarget = () => {
    if (window.location.hash === '#safety') {
      const safety = document.getElementById('safety');
      if (safety) safety.open = true;
    }
  };
  openHashTarget();
  window.addEventListener('hashchange', openHashTarget);
  document.querySelectorAll('a[href="#safety"]').forEach(link => {
    link.addEventListener('click', () => {
      const safety = document.getElementById('safety');
      if (safety) safety.open = true;
    });
  });

  const tour = document.querySelector('[data-product-tour]');
  if (!tour) return;
  const screen = {light:'gumbo-recipe-light',dark:'gumbo-recipe-dark',alt:'Ingredient-gathering step and recipe details recorded before the Neldo rename'};
  let theme = 'dark';
  const mealCaptures = [...document.querySelectorAll('.meal-capture')].map(link => ({
    link,
    image: link.querySelector('img'),
    dark: link.getAttribute('href'),
    alt: link.querySelector('img').alt
  }));
  const showMealCaptures = () => mealCaptures.forEach(capture => {
    const source = theme === 'dark' ? capture.dark : capture.dark.replace('-dark.png', '-light.png');
    capture.image.src = source;
    capture.link.href = source;
    capture.image.alt = capture.alt;
  });
  const image = tour.querySelector('[data-tour-screen]');
  const show = () => {
    const source = `assets/current/${screen[theme]}.png`;
    image.src = source;
    image.alt = screen.alt;
    tour.querySelector('[data-tour-caption]').textContent = `Before the Neldo rename · Sample recipe · ${theme === "dark" ? "Dark" : "Light"} appearance`;
    tour.querySelector('[data-tour-full]').href = source;
    document.dispatchEvent(new Event('navu-content-change'));
  };
  const themeButton = document.querySelector('[data-theme-toggle]');
  themeButton.hidden = false;
  themeButton.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    themeButton.textContent = theme === 'dark' ? 'Light view ☼' : 'Dark view ☾';
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} appearance`);
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#14211b' : '#f7f5ef';
    const hero = document.querySelector('[data-hero-screen]');
    hero.src = `assets/current/gumbo-recipe-${theme}.png`;
    hero.alt = 'Ingredient-gathering step and recipe details recorded before the Neldo rename';
    document.querySelector('[data-hero-caption]').textContent = 'Before the Neldo rename · Sample recipe';
    show();
    showMealCaptures();
    document.dispatchEvent(new Event('navu-content-change'));
  });
  show();
})();
