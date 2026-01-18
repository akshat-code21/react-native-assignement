import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { leaderboardApi } from '../services/api';
import { SearchResultItem } from '../components/SearchResultItem';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { LeaderboardEntry } from 'types';

const DEBOUNCE_DELAY = 500; // milliseconds

export const SearchScreen: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Debounce search
    useEffect(() => {
        if (searchQuery.trim().length === 0) {
            setResults([]);
            setHasSearched(false);
            return;
        }

        const timeoutId = setTimeout(() => {
            performSearch(searchQuery.trim());
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const performSearch = async (query: string) => {
        if (query.length < 1) return;

        setLoading(true);
        setHasSearched(true);

        try {
            const response = await leaderboardApi.searchUsers(query, 50);
            setResults(response.users);
        } catch (error) {
            console.error('Error searching users:', error);
            setResults([]);
            // Handle error (show toast/alert)
        } finally {
            setLoading(false);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setResults([]);
        setHasSearched(false);
        Keyboard.dismiss();
    };

    const renderItem = ({ item }: { item: LeaderboardEntry }) => (
        <SearchResultItem item={item} />
    );

    const renderEmpty = () => {
        if (loading) {
            return <LoadingSpinner message="Searching..." />;
        }

        if (hasSearched && results.length === 0) {
            return (
                <View className="flex-1 items-center justify-center p-8">
                    <Text className="text-lg text-matiks-text font-montserrat">No users found</Text>
                    <Text className="text-sm text-matiks-muted mt-2 font-montserrat">Try a different search term</Text>
                </View>
            );
        }

        return (
            <View className="flex-1 items-center justify-center p-8">
                <Text className="text-lg text-matiks-text font-montserrat">Search for users</Text>
                <Text className="text-sm text-matiks-muted mt-2 font-montserrat">Enter a username to find their rank</Text>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-matiks-bg">
            <View className="bg-matiks-bg px-4 py-4 border-b border-matiks-card">
                <Text className="text-2xl font-bold text-matiks-text font-montserrat">Search Users</Text>
            </View>

            <View className="px-4 py-3 bg-matiks-bg border-b border-matiks-card">
                <View className="flex-row items-center bg-matiks-card rounded-lg border border-matiks-muted/20">
                    <TextInput
                        className="flex-1 px-4 py-3 text-base text-matiks-text font-montserrat"
                        placeholder="Enter username..."
                        placeholderTextColor="#6B7280"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="search"
                        onSubmitEditing={() => performSearch(searchQuery)}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            onPress={handleClearSearch}
                            className="px-4 py-3"
                        >
                            <Text className="text-matiks-text font-semibold font-montserrat">Clear</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {results.length > 0 && (
                <View className="px-4 py-2 bg-matiks-bg">
                    <Text className="text-sm text-matiks-muted font-montserrat">
                        Found {results.length} result{results.length !== 1 ? 's' : ''}
                    </Text>
                </View>
            )}

            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.username}-${index}`}
                ListEmptyComponent={renderEmpty}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            />
        </SafeAreaView>
    );
};
