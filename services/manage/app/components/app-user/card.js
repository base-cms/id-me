import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  accessLevels: computed.mapBy('user.accessLevels', 'name'),
  teams: computed.mapBy('user.teams', 'name'),
});
