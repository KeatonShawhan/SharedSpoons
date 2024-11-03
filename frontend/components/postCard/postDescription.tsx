// components/post/postDescription.tsx
import { View, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const ORANGE_COLOR = '#FF9F45';

interface postDescriptionProps {
  categories: string[];
  notes: string;
  dish: string;
}

export function postDescription({ categories, notes, dish }: postDescriptionProps): React.JSX.Element {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];
  const catString = categories.join(', ');

  return (
    <ThemedView>
      <View style={{
        position: 'relative', 
        width: '100%', 
        height: 350,
        paddingHorizontal: 0,
        paddingVertical: 0,
      }}>
        <View style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderWidth: 2,
          borderColor: ORANGE_COLOR,  
          borderRadius: 20,
          padding: 20,
          backgroundColor: themeColors.background,
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 24, color: themeColors.text, flexWrap: 'wrap' }}>
            {dish}
          </Text>
          <Text style={{ fontSize: 16, color: themeColors.text, flexWrap: 'wrap', paddingTop: 10 }}>
            Categories: {catString}
          </Text>
          <Text style={{ fontSize: 16, color: themeColors.text, flexWrap: 'wrap', paddingTop: 10 }}>
            Additional Notes: {notes}
          </Text>
        </View>
      </View>
    </ThemedView>
  );
}
