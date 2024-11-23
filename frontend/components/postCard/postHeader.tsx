// components/post/postHeader.tsx
import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'react-native';

const { width } = Dimensions.get('window');

interface postHeaderProps {
  username: string;
  place: string;
  user_id: string;
  onNavigateToProfile: () => void;
  pfp: string;
}

export function postHeader({ username, place, onNavigateToProfile, pfp }: postHeaderProps): React.JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <ThemedView>
      <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
        <TouchableOpacity onPress={onNavigateToProfile}>
          <Image 
            style={[styles.profileImage, { borderColor: Colors[colorScheme].icon }]}
            /* eslint-disable */
            source={pfp ? { uri: pfp } : require('../../assets/images/default.jpeg')}
            /* eslint-enable */
            />
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={onNavigateToProfile}>
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 16,
                fontWeight: 'bold',
                color: Colors[colorScheme].text, 
              }}
            >
              {username}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 14,
              color: Colors[colorScheme].icon,
              fontWeight: '500',
            }}
          >
            {place}
          </Text>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.125,
  },
});