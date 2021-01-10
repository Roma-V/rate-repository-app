import React from 'react';
import { useParams } from 'react-router-native'
import { View, StyleSheet } from 'react-native';

import RepositoryItem from './RepositoryItem'
import { ItemSeparator } from './RepositoryList'
import Text from './Text'
import theme from '../theme';

const styles = StyleSheet.create({
    main: {
        backgroundColor: theme.colors.backgroundList
    },
    separator: {
        height: 10,
    },
});

const RepositoryDetails = () => {
    const { id } = useParams();

    return (
    <View style={styles.main}>
        <RepositoryItem repoData={repoData} />
        <Text>{id}</Text>
    </View>
    );
};

export default RepositoryDetails;