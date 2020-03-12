import Route from '@ember/routing/route';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import gql from 'graphql-tag';
import fragment from '@identity-x/manage/graphql/fragments/team-list';

const query = gql`
  query AppTeamsEdit($input: TeamQueryInput!) {
    team(input: $input) {
      ...TeamListFragment
    }
  }
  ${fragment}
`;

export default Route.extend(AppQueryMixin, {
  model({ team_id: id }) {
    const input = { id };
    const variables = { input };
    return this.query({ query, variables, fetchPolicy: 'cache-and-network' }, 'team');
  },
});
