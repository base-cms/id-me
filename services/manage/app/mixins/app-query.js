import Mixin from '@ember/object/mixin';
import { inject } from '@ember/service';
import { ObjectQueryManager } from 'ember-apollo-client';

export default Mixin.create(ObjectQueryManager, {
  contextService: inject('context'),

  query(options, queryName) {
    const params = {
      ...options,
      context: {
        appId: this.get('contextService.appId'),
        ...options.context,
      },
    };
    return this.apollo.watchQuery(params, queryName);
  },
  mutate(options, queryName) {
    const params = {
      ...options,
      context: {
        appId: this.get('contextService.appId'),
        ...options.context,
      },
    };
    return this.apollo.mutate(params, queryName);
  },
});
