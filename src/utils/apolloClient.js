import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants'

const serverUri = Constants.manifest.extra.apolloUri

const createApolloClient = () => {
  const client = new ApolloClient({ uri: serverUri });
  return client;
};

export default createApolloClient;
