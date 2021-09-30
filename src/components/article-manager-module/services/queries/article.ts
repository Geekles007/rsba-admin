import {gql} from "@apollo/client";

export const GET_ARTICLES = gql`
    query GET_ARTICLES($first: Int!, $after: ID) {
        retrieveAllFeedbackArticle(first: $first, after: $after) {
            id
            title
            content
            link
        }
    }
`;