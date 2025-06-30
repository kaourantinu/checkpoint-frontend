import { gql } from "@apollo/client";

export const LIST_ALL_CONTINENTS = gql`
  query ListAllContinents {
    continents {
      id
      name
    }
  }
`;

