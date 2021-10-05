import {gql} from "@apollo/client";

export const GET_TYPES = gql`
    query GET_TYPES($first: Int!, $after: ID) {
        retrieveAllOrderType(first: $first, after: $after) {
            edges {
                node {
                    id
                    name
                    description
                    isDefault
                }
            }
        }
    }
`;

export const SEARCH_TYPE_OF_ORDER = gql`
    query SEARCH_TYPE_OF_ORDER($input: String!, $first: Int!, $after: ID) {
        searchOrderType(input: $input, first: $first, after: $after) {
            edges {
                node {
                    id
                    title
                    content
                    link
                }
            }
        }
    }
`;