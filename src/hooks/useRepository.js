import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = (id, first=2) => {
    const variables = { first, id };
    const { 
        loading,
        error,
        refetch, 
        data,
        fetchMore
    } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables
    });
    const repository = data ? data.repository : null;
    const reviews = repository 
        ? repository.reviews.edges.map(edge => edge.node)
        : null;
    
    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && repository.reviews.pageInfo.hasNextPage;
    
        if (!canFetchMore) return;
    
        fetchMore({
            query: GET_REPOSITORY,
            variables: {
                after: repository.reviews.pageInfo.endCursor,
                ...variables
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    repository: {
                        ...fetchMoreResult.repository,
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

    if (error) console.log('hook error', error);

    return {
        repository, 
        reviews, 
        loading, 
        refetch,
        fetchMore: handleFetchMore
    };
};

export default useRepository;