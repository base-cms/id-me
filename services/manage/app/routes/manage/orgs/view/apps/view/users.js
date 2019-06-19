import Route from '@ember/routing/route';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import gql from 'graphql-tag';
import fragment from '@base-cms/id-me-manage/graphql/fragments/app-user-list';

const query = gql`
  query AppUsers($input: AppUsersQueryInput = {}) {
    appUsers(input: $input) {
      edges {
        node {
          ...AppUserListFragment
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
    const sort = { field: 'email', order: 'asc' };
    const input = { sort };
    const variables = { input };
    return this.query({ query, variables }, 'appUsers');
  },
});
