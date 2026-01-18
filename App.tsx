import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { LeaderboardScreen } from 'screens/LeaderboardScreen';
import { SearchScreen } from 'screens/SearchScreen';
import './global.css';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
          },
        }}
      >
        <Tab.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 20 }}>🏆</Text>
            ),
            tabBarLabel: 'Leaderboard',
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 20 }}>🔍</Text>
            ),
            tabBarLabel: 'Search',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
