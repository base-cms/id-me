import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: 'aside',
  classNames: ['notifications'],
  flashMessages: inject(),
});
