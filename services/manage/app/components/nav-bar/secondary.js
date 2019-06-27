import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'navbar--secondary', 'navbar-expand', 'navbar-light'],

  context: inject(),
});
