import { useMutation } from '@apollo/react-hooks';

import { CREATE_USER } from '../graphql/mutations'

const useCreateUser = () => {
    const [mutate, result, error] = useMutation(CREATE_USER);
  
    const signUp = async ({ username, password }) => {
        return mutate({ variables: { username, password } });
    };
  
    return [signUp, result, error];
};

export default useCreateUser;