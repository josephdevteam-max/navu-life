const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
class Element {
  constructor(tag = '') { this.tag = tag; this.children = []; this.textContent = ''; this.events = {}; }
  append(...items) { this.children.push(...items); }
  replaceChildren(...items) { this.children = items; }
  addEventListener(name, fn) { this.events[name] = fn; }
  querySelector() { return this.children.find(c => c.tag === 'button'); }
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
click('I’m tired but I want gumbo');
click('I have chicken, rice, and sausage');
let lists = result.children[1].children;
assert.match(lists[0].text, /Cooked chicken.*Cooked rice.*Smoked sausage/);
assert.doesNotMatch(lists[1].text, /Cooked chicken|Cooked rice|Smoked sausage/);
click('Preview recipe');
assert.match(result.text, /Chicken & sausage gumbo/);
click('Preview a cooking step');
assert.match(result.text, /No timer is running/);
click('Back to shopping list');
click('Change ingredients');
click('Only the chicken');
lists = result.children[1].children;
assert.doesNotMatch(lists[0].text, /Cooked rice|Smoked sausage/);
assert.match(lists[1].text, /Cooked rice.*Smoked sausage/);
click('Change ingredients');
click('I need everything');
assert.match(result.text, /Nothing confirmed yet/);
reset.events.click();
assert.equal(messages.children.length, 1);
assert.equal(result.children.length, 0);
assert.equal(actions.children.length, 1);
console.log('Demo: all ingredient branches, recipe, cooking, return navigation and restart passed.');
