import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'tr',

  user: service(),

  canModify: computed.not('isCurrentUser'),
  isCurrentUser: computed('membership.user.id', 'user.model.id', function() {
    return `${this.get('membership.user.id')}` === `${this.get('user.model.id')}`;
  }),

});
