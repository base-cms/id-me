import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'navbar--primary', 'navbar-expand', 'navbar-dark'],

  context: inject(),
  session: inject(),
});
