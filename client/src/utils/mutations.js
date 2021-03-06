import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($email: String!, $password: String!, $username: String!) {
        addUser(email: $email, password: $password, username: $username) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($content: bookData!) {
        saveBook(content: $content) {
            _id
            username
            savedBooks {
                bookId
                title
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            savedBooks {
                bookId
                title
            }
        }
    }
`;
