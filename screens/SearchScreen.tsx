import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { leaderboardApi } from '../services/api';
import { SearchResultItem } from '../components/SearchResultItem';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { LeaderboardEntry } from 'types';

const DEBOUNCE_DELAY = 500; // milliseconds
const ITEMS_PER_PAGE = 50;

export const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  // Debounce search
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setResults([]);
      setHasSearched(false);
      setPage(1);
      setHasMore(false);
      setTotal(0);
      return;
    }

    const timeoutId = setTimeout(() => {
      performSearch(searchQuery.trim(), 1, true);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const performSearch = async (query: string, pageNum: number = 1, isNewSearch: boolean = false) => {
    if (query.length < 1) return;

    if (isNewSearch) {
      setLoading(true);
      setHasSearched(true);
      setPage(1);
      setResults([]);
      setLoadingMore(false);
    } else {
      // Loading more results
      setLoadingMore(true);
    }

    try {
      const response = await leaderboardApi.searchUsers(query, pageNum, ITEMS_PER_PAGE);
      
      if (isNewSearch || pageNum === 1) {
        setResults(response.users);
      } else {
        setResults((prev) => [...prev, ...response.users]);
      }
      
      setTotal(response.total);
      setHasMore(response.users.length === ITEMS_PER_PAGE && response.users.length > 0);
      setPage(pageNum);
    } catch (error) {
      console.error('Error searching users:', error);
      if (isNewSearch || pageNum === 1) {
        setResults([]);
      }
      // Handle error (show toast/alert)
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loading && !loadingMore && hasMore && searchQuery.trim().length > 0) {
      performSearch(searchQuery.trim(), page + 1, false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setResults([]);
    setHasSearched(false);
    setPage(1);
    setHasMore(false);
    setTotal(0);
    setLoading(false);
    setLoadingMore(false);
    Keyboard.dismiss();
  };

  const renderItem = ({ item }: { item: LeaderboardEntry }) => <SearchResultItem item={item} />;

  const renderFooter = () => {
    if (!hasMore) return null;
    // Show loading indicator when loading more results
    if (loadingMore) {
      return (
        <View className="py-4 items-center">
          <ActivityIndicator size="small" color="#A9F99E" />
          <Text className="mt-2 font-montserrat text-sm text-matiks-muted">
            Loading more users...
          </Text>
        </View>
      );
    }
    return null;
  };

  const renderEmpty = () => {
    if (loading && results.length === 0) {
      return <LoadingSpinner message="Searching..." />;
    }

    if (hasSearched && results.length === 0) {
      return (
        <View className="flex-1 items-center justify-center p-8">
          <Text className="font-montserrat text-lg text-matiks-text">No users found</Text>
          <Text className="mt-2 font-montserrat text-sm text-matiks-muted">
            Try a different search term
          </Text>
        </View>
      );
    }

    return (
      <View className="flex-1 items-center justify-center p-8">
        <Text className="font-montserrat text-lg text-matiks-text">Search for users</Text>
        <Text className="mt-2 font-montserrat text-sm text-matiks-muted">
          Enter a username to find their rank
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-matiks-bg">
      <View className="border-b border-matiks-card bg-matiks-bg px-4 py-4">
        <Text className="font-montserrat text-2xl font-bold text-matiks-text">Search Users</Text>
      </View>

      <View className="border-b border-matiks-card bg-matiks-bg px-5 py-4">
        <View className="flex-row items-center rounded-xl border border-matiks-muted/30 bg-matiks-card">
          <TextInput
            className="flex-1 px-4 py-4 font-montserrat text-lg text-matiks-text"
            placeholder="Search by username..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={() => performSearch(searchQuery.trim(), 1, true)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} className="px-4 py-4">
              <Text className="font-montserrat font-semibold text-matiks-text">Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {results.length > 0 && (
        <View className="bg-matiks-bg px-4 py-2">
          <Text className="font-montserrat text-sm text-matiks-muted">
            Showing {results.length} of {total.toLocaleString()} result{total !== 1 ? 's' : ''}
            {hasMore && ' (scroll for more)'}
          </Text>
        </View>
      )}

      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.username}-${index}`}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};
