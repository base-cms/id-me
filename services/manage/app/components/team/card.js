import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  accessLevels: computed.mapBy('team.accessLevels', 'name'),
});
