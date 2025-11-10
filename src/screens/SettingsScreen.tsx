import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useGameStore } from '../store/gameStore';

const SettingsScreen: React.FC = () => {
  const { soundEnabled, toggleSound, theme, toggleTheme } = useGameStore();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text>Sound</Text>
        <Switch value={soundEnabled} onValueChange={toggleSound} />
      </View>
      <View style={styles.row}>
        <Text>Dark Mode</Text>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }
});

export default SettingsScreen;
