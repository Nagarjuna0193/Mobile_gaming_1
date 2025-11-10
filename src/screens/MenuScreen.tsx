import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const MenuScreen: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile Tap Game</Text>
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
