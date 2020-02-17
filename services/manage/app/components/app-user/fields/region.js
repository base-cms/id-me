import Component from '@ember/component';
import { computed } from '@ember/object';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import { inject } from '@ember/service';
import gql from 'graphql-tag';

const query = gql`
  query RegionOptionList {
    localeRegions {
      id
      code
      name
      country {
        id
      }
    }
  }
`;

const validCountryCodes = ['US', 'CA', 'MX'];

export default Component.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),

  classNames: ['form-group'],
  countryCode: null,
  value: null,

  isDisabled: computed('countryCode', 'isActionRunning', function() {
    return this.isActionRunning || !validCountryCodes.includes(this.countryCode);
  }),

  options: computed('regions.[]', 'countryCode', function() {
    if (!validCountryCodes.includes(this.countryCode)) return [];
    const regions = this.regions.filter(region => region.country.id === this.countryCode);
    regions.unshift({ id: null, code: '', name: '' });
    return regions;
  }),

  init() {
    this._super(...arguments);
    this.regions = [];
    this.load();
  },

  async load() {
    this.startAction();
    try {
      const regions = await this.query({ query }, 'localeRegions');
      this.set('regions', regions);
    } catch (e) {
      this.errorNotifier.show(e);
    } finally {
      this.endAction();
    }
  },

  actions: {
    emitChange(regionCode) {
      this.sendEventAction('on-change', regionCode || null);
    }
  },
});
