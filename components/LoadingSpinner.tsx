import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <View className="flex-1 items-center justify-center p-8 bg-matiks-bg">
      <ActivityIndicator size="large" color="#A9F99E" />
      <Text className="mt-4 text-matiks-muted font-montserrat">{message}</Text>
    </View>
  );
};
