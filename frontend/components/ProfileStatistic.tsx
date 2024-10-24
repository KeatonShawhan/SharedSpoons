// StatisticComponent.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../frontend/constants/Colors';

interface StatProps {
  label: string;
  value: number;
}

const StatisticComponent: React.FC<StatProps> = ({ label, value }) => {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statAmount}>{value.toLocaleString()}</Text>
      <Text style={styles.statTitle}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statAmount: {
    fontSize: 18,
    color: Colors.light.text,
    fontWeight: '600',
  },
  statTitle: {
    fontSize: 16,
    color: Colors.light.icon,
    fontWeight: '500',
  },
});

export default StatisticComponent;
