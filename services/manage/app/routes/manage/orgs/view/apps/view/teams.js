import Route from '@ember/routing/route';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import gql from 'graphql-tag';
import fragment from '@base-cms/id-me-manage/graphql/fragments/team-list';

const query = gql`
  query AppTeams {
    teams {
      ...TeamListFragment
    }
  }
  ${fragment}
`;

export default Route.extend(AppQueryMixin, {
  model() {
    return this.query({ query }, 'teams');
  },
});
