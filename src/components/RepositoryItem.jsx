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
        flexDirection: 'column',
        flexGrow: 1,
        flex: 1
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
        marginTop: 5,
        overflow: 'hidden'
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
        color: theme.colors.textSecondary
    },
    description: {
        flexGrow: 1,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    languageInner: {
        color: theme.colors.textAppbar
    },
    languageOuter: {
        backgroundColor: theme.colors.primary,
        alignSelf: 'flex-start',
        borderWidth: 5,
        borderColor: theme.colors.primary,
        borderRadius: 5
    }
});

const RepositoryItem = ({ repoData }) => (
    <View style={[styles.columnContainer, styles.main]}>
        <View style={[styles.rowContainer, styles.gatherItemsAtStart]} >
            <AvatarImage imageUrl={repoData.ownerAvatarUrl} />
            <View style={styles.columnContainer}>
                <Text style={[styles.primaryText, styles.rowContent]}>{repoData.fullName}</Text>
                <View style={[styles.rowContent, styles.description]}>
                    <Text style={[styles.secondaryText, styles.rowContent]}>{repoData.description}</Text>
                </View>
                <View style={[styles.rowContent, styles.languageOuter]}>
                    <Text style={styles.languageInner}>{repoData.language}</Text>
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