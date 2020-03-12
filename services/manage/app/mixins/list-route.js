import Mixin from '@ember/object/mixin';
import RouteSearchMixin from '@identity-x/manage/mixins/route-search';
import { inject } from '@ember/service';

export default Mixin.create(RouteSearchMixin, {
  errorNotifier: inject(),

  queryParams: {
    limit: {
      refreshModel: true,
    },
    phrase: {
      refreshModel: true,
    },
    position: {
      refreshModel: true,
    },
    field: {
      refreshModel: true,
    },
    sortField: {
      refreshModel: true,
    },
    sortOrder: {
      refreshModel: true,
    },
  },

  resetController(controller, isExiting) {
    this._super(...arguments);
    if (isExiting) controller.send('reset');
  },

  buildQueryVariables(input, {
    limit,
    sortField: field,
    sortOrder: order,
  } = {}) {
    const pagination = { limit };
    const sort = { field, order };
    return {
      input: {
        ...input,
        pagination,
        sort,
      },
    };
  },

  async getResults(apollo, { query = {}, search = {}, params = {} }) {
    if (params.phrase) {
      return this.search(apollo, {
        query: search.op,
        resultKey: search.key,
        input: search.input,
        params,
      });
    }

    const variables = this.buildQueryVariables(query.input, params);
    this.getController().set('resultKey', query.key);
    try {
      const response = await apollo({ query: query.op, variables, fetchPolicy: 'cache-and-network' }, query.key);
      this.getController().set('observable', this.getObservable(response));
      return response;
    } catch (e) {
      this.errorNotifier.show(e);
    }
  },
});
