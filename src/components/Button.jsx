import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
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

const Button = ({ text, onPress, testID, style }) => (
    <TouchableOpacity onPress={onPress} testID={testID}>
        <Text style={[style, styles.button]}>{text}</Text>
    </TouchableOpacity>
);

export default Button;