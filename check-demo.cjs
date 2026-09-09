const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
class Element {
  constructor(tag = '') { this.tag = tag; this.children = []; this.textContent = ''; this.events = {}; }
  append(...items) { this.children.push(...items); }
  replaceChildren(...items) { this.children = items; }
  addEventListener(name, fn) { this.events[name] = fn; }
  querySelector(tag) { return this.children.find(c => c.tag === tag) || this.children.map(c => c.querySelector?.(tag)).find(Boolean); }
  focus() {}
  get text() { return this.textContent + this.children.map(c => c.text).join(' '); }
}
const messages = new Element(), actions = new Element(), result = new Element(), reset = new Element();
const nodes = {'[data-demo-messages]': messages, '[data-demo-actions]': actions, '[data-demo-result]': result, '[data-demo-reset]': reset};
const root = {querySelector: s => nodes[s], hidden: true};
const document = {querySelector: () => root, createElement: tag => new Element(tag), createTextNode: text => ({text})};
vm.runInNewContext(fs.readFileSync('demo.js', 'utf8'), {document});
const click = text => {
  const button = actions.children.find(c => c.textContent === text);
  assert(button, `Missing choice: ${text}`);
  button.events.click();
};
assert.equal(root.hidden, false);
const select = names => {
  for (const label of result.children[0].children.filter(c => c.tag === 'label')) {
    const input = label.children[0];
    input.checked = names.includes(label.children[1].textContent);
    input.events.change();
  }
};
select(['Cooked chicken', 'Cooked rice', 'Smoked sausage']);
click('Build my shopping list →');
let lists = result.children[1].children;
assert.match(lists[0].text, /Cooked chicken.*Cooked rice.*Smoked sausage/);
assert.doesNotMatch(lists[1].text, /Cooked chicken|Cooked rice|Smoked sausage/);
click('See my gumbo plan →');
assert.match(result.text, /Chicken & sausage gumbo/);
click('Show me the first cooking step →');
assert.match(result.text, /No timer is running/);
click('View shopping list');
click('Edit what I have');
assert.equal(result.children[0].children.filter(c => c.tag === 'label' && c.children[0].checked).length, 3);
select(['Cooked chicken']);
click('Build my shopping list →');
lists = result.children[1].children;
assert.doesNotMatch(lists[0].text, /Cooked rice|Smoked sausage/);
assert.match(lists[1].text, /Cooked rice.*Smoked sausage/);
click('Edit what I have');
select([]);
click('Build my shopping list →');
assert.match(result.text, /Nothing confirmed yet/);
reset.events.click();
assert.equal(messages.children.length, 2);
assert.equal(result.children[0].children.filter(c => c.tag === 'label' && c.children[0].checked).length, 0);
assert.equal(actions.children.length, 1);
console.log('Demo: all ingredient branches, recipe, cooking, return navigation and restart passed.');
