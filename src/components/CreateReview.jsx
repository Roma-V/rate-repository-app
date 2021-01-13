import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-native";

import FormikTextInput from './FormikTextInput';
import Button from './Button'
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .integer()
    .min(0)
    .max(100)
    .required('Rating is required'),
  text: yup
    .string()
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { 
      repositoryName, 
      ownerName,
      rating,
      text
    } = values;
    
    try {
      const { data } = await createReview({ 
        ownerName,
        repositoryName,
        rating: parseInt(rating),
        text
      });
      console.log('data recieved', data);
      const repoId = data.createReview.repository.id;
      history.push(`/repo/${repoId}`);
    } catch (error) {
      Alert.alert(
      "Failed to create a review",
      error.message,
      [
        { text: "OK" }
      ],
      { cancelable: false }
      );
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export const CreateReviewContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
  </Formik>
);

const CreateReviewForm = ({ onSubmit }) => (
  <View style={styles.columnContainer}>
    <FormikTextInput
      name="ownerName"
      placeholder="Repository owner name"
      style={[styles.contents]}
      testID="urepositoryOwnerField"
    />
    <FormikTextInput
      name="repositoryName"
      placeholder="Repository name"
      style={[styles.contents]}
      testID="repositoryNameField"
    />
    <FormikTextInput
      name="rating"
      placeholder="Rating between 0 and 100"
      style={[styles.contents]}
      testID="ratingField"
    />
    <FormikTextInput
      name="text"
      placeholder="Review"
      multiline
      numberOfLines={4}
      style={[styles.contents]}
      testID="reviewField"
    />
    <Button
      text='Create a review'
      onPress={onSubmit} 
      testID="submitButton"
      style={styles.contents}
    />
  </View>
);

export default CreateReview;