import * as React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import theme from '../theme'

const style = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: theme.colors.backgroundList,
        margin: 0,
        padding: 10
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    scrollContentContainer: {
        paddingTop: 40,
        paddingBottom: 10,
    },
    inputIOS: {
      fontSize: theme.fontSizes.body,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: theme.fontSizes.body,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    filter: {
        marginBottom: 5,
        color: theme.colors.textPrimary,
        backgroundColor: theme.colors.backgroundItem,
        shadowColor: theme.colors.textPrimary,
        shadowOpacity: 50,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 0
        },
        borderRadius: 5,
        padding: 10
    }
  });

export const RepoSelectOptions = Object.freeze({
    latest: 'latest', 
    highestRated: 'highestRated',
    lowestRated: 'lowestRated'
});

const RepositorySortMenu = ({ onSelect, filter, onFilter }) => {
    return (
        <View style={style.container}>
            <TextInput
                style={style.filter}
                value={filter}
                onChangeText={onFilter}
            />
            <RNPickerSelect
                style={style}
                onValueChange={onSelect}
                placeholder={{ 
                    label: 'Select item', 
                    value: 'placeholder' 
                }}
                items={[
                    { 
                        label: 'Latest repositories', 
                        value: RepoSelectOptions.latest 
                    },
                    { 
                        label: 'Highest rated repositories', 
                        value: RepoSelectOptions.highestRated
                    },
                    { 
                        label: 'Lowest rated repositories', 
                        value: RepoSelectOptions.lowestRated
                    },
                ]}
            />
        </View>
    );
};

export default RepositorySortMenu;