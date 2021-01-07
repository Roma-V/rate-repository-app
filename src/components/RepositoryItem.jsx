import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text'
import AvatarImage from './Avatar'
import theme from '../theme';

const styles = StyleSheet.create({
    main: {
        backgroundColor: theme.colors.backgroundItem,
        marginBottom: 5
    },
    // Flexoptions
    columnContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    spreadItems: {
        justifyContent: 'space-around'
    },
    gatherItemsAtStart: {
        justifyContent: 'flex-start'
    },
    alignItemsToCenter: {
        alignItems: 'center'
    },
    rowContent: {
        marginTop: 10
    },
    // Text styling
    primaryText: {
      fontSize: theme.fontSizes.subheading,
      fontWeight: theme.fontWeights.bold,
      color: theme.colors.textPrimary
    },
    secondaryText: {
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.normal,
        color: theme.colors.textSecondary,
    },
    description: {
        minWidth: '70%',
        maxWidth: '85%'
    },
    language: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.textAppbar,
        width: 'fit-content',
        padding: 5,
        borderRadius: 2
    }
});

const RepositoryItem = ({ repoData }) => (
    <View style={[styles.columnContainer, styles.main]}>
        <View style={[styles.rowContainer, styles.gatherItemsAtStart]} >
            <AvatarImage imageUrl={repoData.ownerAvatarUrl} />
            <View style={styles.columnContainer}>
                <Text style={[styles.primaryText, styles.rowContent]}>{repoData.fullName}</Text>
                <Text style={[styles.secondaryText, styles.description, styles.rowContent]}>{repoData.description}</Text>
                <View style={styles.rowContent}>
                    <Text style={styles.language}>{repoData.language}</Text>
                </View>
            </View>
        </View>
        <View style={[styles.rowContainer, styles.spreadItems, styles.rowContent]} >
            <BottomItem name='Forks' value={repoData.forksCount} />
            <BottomItem name='Stars' value={repoData.stargazersCount} />
            <BottomItem name='Rating' value={repoData.ratingAverage} />
            <BottomItem name='Reviews' value={repoData.reviewCount} />
        </View>
    </View>
);

const BottomItem = ({ name, value }) => {
    function convertLargeNumbers(number) {
        if (typeof number !== 'number') return number;
        if (number < 1000) return number;
        else return (number / 1000).toFixed(1).toString() + 'k'
    }

    return (
        <View style={[styles.columnContainer, styles.alignItemsToCenter]} >
            <Text style={styles.primaryText}>{convertLargeNumbers(value)}</Text>
            <Text style={styles.secondaryText}>{name}</Text>
        </View>
    )
};

export default RepositoryItem;