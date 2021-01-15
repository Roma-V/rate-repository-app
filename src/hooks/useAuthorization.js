import { useQuery } from '@apollo/react-hooks';

import { AUTHORIZED_USER } from '../graphql/queries'

const useAuthorizedUser = (includeReviews=false) => {
    const variables = { includeReviews }
    const { loading, data, fetchMore, refetch } = useQuery(
        AUTHORIZED_USER,
        {
            fetchPolicy: 'cache-and-network',
            variables
        }
    );
    const user = data && data.authorizedUser && data.authorizedUser.username;
    const reviews = data 
        && data.authorizedUser 
        && data.authorizedUser.reviews
        && data.authorizedUser.reviews.edges.map(edge => edge.node);
    
    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;
    
        if (!canFetchMore) return;
    
        fetchMore({
            query: AUTHORIZED_USER,
            variables: {
                after: data.authorizedUser.reviews.pageInfo.endCursor,
                ...variables
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    authorizedUser: {
                        ...fetchMoreResult.authorizedUser,
                        reviews: {
                            ...fetchMoreResult.repository.reviews,
                            edges: [
                            ...previousResult.repository.reviews.edges,
                            ...fetchMoreResult.repository.reviews.edges,
                            ],
                        }
                    },
                };
        
                return nextResult;
            },
        });
    };

    return { loading, user, reviews, fetchMore: handleFetchMore, refetch };
};

export default useAuthorizedUser;