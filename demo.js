/* Scripted, page-local website demo. No network requests or persistence. */
(() => {
  'use strict';
  const root = document.querySelector('[data-demo]');
  if (!root) return;
  const log = root.querySelector('[data-demo-messages]');
  const actions = root.querySelector('[data-demo-actions]');
  const result = root.querySelector('[data-demo-result]');
  const ingredients = ['Cooked chicken', 'Cooked rice', 'Smoked sausage', 'Onion', 'Celery', 'Bell pepper', 'Flour', 'Oil', 'Stock', 'Cajun seasoning'];
  let have = [];
  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  function message(who, text) {
    const bubble = el('p', '', `demo-bubble demo-${who}`);
    bubble.append(el('span', who === 'user' ? 'You' : 'NAVU'), document.createTextNode(text));
    log.append(bubble);
  }
  function choices(items, focus = true) {
    actions.replaceChildren();
    items.forEach(([label, handler]) => {
      const button = el('button', label);
      button.type = 'button';
      button.addEventListener('click', handler, {once: true});
      actions.append(button);
    });
    if (focus) actions.querySelector('button')?.focus({preventScroll: true});
  }
  function list() {
    result.replaceChildren();
    const heading = el('h4', 'Your gumbo shopping list');
    const grid = el('div', '', 'demo-list');
    [['Have', have], ['Need', ingredients.filter(item => !have.includes(item))]].forEach(([title, items]) => {
      const section = el('div');
      section.append(el('h5', title));
      const ul = el('ul');
      (items.length ? items : ['Nothing confirmed yet']).forEach(item => ul.append(el('li', item)));
      section.append(ul);
      grid.append(section);
    });
    result.append(heading, grid, el('p', 'Example list only. Check ingredient labels, allergens, and quantities before shopping or cooking.', 'demo-note'));
    choices([['Preview recipe', recipe], ['Change ingredients', chooseIngredients]]);
  }
  function cooking() {
    result.replaceChildren(el('h4', 'Cooking preview · Start the roux'),
      el('p', 'Stir oil and flour in a heavy pot over medium heat. Stir frequently and watch the color; don’t leave the pot unattended.'),
      el('p', 'This is one illustrative step, not a complete cooking guide. No timer is running.', 'demo-note'));
    choices([['Back to recipe', recipe], ['Back to shopping list', list]]);
  }
  function recipe() {
    result.replaceChildren(el('h4', 'Chicken & sausage gumbo'),
      el('p', 'A gumbo plan built around cooked chicken, smoked sausage, and rice. A roux takes time and attention—even with leftovers.'),
      el('h5', 'The plan'));
    const steps = el('ol');
    ['Prepare the vegetables and measure your ingredients.', 'Make the roux, then cook the vegetables.', 'Add stock and sausage; simmer, then add chicken and heat thoroughly.', 'Serve with safely stored, thoroughly reheated rice.'].forEach(step => steps.append(el('li', step)));
    result.append(steps, el('p', 'Illustrative overview, not a complete recipe. Verify food safety and allergy suitability.', 'demo-note'));
    choices([['Preview a cooking step', cooking], ['Back to shopping list', list]]);
  }
  function confirm(items, reply) {
    have = items;
    message('user', reply);
    message('assistant', items.length ? 'Got it. Those go under Have. Here’s what’s still on the list.' : 'Starting from scratch. Here’s the ingredient list to check before you shop.');
    list();
  }
  function chooseIngredients() {
    result.replaceChildren();
    choices([
      ['I have chicken, rice, and sausage', () => confirm(ingredients.slice(0, 3), 'I have cooked chicken, rice, and sausage.')],
      ['Only the chicken', () => confirm(['Cooked chicken'], 'Only the cooked chicken.')],
      ['I need everything', () => confirm([], 'I need everything.')]
    ]);
  }
  function start() {
    message('user', 'I’m tired but I want gumbo.');
    message('assistant', 'Gumbo sounds good. Got cooked chicken, rice, and sausage? Leftovers help with prep, but the roux still needs some attention.');
    chooseIngredients();
  }
  function reset(focus = true) {
    have = [];
    log.replaceChildren();
    result.replaceChildren();
    message('assistant', 'What sounds good today?');
    choices([['I’m tired but I want gumbo', start]], focus);
  }
  root.querySelector('[data-demo-reset]').addEventListener('click', () => reset());
  root.hidden = false;
  reset(false);
})();
