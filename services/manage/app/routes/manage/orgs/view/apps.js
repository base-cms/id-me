import Route from '@ember/routing/route';
import OrgQueryMixin from '@identity-x/manage/mixins/org-query';
import gql from 'graphql-tag';

const query = gql`
  query OrgApps {
    organizationApplications {
      id
      name
      description
    }
  }
`;

export default Route.extend(OrgQueryMixin, {
  model() {
    return this.query({ query }, 'organizationApplications');
  },
});
