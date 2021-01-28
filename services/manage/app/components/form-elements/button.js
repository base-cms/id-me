import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  attributeBindings: [
    'disabled',
    'type',
    'form',
  ],

  disabled: false,
  type: 'button',
});
