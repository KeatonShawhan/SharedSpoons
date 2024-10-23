import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function starDisplay({ rating }) {
  const StarRating = (rating) => {
    const stars = [];
    const filledStarColor = "#FFA41C";
    const outlinedStarColor = "#DE7920";

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full Star
        stars.push(
          <Ionicons
            key={i}
            name="star"
            size={18}
            color={filledStarColor}
            style={styles.starIcon}
          />
        );
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        // Half Star
        stars.push(
          <Ionicons
            key={i}
            name="star-half"
            size={18}
            color={filledStarColor}
            style={styles.starIcon}
          />
        );
      } else {
        // Outline Star
        stars.push(
          <Ionicons
            key={i}
            name="star-outline"
            size={18}
            color={outlinedStarColor}
            style={styles.starIcon}
          />
        );
      }
    }

    return <View style={styles.starContainer}>{stars}</View>;
  };

  return <View>{StarRating(rating)}</View>;
}

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  starIcon: {
    marginRight: 2,
  },
});