import Component from '@ember/component';
import { computed } from '@ember/object';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import { inject } from '@ember/service';
import gql from 'graphql-tag';
import { ObjectQueryManager } from 'ember-apollo-client';

const query = gql`
  query RegionalConsentCountries {
    localeCountries(input: { prioritize: [] }) {
      id
      name
      flag
    }
  }
`;

export default Component.extend(ActionMixin, ObjectQueryManager, {
  errorNotifier: inject(),

  classNames: ['form-group'],

  options: computed('countries.[]', function() {
    const countries = this.countries.slice();
    countries.unshift({ id: null, name: '', flag: '' });
    return countries;
  }),

  init() {
    this._super(...arguments);
    if (!Array.isArray(this.value)) this.value = [];
    this.countries = [];
    this.load();
  },

  async load() {
    this.startAction();
    try {
      const countries = await this.apollo.query({ query }, 'localeCountries');
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
