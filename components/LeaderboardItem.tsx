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
        <View className="flex-row items-center justify-between p-4 border-b border-matiks-card bg-matiks-bg">
            <View className="flex-row items-center flex-1">
                <View className="w-12 items-center">
                    <Text className={`text-lg font-bold font-montserrat ${getRankColor(item.rank)}`}>#{item.rank}</Text>
                </View>
                <View className="flex-1 ml-4">
                    <Text className="text-base font-semibold text-matiks-text font-montserrat">{item.username}</Text>
                </View>
                <View className="items-end">
                    <Text className="text-base font-bold text-matiks-text font-montserrat">{item.rating}</Text>
                </View>
            </View>
        </View>
    )
}