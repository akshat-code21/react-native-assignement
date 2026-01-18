import { LeaderboardItem } from "components/LeaderboardItem";
import { LoadingSpinner } from "components/LoadingSpinner";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { leaderboardApi } from "services/api";
import { LeaderboardEntry } from "types";

const ITEMS_PER_PAGE = 50;
export const LeaderboardScreen = () => {
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const loadLeaderboard = async (pageNum: number = 1, isRefresh: boolean = false) => {
        try {
            if (isRefresh) {
                setIsRefreshing(true);
            } else if (pageNum === 1) {
                setLoading(true);
            }
            const response = await leaderboardApi.getLeaderboard(pageNum, ITEMS_PER_PAGE);

            if (isRefresh || pageNum === 1) {
                setLeaderboard(response.entries);
            } else {
                setLeaderboard((prev) => [...prev, ...response.entries]);
            }
            setTotal(response.total);
            setHasMore(response.entries.length === ITEMS_PER_PAGE);
            setPage(pageNum);
        } catch (error) {
            console.error('Error loading leaderboard:', error);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    }

    useEffect(() => {
        loadLeaderboard(1);
    }, []);

    const loadMore = () => {
        if (!loading && hasMore) {
            loadLeaderboard(page + 1);
        }
    };

    const handleRefresh = () => {
        loadLeaderboard(1, true);
    };

    const renderItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => {
        return <LeaderboardItem item={item} index={index} />
    };

    const renderFooter = () => {
        if (!hasMore) return null;
        return (
            <View className="py-4">
                <ActivityIndicator size="small" color="#3B82F6" />
            </View>
        );
    };

    if (loading && leaderboard.length === 0) {
        return <LoadingSpinner message="Loading leaderboard..." />;
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="bg-blue-600 px-4 py-4">
                <Text className="text-2xl font-bold text-white">Leaderboard</Text>
                <Text className="text-blue-100 mt-1">Total Users: {total.toLocaleString()}</Text>
            </View>
            <FlatList
                data={leaderboard}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.username}-${index}`}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
                }
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
}