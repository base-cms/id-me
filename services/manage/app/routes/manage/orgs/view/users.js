import Route from '@ember/routing/route';
import OrgQueryMixin from '@identity-x/manage/mixins/org-query';
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
      createdAt
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
      createdAt
    }
  }
`;

export default Route.extend(OrgQueryMixin, {
  model() {
    return this.query({ query, fetchPolicy: 'network-only' });
  },
});
