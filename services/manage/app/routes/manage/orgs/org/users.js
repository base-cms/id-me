import Route from '@ember/routing/route';
import OrgQueryMixin from '@base-cms/id-me-manage/mixins/org-query';
import gql from 'graphql-tag';

const query = gql`
  query OrgUsers {
    organizationUsers {
      id
      user {
        id
        email
        givenName
        familyName
        photoURL
      }
      role
    }
    organizationInvitations {
      id
      user {
        id
        email
        givenName
        familyName
        photoURL
      }
      organization {
        id
      }
      role
    }
  }
`;

export default Route.extend(OrgQueryMixin, {
  model() {
    return this.query({ query });
  },
});
