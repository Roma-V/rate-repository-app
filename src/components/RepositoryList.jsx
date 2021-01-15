import React, { useState } from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import RepositorySortMenu, { RepoSelectOptions} from './RepositorySortMenu';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import theme from '../theme';

import useRepositories from '../hooks/useRepositories';
import { AllRepositoriesOrderBy, OrderDirection} from '../graphql/types';

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
    const [filter, setFilter] = useState("");
    const [filterValue] = useDebounce(filter, 1000);
    const [orderBy, setOrderBy] = useState(AllRepositoriesOrderBy.CREATED_AT);
    const [orderDirection, setOrderDirection] = useState(OrderDirection.DESC);
    const { repositories, loading, fetchMore } = useRepositories(
        4, orderBy, orderDirection, filterValue
        );
    const history = useHistory()

    const repositoryNodes = repositories && repositories.edges
        ? repositories.edges.map(edge => edge.node)
        : [];

    function choseRepo(id) {
        history.push(`/repo/${id}`);
    }

    function onFilter(key) {
        console.log(key);
        setFilter(key);
    }

    function selectOrder(value) {
        switch (value) {
            case RepoSelectOptions.latest:
                setOrderBy(AllRepositoriesOrderBy.CREATED_AT);
                setOrderDirection(OrderDirection.DESC);
                break;
            case RepoSelectOptions.highestRated: 
                setOrderBy(AllRepositoriesOrderBy.RATING_AVERAGE);
                setOrderDirection(OrderDirection.DESC);
                break;
            case RepoSelectOptions.lowestRated:
                setOrderBy(AllRepositoriesOrderBy.RATING_AVERAGE);
                setOrderDirection(OrderDirection.ASC);
                break;
            default:
                break;
        }
    }

    function onEndReach() {
        fetchMore();
    }

    if (loading) return <View><Text>Loading...</Text></View>
  
    return <RepositoryListContainer
        repositories={repositoryNodes} 
        choseRepo={choseRepo}
        selectOrder={selectOrder}
        filter={filter}
        onFilter={onFilter}
        onEndReach={onEndReach}
        />;
};

export class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        const { selectOrder, filter, onFilter } = this.props;

        return (
            <RepositorySortMenu
                onSelect={selectOrder}
                filter={filter}
                onFilter={onFilter}
            />
        );
    };

    renderItem = ({ item }) => {
        const { choseRepo } = this.props;
        return (
        <TouchableOpacity onPress={() => choseRepo(item.id)}>
            <RepositoryItem repoData={item} />
        </TouchableOpacity>
    )};
  
    render() {
        const { repositories, onEndReach } = this.props;
        return (
            <FlatList
                data={repositories}
                ListHeaderComponent={this.renderHeader}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                style={styles.main}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
            />
        );
        }
}

// export const RepositoryListContainer = ({ 
//     repositories, 
//     choseRepo, 
//     selectOrder,
//     filter,
//     onFilter
// }) => {
//     const repositoryNodes = repositories && repositories.edges
//         ? repositories.edges.map(edge => edge.node)
//         : [];

//     const renderItem = ({ item }) => (
//         <TouchableOpacity onPress={() => choseRepo(item.id)}>
//             <RepositoryItem repoData={item} />
//         </TouchableOpacity>
//     );

//     return (
//         <FlatList
//             data={repositoryNodes}
//             ListHeaderComponent={
//                 <RepositorySortMenu
//                     onSelect={selectOrder}
//                     filter={filter}
//                     onFilter={onFilter}
//                 />}
//             ItemSeparatorComponent={ItemSeparator}
//             renderItem={renderItem}
//             keyExtractor={item => item.id}
//             style={styles.main}
//         />
//     );
// };

export default RepositoryList;