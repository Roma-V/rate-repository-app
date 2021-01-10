import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Link, Route, Switch, Redirect } from 'react-router-native';

import AppBar from './AppBar'
import RepositoryList from './RepositoryList'
import RepositoryDetails from './RepositoryDetails'
import SignIn from './SignIn'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route exact path="/" component={RepositoryList} />
        <Route exact path="/repo/:id" component={RepositoryDetails} />
        <Route path="/signin" exact component={SignIn} />
      </Switch>
    </View>
  );
};

export default Main;