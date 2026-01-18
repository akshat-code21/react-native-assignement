import React from 'react';
import { View, Text } from 'react-native';
import { LeaderboardEntry } from 'types';

interface SearchResultItemProps {
  item: LeaderboardEntry;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ item }) => {
  return (
    <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-200">
      <View className="flex-row items-center flex-1">
        <View className="w-16 items-center">
          <Text className="text-sm font-semibold text-gray-600">Rank</Text>
          <Text className="text-lg font-bold text-gray-900">#{item.rank}</Text>
        </View>
        <View className="flex-1 ml-4">
          <Text className="text-base font-semibold text-gray-900">{item.username}</Text>
        </View>
        <View className="items-end">
          <Text className="text-sm font-semibold text-gray-600">Rating</Text>
          <Text className="text-lg font-bold text-blue-600">{item.rating}</Text>
        </View>
      </View>
    </View>
  );
};
