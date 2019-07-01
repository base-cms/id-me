import Route from '@ember/routing/route';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import gql from 'graphql-tag';
import fragment from '@base-cms/id-me-manage/graphql/fragments/app-user-list';

const query = gql`
  query AppUsersEdit($input: AppUserQueryInput!) {
    appUser(input: $input) {
      ...AppUserListFragment
    }
  }
  ${fragment}
`;

export default Route.extend(AppQueryMixin, {
  model({ email }) {
    const input = { email };
    const variables = { input };
    return this.query({ query, variables }, 'appUser');
  },
});
