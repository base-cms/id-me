import Mixin from '@ember/object/mixin';
import { ObjectQueryManager } from 'ember-apollo-client';

export default Mixin.create(ObjectQueryManager, {
  query(orgId, options, queryName) {
    const params = {
      ...options,
      context: {
        orgId,
        ...options.context,
      },
    };
    return this.apollo.watchQuery(params, queryName);
  },
  mutate(orgId, options, queryName) {
    const params = {
      ...options,
      context: {
        orgId,
        ...options.context,
      },
    };
    return this.apollo.mutate(params, queryName);
  },
});
