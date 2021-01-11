import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = (id) => {
    const { 
        loading,
        error,
        refetch, 
        data
    } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { id }
    });
    const repository = data ? data.repository : null;
    const reviews = repository 
        ? repository.reviews.edges.map(edge => edge.node)
        : null;

    if (error) console.log('hook error', error);

    return { repository, reviews, loading, refetch };
};

export default useRepository;