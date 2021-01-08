// import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
    const { 
        loading,
        error,
        refetch, 
        data
    } = useQuery(GET_REPOSITORIES);
    const repositories = data ? data.repositories : null;

    // const [repositories, setRepositories] = useState();
    // const [loading, setLoading] = useState(false);

    // const fetchRepositories = async () => {
    //     setLoading(true);

    //     // Replace the IP address part with your own IP address!
    //     const response = await fetch('http://localhost:5000/api/repositories');
    //     const json = await response.json();

    //     setLoading(false);
    //     setRepositories(json);
    // };

    // useEffect(() => {
    //     fetchRepositories();
    // }, []);

    if (error) console.log('hook error', error);

    return { repositories, loading, refetch };
};

export default useRepositories;