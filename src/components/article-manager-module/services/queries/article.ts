import {gql} from "@apollo/client";

export const GET_ARTICLES = gql`
    query GET_ARTICLES($first: Int!, $after: ID) {
        retrieveAllFeedbackArticle(first: $first, after: $after) {
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

export const SEARCH_ARTICLES = gql`
    query SEARCH_ARTICLE($input: String!, $first: Int!, $after: ID) {
        searchFeedbackArticle(input: $input, first: $first, after: $after) {
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