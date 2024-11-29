// components/post/postHeader.tsx
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface postHeaderProps {
  username: string;
  onNavigateToProfile: () => void;
}

export const RepostCredit: React.FC<postHeaderProps> = ({ username, onNavigateToProfile }) => {
  const colorScheme = useColorScheme();

  return (
    <ThemedView>
      <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
        <View>
          <TouchableOpacity onPress={onNavigateToProfile} style={{display:'flex', flexDirection: 'row'}}>
            <FontAwesome name="retweet" size={18} color="#FF9900" style={{paddingTop: 0}} />
            <Text
              style={{
                paddingLeft: 5,
                paddingRight: 10,
                paddingTop: 1,
                fontSize: 14,
                fontWeight:'bold',
                color: Colors[colorScheme].text, 
              }}
            >
              @{username}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}
