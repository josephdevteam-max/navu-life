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
  const screens = {
    chat: {counter:'01 / 04 — Start anywhere',title:'A little less deciding. A lot more doing.',body:'Breakfast, lunch, dinner, or something in between. Start with a craving, a few ingredients, or whatever energy you have.',light:'welcome',dark:'welcome-dark',alt:'NAVU chat home with three visible energy modes',features:['Three modes, always within reach','Your conversation comes first','Meals and snacks, all day']},
    meal: {counter:'02 / 04 — Your next meal',title:'The useful details. Right in the chat.',body:'See the estimated time, effort, servings, and ingredients together. Open the recipe when it sounds right, or save it for another day.',light:'meal',dark:'dark',alt:'NAVU chat bubbles and chicken meal card with time, effort, servings, and ingredients',features:['Meal facts at a glance','Cooking method and ingredients','Open or save the recipe']},
    recipe: {counter:'03 / 04 — Make it happen',title:'From a good idea to something on your plate.',body:'Keep the recipe close, check your ingredients, and move into cooking. Your conversation is there when you return.',light:'recipe',dark:'recipe-dark',alt:'NAVU recipe detail with ingredients and cooking actions',features:['Ingredients with amounts','Your recipe in one place','Back to the same conversation']},
    setup: {counter:'04 / 04 — Make it yours',title:'Your kitchen. Your way of cooking.',body:'Stove, oven, microwave, or air fryer. Tell NAVU what you cook with, then choose the preferences that help it fit your day.',light:'onboarding',dark:'onboarding-dark',alt:'NAVU setup with illustrated stove, oven, microwave, and air fryer choices',features:['Recognizable appliance choices','Quick, skippable setup','Preferences you can revisit']}
  };
  let activeScreen = 'chat';
  let activeMode = 'everyday';
  let theme = 'dark';
  const mealCaptures = [...document.querySelectorAll('.meal-capture')].map(link => ({
    link,
    image: link.querySelector('img'),
    dark: link.getAttribute('href'),
    alt: link.querySelector('img').alt
  }));
  const showMealCaptures = () => mealCaptures.forEach(capture => {
    const source = theme === 'dark' ? capture.dark : capture.dark.replace('.png', '-light.png');
    capture.image.src = source;
    capture.link.href = source;
    capture.image.alt = `${capture.alt} — ${theme === 'light' ? 'illustrative light theme adaptation' : 'original dark capture'}`;
  });
  const modeInfo = {
    lowkey: {file:'lowkey',label:'Lowkey',description:'Keep it manageable. Less prep, fewer steps, and something good to eat with the energy you have.'},
    everyday: {file:'welcome',label:'Everyday',description:'A familiar meal at your usual pace. Enough room to cook, without making it a project.'},
    locked: {file:'locked',label:'Locked In',description:'A little more room to explore. Try a technique or a more involved dish when you feel like cooking.'}
  };
  const modeButtons = [...document.querySelectorAll('[data-mode]')];
  const showMode = key => {
    activeMode = key;
    const mode = modeInfo[key];
    const shot = document.querySelector('[data-mode-screen]');
    shot.src = `assets/preview/${mode.file}${theme === 'dark' ? '-dark' : ''}.png`;
    shot.alt = `${mode.label} selected on NAVU’s updated chat home in ${theme} appearance`;
    document.querySelector('[data-mode-description]').textContent = mode.description;
    modeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === key)));
  };
  modeButtons.forEach(button => button.addEventListener('click', () => showMode(button.dataset.mode)));
  document.querySelector('.mode-options').hidden = false;
  const buttons = [...tour.querySelectorAll('[data-tour-tab]')];
  const image = tour.querySelector('[data-tour-screen]');
  const show = key => {
    const screen = screens[key];
    if (!screen) return;
    activeScreen = key;
    const source = `assets/preview/${screen[theme]}.png`;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.tourTab === key)));
    image.src = source;
    image.alt = screen.alt;
    tour.querySelector('[data-tour-counter]').textContent = screen.counter;
    tour.querySelector('[data-tour-title]').textContent = screen.title;
    tour.querySelector('[data-tour-body]').textContent = screen.body;
    tour.querySelector('[data-tour-caption]').textContent = `Updated Flutter UI · Example data · ${theme === "dark" ? "Dark" : "Light"} appearance`;
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
  const themeButton = document.querySelector('[data-theme-toggle]');
  themeButton.hidden = false;
  themeButton.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    themeButton.textContent = theme === 'dark' ? 'Light view ☼' : 'Dark view ☾';
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} appearance`);
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#14211b' : '#f7f5ef';
    const hero = document.querySelector('[data-hero-screen]');
    hero.src = theme === 'dark' ? 'assets/navu-gumbo-chat-example.png' : 'assets/preview/welcome.png';
    hero.alt = theme === 'dark' ? 'Illustrative NAVU gumbo conversation in dark appearance' : 'NAVU chat home in light appearance';
    document.querySelector('[data-hero-caption]').textContent = theme === 'dark'
      ? 'Example conversation · Illustrative mockup'
      : 'Chat home · Actual app development preview';
    show(activeScreen);
    showMode(activeMode);
    showMealCaptures();
  });
  show(activeScreen);
})();
