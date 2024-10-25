import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Achievement } from '@/types/profile';

interface AchievementListProps {
  achievements: Achievement[];
  colorScheme: string;
}

const AchievementList: React.FC<AchievementListProps> = ({ achievements, colorScheme }) => {
  return (
    <View style={styles.achievementsContainer}>
      {achievements.map((achievement, index) => (
        <View key={index} style={styles.achievementItem}>
          <View style={styles.achievementHeader}>
            <Text style={[styles.achievementRank, { color: Colors[colorScheme].text }]}>
              {achievement.rank}
            </Text>
            <Text style={[styles.achievementProgress, { color: Colors[colorScheme].tabIconDefault }]}>
              {achievement.progress}/{achievement.required}
            </Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { 
                  width: `${(achievement.progress / achievement.required) * 100}%`,
                  backgroundColor: '#FF9F45'
                }
              ]} 
            />
          </View>
          <Text style={[styles.achievementDescription, { color: Colors[colorScheme].tabIconDefault }]}>
            {achievement.description}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  achievementsContainer: {
    padding: 16,
  },
  achievementItem: {
    marginBottom: 20,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementRank: {
    fontSize: 16,
    fontWeight: '600',
  },
  achievementProgress: {
    fontSize: 14,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  achievementDescription: {
    fontSize: 14,
  },
});

export default AchievementList;