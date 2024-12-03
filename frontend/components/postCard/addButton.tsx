import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import {TouchableOpacity} from 'react-native';
import { ThemedView } from '@/components/ThemedView';

type IoniconNames = 'add-circle-sharp' | 'checkmark-circle-outline';

export function addButton() {
  const [currentIcon, setCurrentIcon] = useState<IoniconNames>('add-circle-sharp');

  const added = () => {
    setCurrentIcon('checkmark-circle-outline')

  }

  return (
    <ThemedView >
      <TouchableOpacity
        onPress={added}
        style={{
          position: 'absolute',
          bottom: 10,  
          right: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.3)', 
          padding: 10,
          borderRadius: 25,
        }}>
        <Ionicons name={currentIcon} size={24} color="white" />        
      </TouchableOpacity>
    </ThemedView>
  );
}
