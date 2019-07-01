import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  autocomplete: inject(),

  classNames: ['form-group'],
  value: null,

  actions: {
    /**
     * Performs the access levels autocomplete search.
     *
     * @param {*} phrase
     */
    search(phrase) {
      const excludeIds = (this.get('value') || []).map(v => v.id);
      const vars = { excludeIds };
      return this.get('autocomplete').query('Team', phrase, { vars });
    },
  },
});
