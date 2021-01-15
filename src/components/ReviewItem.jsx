import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native'

import Text from './Text';
import Button from './Button';
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
        flexDirection: 'row'
    },
    alignStart: {
        justifyContent: 'flex-start'
    },
    alignCenter: {
        justifyContent: 'space-evenly',
        marginTop: 10
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
    button: {
        flex: 1,
        flexGrow: 1,
    },
    viewButton: {
    },
    deleteButton: {
        borderColor: theme.colors.secondary,
        backgroundColor: theme.colors.secondary,
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

const ReviewItem = ({ item, buttons }) => (
    <View style={[styles.columnContainer, styles.main]}>
        <View style={[styles.rowContainer, styles.alignStart]}>
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
        {
            buttons && buttons.show
                ? <Buttons item={item} onDelete={buttons.onDelete} />
                : null
        }
    </View>
);

const Buttons = ({ item, onDelete }) => {
    const history = useHistory();

    function viewRepo() {
        history.push(`/repo/${item.repository.id}`);
    }

    function deleteReviewHandler() {
        Alert.alert(
            "Confirm deletion",
            null,
            [
                { 
                    text: "OK", 
                    style: "destructive",
                    onPress: () => onDelete(item.id)
                },
                {
                    text: "Cancel", 
                    style: "cancel",
                    onPress: () => console.log('canlceled deletion')
                }
            ],
            { cancelable: true }
        );
    }

    return(
    <View style={[styles.rowContainer, styles.alignCenter]}>
        <Button
            style={[styles.button, styles.viewButton]}
            text='View repository'
            onPress={viewRepo}
        />
        <Button
            style={[styles.button, styles.deleteButton]}
            text='Delete review'
            onPress={deleteReviewHandler}
        />
    </View>
)};

export default ReviewItem;