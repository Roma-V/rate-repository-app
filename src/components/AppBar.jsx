import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

// import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundAppbar,
    flexGrow: 0
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
      <Link to="/signin">
        <Text style={styles.text}>
          Sign in
        </Text>
      </Link>
    </ScrollView>
  );
};

export default AppBar;