import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './src/screens/MenuScreen';
import GamePlayScreen from './src/screens/GamePlayScreen';
import HighScoresScreen from './src/screens/HighScoresScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { StatusBar } from 'expo-status-bar';
import { useGameStore } from './src/store/gameStore';

const Stack = createNativeStackNavigator();

export default function App() {
  const themeMode = useGameStore(s => s.theme);
  return (
    <NavigationContainer theme={themeMode === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="GamePlay" component={GamePlayScreen} />
        <Stack.Screen name="HighScores" component={HighScoresScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
