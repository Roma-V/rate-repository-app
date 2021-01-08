import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme'

const styles = StyleSheet.create({
  field: {
    borderColor: theme.colors.backgroundList,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10
  },
  fieldError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    marginBottom: 5,
    color: theme.colors.error
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const style = [styles.field]
  if (showError) style.push(styles.fieldError)

  return (
    <View style={props.style}>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
        style={style}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;