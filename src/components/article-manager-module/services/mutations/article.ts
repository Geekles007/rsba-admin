import {gql} from "@apollo/client";

export const CREATE_EDIT_ARTICLE = gql`
    mutation CREATE_EDIT_ARTICLE($input: FeedbackArticleInput!) {
        createOrEditFeedbackArticle(input: $input) {
            id
            title
            link
            content
        }
    }
`;

export const DELETE_ARTICLE = gql`
    mutation DELETE_ARTICLE($input: ID!) {
        deleteFeedbackArticle(input: $input)
    }
`;