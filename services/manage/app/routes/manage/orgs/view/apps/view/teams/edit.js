import Route from '@ember/routing/route';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import gql from 'graphql-tag';
import fragment from '@base-cms/id-me-manage/graphql/fragments/team-list';

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
    return this.query({ query, variables }, 'team');
  },
});
