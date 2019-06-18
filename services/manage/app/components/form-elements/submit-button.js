import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',
  isSaving: false,

  icon: 'save',
  label: 'Save',
  onSavingLabel: 'Saving...',

  _disabled: computed('disabled', 'isSaving', function() {
    if (this.get('disabled')) return true;
    return this.get('isSaving');
  }),
});
