// components/post/postHeader.tsx
import { Text, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Avatar } from 'react-native-paper';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'react-native';

interface postHeaderProps {
  username: string;
  place: string;
}

export function postHeader({ username, place }: postHeaderProps): React.JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <ThemedView>
      <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
        <Avatar.Icon size={42} icon="https://via.placeholder.com/150" />
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
