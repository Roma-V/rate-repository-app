import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useApolloClient } from '@apollo/react-hooks';

// import Text from './Text';
import theme from '../theme';
import useAuthorization from '../hooks/useAuthorization';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundAppbar,
    flexGrow: 0,
    flexShrink: 0
  },
  text: {
    margin: 20,
    color: theme.colors.textAppbar,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  }
});

const AppBar = () => {
  return (
    <ScrollView horizontal style={styles.container}>
      <Link to="/" >
        <Text style={styles.text}>
          Repositories
        </Text>
      </Link>
      <User />
    </ScrollView>
  );
};

const User = () => {
  const storage = React.useContext(AuthStorageContext);
  const client = useApolloClient();
  const user = useAuthorization();

  async function logOut() {
    await storage.removeAccessToken();
    client.resetStore();
  }
  
  if (user)
    return (
      <TouchableOpacity onPress={logOut}>
        <Text style={styles.text}>{user} signed in</Text>
      </TouchableOpacity>
    );
  else
    return (
      <Link to="/signin">
        <Text style={styles.text}>
          Sign in
        </Text>
      </Link>
    );
};

export default AppBar;