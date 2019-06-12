import Base from 'ember-simple-auth/authenticators/base';
import { inject } from '@ember/service';
import { get } from '@ember/object';

export default Base.extend({
  auth: inject(),

  getToken(data) {
    return get(data, 'token.value');
  },

  async restore(data) {
    return data;
  },

  authenticate(loginToken) {
    return this.get('auth').submit(loginToken);
  },

  invalidate(data) {
    const token = this.getToken(data);
    return this.get('auth').delete(token);
  },
});
