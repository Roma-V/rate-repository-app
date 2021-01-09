import { gql } from 'apollo-boost';

export const SIGNIN = gql`
    mutation SignIn($username: String!, $password: String!) {
        authorize(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`;