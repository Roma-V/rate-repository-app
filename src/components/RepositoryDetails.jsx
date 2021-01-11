import React from 'react';
import { useParams } from 'react-router-native'
import { View, FlatList, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import Text from './Text';
import Button from './Button';
import theme from '../theme';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
    main: {
        backgroundColor: theme.colors.backgroundList
    },
    info: {
        backgroundColor: theme.colors.backgroundItem
    },
    separator: {
        height: 10,
    },
    button: {
        margin: 5
    }
});

const RepositoryDetails = () => {
    const { id } = useParams();
    const { repository, reviews, loading } = useRepository(id);
    
    function openGithub() {
        Linking.openURL(repository.url);
    };

    if (loading) return <Text>...</Text>

    return (
    <View style={styles.main}>
        <FlatList
            data={reviews}
            keyExtractor={item => item.id}
            ListHeaderComponent={() => <RepositoryInfo
                repoData={repository} 
                urlHandler={openGithub}
            />}
            renderItem={({ item }) => <ReviewItem
                item={item}
            />}
        />
    </View>
    );
};

const RepositoryInfo = ({ repoData, urlHandler }) => (
    <View style={styles.info}>
        <RepositoryItem repoData={repoData} />
        <Button
            text='Open GitHub'
            onPress={urlHandler}
            testID="githubLinkButton"
            style={styles.button}
        />
    </View>
);

export default RepositoryDetails;