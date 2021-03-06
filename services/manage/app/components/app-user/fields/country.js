import Component from '@ember/component';
import { computed } from '@ember/object';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import { inject } from '@ember/service';
import gql from 'graphql-tag';

const query = gql`
  query CountryOptionList {
    localeCountries(input: { prioritize: ["US", "CA", "MX"] }) {
      id
      name
      flag
    }
  }
`;

export default Component.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),

  classNames: ['form-group'],
  value: null,

  options: computed('countries.[]', function() {
    const countries = this.countries.slice();
    countries.unshift({ id: null, name: '', flag: '' });
    return countries;
  }),

  init() {
    this._super(...arguments);
    this.countries = [];
    this.load();
  },

  async load() {
    this.startAction();
    try {
      const countries = await this.query({ query }, 'localeCountries');
      this.set('countries', countries);
    } catch (e) {
      this.errorNotifier.show(e);
    } finally {
      this.endAction();
    }
  },

  actions: {
    emitChange(countryCode) {
      this.sendEventAction('on-change', countryCode || null);
    }
  },
});
