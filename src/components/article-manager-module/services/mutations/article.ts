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