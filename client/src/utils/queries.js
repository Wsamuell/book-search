import gql from 'graphql-tag';


export const QUERY_GET_ME = gql`
{
    me{
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;