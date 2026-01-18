import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <View className="flex-1 items-center justify-center p-8">
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text className="mt-4 text-gray-600">{message}</Text>
    </View>
  );
};
