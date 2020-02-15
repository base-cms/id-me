import Route from '@ember/routing/route';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import ListRouteMixin from '@identity-x/manage/mixins/list-route';
import gql from 'graphql-tag';
import fragment from '@identity-x/manage/graphql/fragments/access-level-list';

const accessLevels = gql`
  query AppAccessLevels($input: AccessLevelsQueryInput) {
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

const matchAccessLevels = gql`
  query AppAccessLevelsMatch($input: MatchAccessLevelsQueryInput!) {
    matchAccessLevels(input: $input) {
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

export default Route.extend(AppQueryMixin, ListRouteMixin, {
  async model(params) {
    const apollo = this.query.bind(this);
    const query = { key: 'accessLevels', op: accessLevels };
    const search = { key: 'matchAccessLevels', op: matchAccessLevels };
    return this.getResults(apollo, { query, search, params });
  },
});
