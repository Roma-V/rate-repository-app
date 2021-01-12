import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch } from 'react-router-native';

import AppBar from './AppBar'
import RepositoryList from './RepositoryList'
import CreateReview from './CreateReview'
import RepositoryDetails from './RepositoryDetails'
import SignIn from './SignIn'
import SignUp from './SignUp'

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
        <Route exact path="/review/" component={CreateReview} />
        <Route exact path="/repo/:id" component={RepositoryDetails} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </View>
  );
};

export default Main;