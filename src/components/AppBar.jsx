import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ImagePropTypes } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundAppbar
  },
  text: {
    color: theme.colors.textAppbar,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    margin: 10
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <AppBarTab>
            Repositories
        </AppBarTab>
    </View>
  );
};

const AppBarTab = (props) => {
    return (
      <TouchableWithoutFeedback onPress={null}>
        <View>
          <Text style={styles.text}>
            {props.children}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

export default AppBar;