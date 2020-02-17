import Route from '@ember/routing/route';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import ListRouteMixin from '@identity-x/manage/mixins/list-route';
import gql from 'graphql-tag';
import fragment from '@identity-x/manage/graphql/fragments/team-list';

const teams = gql`
  query AppTeams($input: TeamsQueryInput!) {
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

const matchTeams = gql`
  query AppTeamsMatch($input: MatchTeamsQueryInput!) {
    matchTeams(input: $input) {
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

export default Route.extend(AppQueryMixin, ListRouteMixin, {
  async model(params) {
    const apollo = this.query.bind(this);
    const query = { key: 'teams', op: teams };
    const search = { key: 'matchTeams', op: matchTeams };
    return this.getResults(apollo, { query, search, params });
  },
});
