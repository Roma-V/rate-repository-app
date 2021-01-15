import { useMutation } from '@apollo/react-hooks';

import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = () => {
    const [mutate, result, error] = useMutation(DELETE_REVIEW);
  
    const deleteReview = async (id) => {
        return mutate({ variables: { id } });
    };
  
    return [deleteReview, result, error];
};

export default useDeleteReview;