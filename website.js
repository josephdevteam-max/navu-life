/* Small, local-only enhancements. No API calls, analytics, forms, or storage. */
(() => {
  'use strict';
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
  const screens = {
    gumbo: {
      counter: '01 / 04 — Find your meal',
      title: 'A real dish. Not a random swap.',
      body: 'When you have something specific in mind, start there. The existing gumbo screen shows a complete meal, ingredients, and a way into cooking.',
      file: 'navu-gumbo-real.png',
      alt: 'Existing NAVU gumbo meal screen',
      caption: 'Meal screen · Existing app capture',
      features: ['A dish you asked for', 'Ingredients to work with', 'A next step into cooking']
    },
    ramen: {
      counter: '02 / 04 — Start with a craving',
      title: 'Something specific in mind? Say it.',
      body: 'A craving is a perfectly good place to start. This earlier app capture shows a ramen request turned into a meal card.',
      file: 'navu-ramen-real.png',
      alt: 'Existing NAVU ramen recipe screen',
      caption: 'Ramen screen · Existing app capture',
      features: ['Ask in your own words', 'Name a dish or cuisine', 'Explore the recipe details']
    },
    cook: {
      counter: '03 / 04 — Get cooking',
      title: 'One step at a time. At your pace.',
      body: 'Cook with me keeps the saved recipe’s current step, heat guidance, and relevant safety notes together while you cook.',
      file: 'navu-cook-with-me-20260830.png',
      alt: 'Existing NAVU Cook with me screen showing a gumbo recipe step and timer',
      caption: 'Cook with me · August 30 development build',
      features: ['Follow the saved recipe', 'See the current step', 'Use a timer where provided']
    },
    saved: {
      counter: '04 / 04 — Keep the good ones',
      title: 'Tonight’s idea. Another night’s dinner.',
      body: 'Keep saved recipes, favorites, and recent meals in My meals. Reopen the recipe you chose, rather than generating a different one.',
      file: 'navu-saved-meals-20260830.png',
      alt: 'Existing NAVU My meals screen with saved recipes, favorites, and recent meals',
      caption: 'My meals · August 30 development build',
      features: ['Save a recipe for later', 'Revisit your favorites', 'Stored on this device—not synced']
    }
  };
  const buttons = [...tour.querySelectorAll('[data-tour-tab]')];
  const image = tour.querySelector('[data-tour-screen]');
  const show = key => {
    const screen = screens[key];
    if (!screen) return;
    const source = `assets/${screen.file}`;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.tourTab === key)));
    image.src = source;
    image.alt = screen.alt;
    tour.querySelector('[data-tour-counter]').textContent = screen.counter;
    tour.querySelector('[data-tour-title]').textContent = screen.title;
    tour.querySelector('[data-tour-body]').textContent = screen.body;
    tour.querySelector('[data-tour-caption]').textContent = screen.caption;
    tour.querySelector('[data-tour-full]').href = source;
    tour.querySelector('[data-tour-features]').replaceChildren(...screen.features.map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
  };
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => show(button.dataset.tourTab));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      buttons[next].focus();
      show(buttons[next].dataset.tourTab);
    });
  });
  tour.querySelector('.tour-buttons').hidden = false;
})();
