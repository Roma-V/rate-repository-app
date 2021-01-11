import React from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useHistory } from 'react-router-native'

import RepositoryItem from './RepositoryItem'
import Text from './Text'
import theme from '../theme'

import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
    main: {
        backgroundColor: theme.colors.backgroundList
    },
    separator: {
        height: 10,
    },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { repositories, loading } = useRepositories();
    const history = useHistory()

    function choseRepo(id) {
        history.push(`/repo/${id}`);
    }

    if (loading) return <View><Text>Loading...</Text></View>
  
    return <RepositoryListContainer
        repositories={repositories} 
        choseRepo={choseRepo}
        />;
};

export const RepositoryListContainer = ({ repositories, choseRepo }) => {
    const repositoryNodes = repositories && repositories.edges
        ? repositories.edges.map(edge => edge.node)
        : [];

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => choseRepo(item.id)}>
            <RepositoryItem repoData={item} />
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.main}
        />
    );
};

export default RepositoryList;