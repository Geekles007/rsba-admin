import {gql} from "@apollo/client";

export const CREATE_EDIT_TYPE_OF_ORDER = gql`
    mutation CREATE_EDIT_ARTICLE($input: OrderTypeInput!) {
        createOrEditOrderType(input: $input) {
            id
            name
            description
            isDefault
        }
    }
`;

export const UPLOAD_FILE = gql`
    mutation UPLOAD_FILE($input: EditUserInput!) {
        editUserProfile(input: $input) {
            id
            login
        }
    }
`;

export const DELETE_TYPE_OF_ORDER = gql`
    mutation DELETE_TYPE_OF_ORDER($input: ID!) {
        deleteOrderType(input: $input)
    }
`;