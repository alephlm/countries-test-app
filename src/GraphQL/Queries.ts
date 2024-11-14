import { gql } from '@apollo/client';

export const COUNTRIES_QUERY = gql`
  query Countries($code: String) {
    countries(filter: { code: { eq: $code } }) {
      code
      name
    }
  }
`;

export const ALL_COUNTRIES_QUERY = gql`
  query AllCountries {
    countries {
      code
      name
    }
  }
`;