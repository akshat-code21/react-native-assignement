import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { LeaderboardScreen } from 'screens/LeaderboardScreen';
import { SearchScreen } from 'screens/SearchScreen';
import './global.css';
import { useFonts } from '@expo-google-fonts/montserrat/useFonts';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat/500Medium';

const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
  });
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#A9F99E',
          tabBarInactiveTintColor: '#6B7280',
          tabBarStyle: {
            backgroundColor: '#1E1E1E',
            borderTopWidth: 1,
            borderTopColor: '#2D2D2D',
          },
        }}
      >
        <Tab.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 20, fontFamily: "Montserrat_500Medium" }}>🏆</Text>
            ),
            tabBarLabel: 'Leaderboard',
            tabBarLabelStyle: { fontFamily: 'Montserrat_500Medium' }
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 20, fontFamily: "Montserrat_500Medium" }}>🔍</Text>
            ),
            tabBarLabel: 'Search',
            tabBarLabelStyle: { fontFamily: 'Montserrat_500Medium' }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
