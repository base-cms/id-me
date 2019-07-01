import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-list-control'],
  attributeBindings: ['type', 'disabled', 'data-toggle', 'aria-haspopup', 'aria-expanded'],

  type: 'button',
  disabled: false,
});
