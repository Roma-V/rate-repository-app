import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/react-hooks'
import Constants from 'expo-constants'

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient'
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const client = createApolloClient(authStorage);

export default function App() {
  console.log('App started');

  return (
    <NativeRouter>
      <ApolloProvider client={client}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
