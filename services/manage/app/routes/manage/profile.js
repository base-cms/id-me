import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend({
  user: inject(),

  model() {
    return { ...get(this.user, 'model') };
  },
});
