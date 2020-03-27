import gql from 'graphql-tag';

export default gql`
  fragment OrganizationCompanyFragment on OrganizationCompany {
    id
    name
    streetAddress
    city
    regionName
    postalCode
    phoneNumber
  }
`;
