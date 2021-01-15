import React from 'react';
import { StyleSheet } from 'react-native';

import ReviewList from './ReviewList';
import Text from './Text';
import theme from '../theme';
import useAuthorization from '../hooks/useAuthorization';
import useDeleteReview from '../hooks/useDeleteReview';

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

const MyReviewList = () => {
    const { loading, reviews, fetchMore, refetch } = useAuthorization(true);
    const [deleteReview] = useDeleteReview();

    function onEndReach() {
        fetchMore();
    }

    async function onDeleteReview(id) {
        await deleteReview(id);
        refetch();
    }

    if (loading) return <Text>...</Text>

    return (
        <ReviewList
            style={styles.main}
            reviews={reviews}
            itemButtons={{ show: true, onDelete: onDeleteReview }}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};

export default MyReviewList;