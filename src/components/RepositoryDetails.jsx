import React from 'react';
import { useParams } from 'react-router-native';
import { View, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

import RepositoryItem from './RepositoryItem';
import ReviewList from './ReviewList';
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
    const { repository, reviews, loading, fetchMore } = useRepository(id);
    
    function onEndReach() {
        fetchMore();
    }

    function openGithub() {
        Linking.openURL(repository.url);
    };

    if (loading) return <Text>...</Text>

    return (
    <ReviewList
        style={styles.main}
        header={
            <RepositoryInfo
                repoData={repository} 
                urlHandler={openGithub}
            />
        }
        reviews={reviews}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
    />
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