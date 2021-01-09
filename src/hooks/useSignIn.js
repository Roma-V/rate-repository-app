import { useMutation } from '@apollo/react-hooks';

import { SIGNIN } from '../graphql/mutations'

const useSignIn = () => {
    const [mutate, result, error] = useMutation(SIGNIN);
  
    const signIn = async ({ username, password }) => {
        return mutate({ variables: { username, password } });
    };
  
    return [signIn, result, error];
};

export default useSignIn;