import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  autocomplete: inject(),

  classNames: ['form-group'],
  value: null,

  actions: {
    /**
     * Performs the users autocomplete search.
     *
     * @param {*} phrase
     */
    search(phrase) {
      const excludeIds = (this.get('value') || []).map(v => v.id);
      const vars = { excludeIds };
      return this.get('autocomplete').query('AppUser', phrase, { vars });
    },
  },
});
