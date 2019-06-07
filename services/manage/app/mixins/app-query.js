import Mixin from '@ember/object/mixin';
import { ObjectQueryManager } from 'ember-apollo-client';

export default Mixin.create(ObjectQueryManager, {
  query(options, queryName) {
    const params = {
      ...options,
      context: {
        appId: this.get('app.id'),
        ...options.context,
      },
    };
    return this.apollo.watchQuery(params, queryName);
  },
  mutate(options, queryName) {
    const params = {
      ...options,
      context: {
        appId: this.get('app.id'),
        ...options.context,
      },
    };
    return this.apollo.mutate(params, queryName);
  },
});
