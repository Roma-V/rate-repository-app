import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-native";
import { useApolloClient } from '@apollo/react-hooks';

import FormikTextInput from './FormikTextInput';
import Button from './Button'
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import useCreateUser from '../hooks/useCreateUser'
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  // Flexoptions
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  // Appearance
  contents: {
    margin: 5
  },
  button: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
    padding: 10,
    color: theme.colors.textAppbar,
    textAlign: 'center'
  }
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be at least 1 symbols long')
    .max(30, 'Username must be at most 30 symbols long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 symbols long')
    .max(50, 'Password must be at most 50 symbols long')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Should match password')
    .required('Password confirm is required')
});

const SignUp = () => {
  const storage = React.useContext(AuthStorageContext);
  const client = useApolloClient();
  const [signIn] = useSignIn();
  const [signUp] = useCreateUser();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      const { data } = await signIn({ username, password });
      await storage.setAccessToken(data.authorize.accessToken);
      await client.resetStore();
      history.push("/");
    } catch (e) {
      Alert.alert(
        "Failed",
        e.message,
        [
          { text: "OK" }
        ],
        { cancelable: false }
      );
  
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export const SignUpContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
  </Formik>
);

const SignUpForm = ({ onSubmit }) => (
  <View style={styles.columnContainer}>
    <FormikTextInput
      name="username"
      placeholder="username"
      style={[styles.contents]}
      testID="usernameField"
    />
    <FormikTextInput
      name="password"
      placeholder="password"
      secureTextEntry
      style={[styles.contents]}
      testID="passwordField"
    />
    <FormikTextInput
      name="passwordConfirmation"
      placeholder="confirm password"
      secureTextEntry
      style={[styles.contents]}
      testID="passwordConfirmationField"
    />
    <Button
      text='Sign up'
      onPress={onSubmit} 
      testID="submitButton"
      style={styles.contents}
    />
  </View>
);

export default SignUp;