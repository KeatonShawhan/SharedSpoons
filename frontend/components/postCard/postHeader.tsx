// components/post/postHeader.tsx
import { Text, View,StyleSheet, Dimensions  } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Avatar } from 'react-native-paper';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'react-native';

const { width } = Dimensions.get('window');

interface postHeaderProps {
  username: string;
  place: string;
  user_id:string;
}

export function postHeader({ username, place, user_id }: postHeaderProps): React.JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <ThemedView>
      <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
        <Image 
        style={[styles.profileImage, { borderColor: Colors[colorScheme].icon }]}
        source={{ uri: 'https://via.placeholder.com/150' }} />
        <View>
          <Text
            style={{
              paddingLeft: 10,
              paddingTop: 0,
              fontSize: 16,
              fontWeight: 'bold',
              color: Colors[colorScheme].text, // Username text color based on theme
            }}
          >
            {username}
          </Text>
          <Text
            style={{
              paddingLeft: 10,
              paddingTop: 0,
              fontSize: 14,
              color: Colors[colorScheme].icon, // Place text color based on theme
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