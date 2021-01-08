import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/react-hooks'

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient'

const client = createApolloClient()

export default function App() {
  
  console.log('App started');
  return (
    <NativeRouter>
      <ApolloProvider client={client}>
        <Main />
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
