import Route from '@ember/routing/route';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import gql from 'graphql-tag';
import fragment from '@base-cms/id-me-manage/graphql/fragments/team-list';

const query = gql`
  query AppTeams($input: TeamsQueryInput = {}) {
    teams(input: $input) {
      edges {
        node {
          ...TeamListFragment
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
    const input = { sort };
    const variables = { input };
    return this.query({ query, variables }, 'teams');
  },
});
