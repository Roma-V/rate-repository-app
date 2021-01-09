import React from 'react';
import { View, TouchableWithoutFeedback, Alert, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-native";
import { useApolloClient } from '@apollo/react-hooks';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
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
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, 'Username must be at least 3 symbols long')
        .required('Username is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 symbols long')
        .required('Password is required'),
});

const SignIn = () => {
    const storage = React.useContext(AuthStorageContext);
    const client = useApolloClient();
    const [signIn] = useSignIn();
    const history = useHistory();

    const onSubmit = async (values) => {
        const { username, password } = values;
    
        try {
          const { data } = await signIn({ username, password });
          await storage.setAccessToken(data.authorize.accessToken);
          client.resetStore();
          history.push("/");
        } catch (e) {
          Alert.alert(
            "Failed authorization",
            e.message,
            [
              { text: "OK" }
            ],
            { cancelable: false }
          );
      
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    )
};

const SignInForm = ({ onSubmit }) => {
    return (
      <View style={styles.columnContainer}>
        <FormikTextInput
            name="username"
            placeholder="username"
            style={[styles.contents]}
        />
        <FormikTextInput
            name="password"
            placeholder="password"
            secureTextEntry
            style={[styles.contents]}
        />
        <TouchableWithoutFeedback onPress={onSubmit}>
          <Text style={[styles.contents, styles.button]}>Sign in</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

export default SignIn;