import { gql } from 'apollo-boost';

// import { OrderDirection, AllRepositoriesOrderBy } from './types'

export const GET_REPOSITORIES = gql`
    query GetRepos(
        $orderDirection: OrderDirection,
        $orderBy: AllRepositoriesOrderBy,
        $searchKeyword: String
        ) {
        repositories(
            orderDirection: $orderDirection
            orderBy: $orderBy,
            searchKeyword: $searchKeyword
        ) {
            edges{
                node {
                    id,
                    ownerAvatarUrl,
                    fullName,
                    description,
                    language,
                    forksCount,
                    stargazersCount,
                    ratingAverage,
                    reviewCount
                }
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query GetRepo($id: ID!) {
        repository(id: $id) {
            id,
            ownerAvatarUrl,
            fullName,
            description,
            language,
            forksCount,
            stargazersCount,
            ratingAverage,
            reviewCount,
            url,
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;

export const AUTHORIZED_USER = gql`
    query {
        authorizedUser {
            username
        }
    }
`;