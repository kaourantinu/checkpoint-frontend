import { gql } from "@apollo/client";

export const LIST_ALL_COUNTRIES = gql`
query listAllCountries {
  countries {
    code
    continent {
      name
    }
    emoji
    id
    name
  }
}
`;