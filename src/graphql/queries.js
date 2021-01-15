import { gql } from 'apollo-boost';

// import { OrderDirection, AllRepositoriesOrderBy } from './types'

export const GET_REPOSITORIES = gql`
    query GetRepos(
        $after: String
        $first: Int
        $orderDirection: OrderDirection,
        $orderBy: AllRepositoriesOrderBy,
        $searchKeyword: String
        ) {
        repositories(
            after: $after,
            first: $first,
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
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                totalCount
                hasNextPage
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query GetRepo($id: ID!, $first: Int, $after: String) {
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
            reviews(first: $first, after: $after) {
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
                    cursor
                }
                pageInfo {
                    endCursor
                    startCursor
                    totalCount
                    hasNextPage
                }
            }
        }
    }
`;

export const AUTHORIZED_USER = gql`
    query getAuthorizedUser($includeReviews: Boolean = false) {
        authorizedUser {
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
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
                    cursor
                }
                pageInfo {
                    endCursor
                    startCursor
                    totalCount
                    hasNextPage
                }
              }
        }
    }
`;