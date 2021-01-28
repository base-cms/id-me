import Route from '@ember/routing/route';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import gql from 'graphql-tag';

const query = gql`
  query AppUsersEditCustomSelectFields($input: AppUserQueryInput!) {
    appUser(input: $input) {
      id
      email
      customSelectFieldAnswers {
        id
        field {
          id
          name
          label
          multiple
          active
          options {
            id
            label
          }
        }
        answers {
          id
          label
        }
      }
    }
  }
`;

export default Route.extend(AppQueryMixin, {
  model() {
    const { email } = this.modelFor('manage.orgs.view.apps.view.users.edit');
    const input = { email };
    const variables = { input };
    return this.query({ query, variables, fetchPolicy: 'network-only' }, 'appUser');
  },
});
