import Route from '@ember/routing/route';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import ListRouteMixin from '@base-cms/id-me-manage/mixins/list-route';
import RouteObservableMixin from '@base-cms/id-me-manage/mixins/route-observable';
import gql from 'graphql-tag';
import fragment from '@base-cms/id-me-manage/graphql/fragments/app-user-list';

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
  query MatchAppUsers($input: MatchAppUsersQueryInput!){
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

export default Route.extend(ListRouteMixin, AppQueryMixin, RouteObservableMixin, {
  async model(params) {
    const apollo = this.query.bind(this);
    const query = { key: 'appUsers', op: appUsers };
    const search = { key: 'matchAppUsers', op: matchAppUsers };
    return this.getResults(apollo, { query, search, params });
  },
});
