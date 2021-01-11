import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text'
import theme from '../theme';

const styles = StyleSheet.create({
    main: {
        backgroundColor: theme.colors.backgroundItem,
        marginTop: 10,
        padding: 5
    },
    // Flexoptions
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    columnContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flex: 1
    },
    rating: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        width: 50,
        height: 50,
        borderColor: theme.colors.primary,
        borderWidth:2,
        borderRadius: 25,
    },
    rowContent: {
        marginTop: 5,
        overflow: 'hidden'
    },
    // Text styling
    nameText: {
      fontSize: theme.fontSizes.subheading,
      fontWeight: theme.fontWeights.bold,
      color: theme.colors.textPrimary,
    },
    dateText: {
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.normal,
        color: theme.colors.textSecondary,
    },
    ratingText: {
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.primary
    },
    reviewText: {
        flex: 1,
    },
});

const ReviewItem = ({ item }) => (
    <View style={[styles.columnContainer, styles.main]}>
        <View style={[styles.rowContainer]}>
            <View style={styles.rating}>
                <Text style={styles.ratingText} testID="reviewRating">
                    {item.rating}
                </Text>
            </View>
            <View style={styles.columnContainer} >
                <Text style={styles.nameText} testID="reviewUser">
                    {item.user.username}
                </Text>
                <Text style={styles.dateText} testID="reviewDate">
                    {new Date(item.createdAt).toLocaleDateString()}
                </Text>
                <View style={[styles.rowContent, styles.reviewText]}>
                    <Text testID="reviewText">
                        {item.text}
                    </Text>
                </View>
            </View>
        </View>
    </View>
    
);

export default ReviewItem;