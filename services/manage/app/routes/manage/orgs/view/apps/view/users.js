import Route from '@ember/routing/route';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import gql from 'graphql-tag';

const query = gql`
  query AppUsers {
    appUsers {
      id
      email
      domain
      givenName
      familyName
    }
  }
`;

export default Route.extend(AppQueryMixin, {
  model() {
    return this.query({ query }, 'appUsers');
  },
});
