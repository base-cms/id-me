import Mixin from '@ember/object/mixin';
import { getObservable } from 'ember-apollo-client';

export default Mixin.create({
  /**
   * Gets the observable for the provided result.
   */
  getObservable(result) {
    return getObservable(result);
  },

  /**
   * Gets the controller for the current route.
   */
  getController() {
    return this.controllerFor(this.get('routeName'));
  },
});
