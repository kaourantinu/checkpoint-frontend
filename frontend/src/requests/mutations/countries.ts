import { gql } from "@apollo/client";

export const ADD_COUNTRY = gql`
    mutation addCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
        id
    }
    }
`;