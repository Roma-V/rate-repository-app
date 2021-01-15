import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries'
import { OrderDirection, AllRepositoriesOrderBy} from '../graphql/types'

const useRepositories = (
    first=4,
    orderBy=AllRepositoriesOrderBy.CREATED_AT,
    orderDirection=OrderDirection.DESC,
    searchKeyword="ze") => {
    const variables = {
        first,
        orderBy,
        orderDirection,
        searchKeyword
    };

    const { 
        loading,
        error,
        refetch, 
        data,
        fetchMore
    } = useQuery(
        GET_REPOSITORIES, 
        { 
            variables,
            fetchPolicy: "cache-and-network"
        }
        );
    const repositories = data ? data.repositories : null;

    const handleFetchMore = () => {
        const canFetchMore =
          !loading && data && data.repositories.pageInfo.hasNextPage;
    
        if (!canFetchMore) return;
    
        fetchMore({
            query: GET_REPOSITORIES,
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                repositories: {
                    ...fetchMoreResult.repositories,
                    edges: [
                    ...previousResult.repositories.edges,
                    ...fetchMoreResult.repositories.edges,
                    ],
                },
                };
        
                return nextResult;
            },
        });
    };

    if (error) console.log('hook error', error);

    return { 
        repositories, 
        loading, 
        refetch, 
        fetchMore: handleFetchMore
    };
};

export default useRepositories;