import Route from '@ember/routing/route';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import ListRouteMixin from '@identity-x/manage/mixins/list-route';
import gql from 'graphql-tag';
import fragment from '@identity-x/manage/graphql/fragments/app-user-list';

const appUsers = gql`
  query AppUsers($input: AppUsersQueryInput!) {
    appUsers(input:$input) {
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

const matchAppUsers = gql`
  query AppUsersMatch($input: MatchAppUsersQueryInput!){
    matchAppUsers(input:$input) {
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

export default Route.extend(ListRouteMixin, AppQueryMixin, {
  async model(params) {
    const apollo = this.query.bind(this);
    const query = { key: 'appUsers', op: appUsers };
    const search = { key: 'matchAppUsers', op: matchAppUsers };
    return this.getResults(apollo, { query, search, params });
  },
});
