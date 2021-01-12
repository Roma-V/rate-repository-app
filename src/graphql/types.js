import { gql } from 'apollo-boost';

export const OrderDirection = gql`
    enum OrderDirection {
        ASC
        DESC
    }
`;

export const AllRepositoriesOrderBy = gql`
    enum AllRepositoriesOrderBy {
        CREATED_AT
        RATING_AVERAGE
    }
`;
