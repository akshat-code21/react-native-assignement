import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <View className="flex-1 items-center justify-center bg-matiks-bg p-8">
      <ActivityIndicator size="large" color="#A9F99E" />
      <Text className="mt-4 font-montserrat text-matiks-muted">{message}</Text>
    </View>
  );
};
