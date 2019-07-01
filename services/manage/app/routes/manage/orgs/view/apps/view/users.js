import Route from '@ember/routing/route';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import ListRouteMixin from '@base-cms/id-me-manage/mixins/list-route';
import RouteObservableMixin from '@base-cms/id-me-manage/mixins/route-observable';
import gql from 'graphql-tag';
import fragment from '@base-cms/id-me-manage/graphql/fragments/app-user-list';

const list = gql`
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

const match = gql`
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

const getInput = (params) => {
  const {
    field,
    limit,
    phrase,
    position,
    sortField,
    sortOrder,
  } = params;

  const common = {
    sort: { field: sortField, order: sortOrder },
    pagination: { limit },
  };
  const input = phrase ? { field, phrase, position, ...common } : common;
  const variables = { input };
  const query = phrase ? match : list;
  const key = phrase ? 'matchAppUsers' : 'appUsers';

  return [{ query, variables }, key];
};

export default Route.extend(ListRouteMixin, AppQueryMixin, RouteObservableMixin, {
  async model(params) {
    const response = await this.query(...getInput(params));
    this.getController().set('observable', this.getObservable(response));
    return response;
},
});
