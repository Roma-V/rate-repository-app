import { useQuery } from '@apollo/react-hooks';

import { AUTHORIZED_USER } from '../graphql/queries'

const useAuthorizedUser = () => {
    const { data } = useQuery(AUTHORIZED_USER);
    const user = data && data.authorizedUser && data.authorizedUser.username;

    return user;
};

export default useAuthorizedUser;