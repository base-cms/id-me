import gql from 'graphql-tag';

export default gql`
  fragment OrganizationRegionalConsentPolicyFragment on OrganizationRegionalConsentPolicy {
    id
    name
    countries {
      id
      name
      flag
    }
    enabled
    message
    required
  }
`;
