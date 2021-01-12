import { useMutation } from '@apollo/react-hooks';

import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
    const [mutate, result, error] = useMutation(CREATE_REVIEW);
  
    const createReview = async ({
            repositoryName, 
            ownerName,
            rating,
            text
        }) => {
        return mutate({ 
            variables: { repositoryName, ownerName, rating, text } 
        });
    };
  
    return [createReview, result, error];
};

export default useCreateReview;