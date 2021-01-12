import { gql } from 'apollo-boost';

export const SIGNIN = gql`
    mutation SignIn($username: String!, $password: String!) {
        authorize(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation SignIn(
        $repositoryName: String!, 
        $ownerName: String!,
        $rating: Int!,
        $text: String
        ) {
        createReview(review: {
            repositoryName: $repositoryName, 
            ownerName: $ownerName,
            rating: $rating,
            text: $text
        }) {
            id
            text
            rating
            createdAt
            repository {
                id
            }
            user {
                id
                username
            }
        }
    }
`;