import React from 'react';
import { View, Text } from 'react-native';
import { LeaderboardEntry } from 'types';

interface SearchResultItemProps {
  item: LeaderboardEntry;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ item }) => {
  return (
    <View className="flex-row items-center justify-between border-b border-matiks-card bg-matiks-bg p-4">
      <View className="flex-1 flex-row items-center">
        <View className="w-16 items-center">
          <Text className="font-montserrat text-sm font-semibold text-matiks-muted">Rank</Text>
          <Text className="font-montserrat text-lg font-bold text-matiks-text">#{item.rank}</Text>
        </View>
        <View className="ml-4 flex-1">
          <Text className="font-montserrat text-base font-semibold text-matiks-text">
            {item.username}
          </Text>
        </View>
        <View className="items-end">
          <Text className="font-montserrat text-sm font-semibold text-matiks-muted">Rating</Text>
          <Text className="font-montserrat text-lg font-bold text-matiks-text">{item.rating}</Text>
        </View>
      </View>
    </View>
  );
};
