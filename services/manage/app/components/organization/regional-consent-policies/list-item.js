import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  countries: computed('policy.countries.@each.id', function() {
    return this.get('policy.countries').map(country => country.name).sort().join(', ');
  }),
});
