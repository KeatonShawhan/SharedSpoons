// components/post/postHeader.tsx
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


interface postHeaderProps {
  username: string;
  place: string;
  user_id: string;
  onNavigateToProfile: () => void;
  pfp: string;
}

export function repostCredit({ username, onNavigateToProfile }: postHeaderProps): React.JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <ThemedView>
      <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
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
              Reposted from @{username}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}
