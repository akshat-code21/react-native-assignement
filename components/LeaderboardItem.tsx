import React from 'react';
import { Text, View } from 'react-native';
import { LeaderboardEntry } from 'types';

interface LeaderboardItemProps {
  item: LeaderboardEntry;
  index: number;
}

export const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ item, index }) => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-orange-400';
    return 'text-matiks-muted';
  };
  return (
    <View className="flex-row items-center justify-between border-b border-matiks-card bg-matiks-bg p-4">
      <View className="flex-1 flex-row items-center">
        <View className="w-12 items-center">
          <Text className={`font-montserrat text-lg font-bold ${getRankColor(item.rank)}`}>
            #{item.rank}
          </Text>
        </View>
        <View className="ml-4 flex-1">
          <Text className="font-montserrat text-base font-semibold text-matiks-text">
            {item.username}
          </Text>
        </View>
        <View className="items-end">
          <Text className="font-montserrat text-base font-bold text-matiks-text">
            {item.rating}
          </Text>
        </View>
      </View>
    </View>
  );
};
