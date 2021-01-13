import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries'
import { OrderDirection, AllRepositoriesOrderBy} from '../graphql/types'

const useRepositories = (
    orderBy=AllRepositoriesOrderBy.CREATED_AT,
    orderDirection=OrderDirection.DESC,
    searchKeyword="ze") => {
    const { 
        loading,
        error,
        refetch, 
        data
    } = useQuery(
        GET_REPOSITORIES, 
        { 
            variables: {
                orderBy,
                orderDirection,
                searchKeyword
            },
            fetchPolicy: "cache-and-network"
        }
        );
    const repositories = data ? data.repositories : null;

    if (error) console.log('hook error', error);

    return { repositories, loading, refetch };
};

export default useRepositories;