import Mixin from '@ember/object/mixin';
import { ObjectQueryManager } from 'ember-apollo-client';

export default Mixin.create(ObjectQueryManager, {
  query(appId, options, queryName) {
    const params = {
      ...options,
      context: {
        appId,
        ...options.context,
      },
    };
    return this.apollo.watchQuery(params, queryName);
  },
  mutate(appId, options, queryName) {
    const params = {
      ...options,
      context: {
        appId,
        ...options.context,
      },
    };
    return this.apollo.mutate(params, queryName);
  },
});
