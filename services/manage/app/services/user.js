import Service, { inject } from '@ember/service';
import { computed } from '@ember/object';
import { ObjectQueryManager } from 'ember-apollo-client';

export default Service.extend(ObjectQueryManager, {
  session: inject(),

  model: computed.alias('session.data.authenticated.user'),
  isAuthenticated: computed.reads('session.isAuthenticated'),
  profileShown: false,
  profileCloseable: computed.not('profileShown'),
});
