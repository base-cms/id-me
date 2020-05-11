import gql from 'graphql-tag';

export default gql`
  fragment OrganizationRegionalConsentPolicyFragment on OrganizationRegionalConsentPolicy {
    id
    name
    countryCodes
    enabled
    message
    required
  }
`;
