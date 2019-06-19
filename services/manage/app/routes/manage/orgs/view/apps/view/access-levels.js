import Route from '@ember/routing/route';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
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

export default Route.extend(AppQueryMixin, {
  model() {
    const sort = { field: 'name', order: 'asc' };
    const pagination = { limit: 24 };
    const input = { sort, pagination };
    const variables = { input };
    return this.query({ query, variables }, 'accessLevels');
  },
});
