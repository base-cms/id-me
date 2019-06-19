import Route from '@ember/routing/route';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import RouteObservableMixin from '@base-cms/id-me-manage/mixins/route-observable';
import gql from 'graphql-tag';
import fragment from '@base-cms/id-me-manage/graphql/fragments/access-level-list';

const query = gql`
  query AppAccessLevels($input: AccessLevelsQueryInput = {}) {
    accessLevels(input: $input) {
      edges {
        node {
          ...AccessLevelListFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
  ${fragment}
`;

export default Route.extend(AppQueryMixin, RouteObservableMixin, {
  async model() {
    const input = {
      sort: { field: 'updatedAt', order: 'desc' },
      pagination: { limit: 24 },
    };
    const variables = { input };
    const response = await this.query({ query, variables }, 'accessLevels');
    this.getController().set('observable', this.getObservable(response));
    return response;
  },
});
