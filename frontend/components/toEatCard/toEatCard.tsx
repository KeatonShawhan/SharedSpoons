// components/toEatCard/toEatCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const ORANGE_COLOR = '#FF9F45';

export function toEatCard({
  id,
  dish,
  place,
  image,
  onPress,
}: {
  dish: string;
  place: string;
  image: string;
  id: string;
  onPress: () => void;
}) {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View
          style={[
            styles.card,
            {
              borderColor: ORANGE_COLOR,
              backgroundColor: themeColors.background,
            },
          ]}
        >
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: image,
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.dishText,
                { color: themeColors.text },
              ]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {dish}
            </Text>
            <Text
              style={[
                styles.placeText,
                { color: themeColors.icon },
              ]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {place}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <MaterialIcons name="arrow-forward-ios" size={24} color={themeColors.tint} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    height: 120,
    width: '95%',
    borderRadius: 20,
    borderWidth: 3,
    flexDirection: 'row',
    position: 'relative',
  },
  imageContainer: {
    top: 7,
    left: 10,
    paddingRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  dishText: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 40,
  },
  placeText: {
    paddingLeft: 10,
    fontSize: 16,
    marginRight: 40,
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
    height: '100%',
  },
});
