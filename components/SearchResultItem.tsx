import React from 'react';
import { View, Text } from 'react-native';
import { LeaderboardEntry } from 'types';

interface SearchResultItemProps {
  item: LeaderboardEntry;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ item }) => {
  return (
    <View className="flex-row items-center justify-between p-4 bg-matiks-bg border-b border-matiks-card">
      <View className="flex-row items-center flex-1">
        <View className="w-16 items-center">
          <Text className="text-sm font-semibold text-matiks-muted font-montserrat">Rank</Text>
          <Text className="text-lg font-bold text-matiks-text font-montserrat">#{item.rank}</Text>
        </View>
        <View className="flex-1 ml-4">
          <Text className="text-base font-semibold text-matiks-text font-montserrat">{item.username}</Text>
        </View>
        <View className="items-end">
          <Text className="text-sm font-semibold text-matiks-muted font-montserrat">Rating</Text>
          <Text className="text-lg font-bold text-matiks-text font-montserrat">{item.rating}</Text>
        </View>
      </View>
    </View>
  );
};
