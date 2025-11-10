import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useGameStore } from '../store/gameStore';
import { lightColors, darkColors } from '../theme/colors';

type RootStackParamList = {
  Menu: undefined;
  GamePlay: undefined;
  HighScores: undefined;
  Settings: undefined;
};

export const MenuScreen: React.FC = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Menu'>) => {
  const themeMode = useGameStore((s) => s.theme);
  const colors = themeMode === 'dark' ? darkColors : lightColors;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Mobile Tap Game</Text>
      <Button title="Play" onPress={() => navigation.navigate('GamePlay')} />
      <Button title="High Scores" onPress={() => navigation.navigate('HighScores')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  title: { fontSize: 32, fontWeight: 'bold' }
});

export default MenuScreen;
