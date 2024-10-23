import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, Text } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import {Card } from 'react-native-paper';


export function postCard({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <Card>
        <Text>
            hello, {title}
        </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
