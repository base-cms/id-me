import Route from '@ember/routing/route';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import gql from 'graphql-tag';
import fragment from '@base-cms/id-me-manage/graphql/fragments/access-level-list';

const query = gql`
  query AppAccessLevelsEdit($input: AccessLevelQueryInput!) {
    accessLevel(input: $input) {
      ...AccessLevelListFragment
    }
  }
  ${fragment}
`;

export default Route.extend(AppQueryMixin, {
  model({ access_level_id: id }) {
    const input = { id };
    const variables = { input };
    return this.query({ query, variables }, 'accessLevel');
  },
});
