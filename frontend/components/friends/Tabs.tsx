import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const ORANGE_COLOR = '#FF9F45';

interface TabsProps {
  activeTab: 'followers' | 'following';
  onTabChange: (tab: 'followers' | 'following') => void;
  colorScheme: string;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange, colorScheme }) => (
  <View style={styles.tabsContainer}>
    <TouchableOpacity 
      style={styles.tabButton}
      onPress={() => onTabChange('followers')}
    >
      <Text style={[
        styles.tabText,
        { color: Colors[colorScheme].text },
        activeTab === 'followers' && styles.activeTabText
      ]}>
        Followers
      </Text>
    </TouchableOpacity>
    <TouchableOpacity 
      style={styles.tabButton}
      onPress={() => onTabChange('following')}
    >
      <Text style={[
        styles.tabText,
        { color: Colors[colorScheme].text },
        activeTab === 'following' && styles.activeTabText
      ]}>
        Following
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  tabsContainer: {
    position: 'absolute',
    right: 30,
    top: 75,
    alignItems: 'flex-end',
  },
  tabButton: {
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  tabText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'right',
  },
  activeTabText: {
    color: ORANGE_COLOR,
    fontSize: 24,
    fontWeight: '600',
  },
});