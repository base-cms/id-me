import Mixin from '@ember/object/mixin';
import { inject } from '@ember/service';
import { RouteQueryManager } from 'ember-apollo-client';

export default Mixin.create(RouteQueryManager, {
  contextService: inject('context'),

  query(options, queryName) {
    const context = this.contextService.contextFromOptions(options);
    const params = {
      ...options,
      context: this.contextService.appQueryContext(context),
    };
    return this.apollo.watchQuery(params, queryName);
  },
  mutate(options, queryName) {
    const context = this.contextService.contextFromOptions(options);
    const params = {
      ...options,
      context: this.contextService.appQueryContext(context),
    };
    return this.apollo.mutate(params, queryName);
  },
});
