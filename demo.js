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
  const progress = root.querySelector('[data-demo-progress]');
  function stage(number, label) {
    if (progress) progress.textContent = `${number} / 3 — ${label}`;
    root.querySelectorAll?.('[data-demo-stage]').forEach(item => {
      item.classList.toggle('is-current', Number(item.dataset.demoStage) === number);
      item.classList.toggle('is-done', Number(item.dataset.demoStage) < number);
    });
  }
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
    stage(2, 'Your shopping list');
    result.replaceChildren();
    const heading = el('h4', `${have.length} ingredients covered. ${ingredients.length - have.length} to check.`);
    const grid = el('div', '', 'demo-list');
    [['Have', have], ['Need', ingredients.filter(item => !have.includes(item))]].forEach(([title, items]) => {
      const section = el('div');
      section.append(el('h5', title));
      const ul = el('ul');
      (items.length ? items : ['Nothing confirmed yet']).forEach(item => ul.append(el('li', item)));
      section.append(ul);
      grid.append(section);
    });
    result.append(heading, grid, el('p', 'Have stays off your shopping list. Check the remaining items in your kitchen before buying.', 'demo-note'));
    choices([['See my gumbo plan →', recipe], ['Edit what I have', chooseIngredients]]);
  }
  function cooking() {
    stage(3, 'At the stove');
    result.replaceChildren(el('h4', 'Cooking preview · Start the roux'),
      el('p', 'Stir oil and flour in a heavy pot over medium heat. Stir frequently and watch the color; don’t leave the pot unattended.'),
      el('p', 'This is one illustrative step, not a complete cooking guide. No timer is running.', 'demo-note'));
    choices([['← Back to my plan', recipe], ['View shopping list', list]]);
  }
  function recipe() {
    stage(3, 'Your cooking plan');
    result.replaceChildren(el('h4', 'Chicken & sausage gumbo'),
      el('p', have.length ? 'Use what you have, check the rest, and cook one step at a time. This version uses cooked chicken and rice.' : 'Check the list first. This version uses cooked chicken and rice, so plan for those before you start.'),
      el('p', 'One pot · Served over rice · Hands-on roux', 'demo-recipe-tags'),
      el('h5', 'The plan'));
    const steps = el('ol');
    ['Prepare the vegetables and measure your ingredients.', 'Make the roux, then cook the vegetables.', 'Add stock and sausage; simmer, then add chicken and heat thoroughly.', 'Serve with safely stored, thoroughly reheated rice.'].forEach(step => steps.append(el('li', step)));
    result.append(steps, el('p', 'Illustrative overview, not a complete recipe. Verify food safety and allergy suitability.', 'demo-note'));
    choices([['Show me the first cooking step →', cooking], ['View shopping list', list]]);
  }
  function confirm(items, reply) {
    have = items;
    log.replaceChildren();
    message('user', reply);
    message('assistant', items.length ? 'Nice, that’s a start. I’ve kept those off your shopping list. Here’s what’s left to check.' : 'Got it. Let’s check the full list before you shop.');
    list();
  }
  function chooseIngredients(focus = true) {
    stage(1, 'What’s already in your kitchen?');
    result.replaceChildren();
    log.replaceChildren();
    message('user', 'I’m tired but I want gumbo.');
    message('assistant', 'We can work with that. Leftovers help with prep, though the roux still needs attention. What do you already have?');
    const fieldset = el('fieldset', '', 'demo-picker');
    fieldset.append(el('legend', 'Select what you have'));
    const selected = new Set(have);
    const submit = () => {
      const items = ingredients.filter(item => selected.has(item));
      confirm(items, items.length ? `I have ${items.join(', ').toLowerCase()}.` : 'I need everything.');
    };
    ingredients.forEach(item => {
      const label = el('label');
      const input = el('input');
      input.type = 'checkbox';
      input.checked = selected.has(item);
      input.addEventListener('change', () => {
        if (input.checked) selected.add(item); else selected.delete(item);
      });
      label.append(input, el('span', item));
      fieldset.append(label);
    });
    result.append(fieldset, el('p', 'Nothing on hand? Leave these unchecked.', 'demo-note'));
    choices([['Build my shopping list →', submit]], false);
    if (focus) fieldset.querySelector('input')?.focus({preventScroll: true});
  }
  function reset(focus = true) {
    have = [];
    log.replaceChildren();
    result.replaceChildren();
    chooseIngredients(focus);
  }
  root.querySelector('[data-demo-reset]').addEventListener('click', () => reset());
  root.hidden = false;
  reset(false);
})();
