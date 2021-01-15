import React from 'react';
import { FlatList } from 'react-native';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews, header, itemButtons, ...props }) => (
    <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        ListHeaderComponent={header}
        renderItem={({ item }) => <ReviewItem
            item={item}
            buttons={itemButtons}
        />}
        {...props}
    />
);

export default ReviewList;