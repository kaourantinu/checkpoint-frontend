import { gql } from "@apollo/client";

export const GET_COUNTRY_BY_CODE = gql`
query getCountryByCode($code: String!) {
  country(code: $code) {
    code
    continent {
      name
    }
    emoji
    name
    id
  }
}
`;