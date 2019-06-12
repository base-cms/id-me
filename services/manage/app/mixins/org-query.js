import Mixin from '@ember/object/mixin';
import { inject } from '@ember/service';
import { RouteQueryManager } from 'ember-apollo-client';

export default Mixin.create(RouteQueryManager, {
  contextService: inject('context'),

  query(options, queryName) {
    const params = {
      ...options,
      context: {
        orgId: this.get('contextService.orgId'),
        ...options.context,
      },
    };
    return this.apollo.watchQuery(params, queryName);
  },
  mutate(options, queryName) {
    const params = {
      ...options,
      context: {
        orgId: this.get('contextService.orgId'),
        ...options.context,
      },
    };
    return this.apollo.mutate(params, queryName);
  },
});
