import ApolloClient from 'apollo-boost';

const createApolloClient = () => {
  const client = new ApolloClient({ uri: 'http://192.168.1.42:5000/graphql' });
  return client;
};

export default createApolloClient;
