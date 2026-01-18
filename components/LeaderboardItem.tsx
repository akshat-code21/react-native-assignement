import React from 'react';
import { Text, View } from 'react-native';
import { LeaderboardEntry } from 'types';

interface LeaderboardItemProps {
    item: LeaderboardEntry;
    index: number;
}


export const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ item, index }) => {
    const getRankColor = (rank: number) => {
        if (rank === 1) return 'bg-yellow-100';
        if (rank === 2) return 'bg-gray-100';
        if (rank === 3) return 'bg-orange-100';
        return 'bg-white';
    };
    return (
        <View className={`flex-row items-center justify-between p-4 border-b border-gray-200 ${getRankColor(item.rank)}`}>
            <View className="flex-row items-center flex-1">
                <View className="w-12 items-center">
                    <Text className="text-lg font-bold text-gray-800">#{item.rank}</Text>
                </View>
                <View className="flex-1 ml-4">
                    <Text className="text-base font-semibold text-gray-900">{item.username}</Text>
                </View>
                <View className="items-end">
                    <Text className="text-base font-bold text-blue-600">{item.rating}</Text>
                </View>
            </View>
        </View>
    )
}