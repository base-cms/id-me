import Route from '@ember/routing/route';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import gql from 'graphql-tag';

const query = gql`
  query AppUsersEdit($input: AppUserQueryInput!) {
    appUser(input: $input) {
      id
      email
    }
  }
`;

export default Route.extend(AppQueryMixin, {
  model({ email }) {
    const input = { email };
    const variables = { input };
    return this.query({ query, variables, fetchPolicy: 'network-only' }, 'appUser');
  },
});
