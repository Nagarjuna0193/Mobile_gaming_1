import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useGameStore } from '../store/gameStore';
import { lightColors, darkColors } from '../theme/colors';

const SettingsScreen: React.FC = () => {
  const { soundEnabled, toggleSound, theme, toggleTheme } = useGameStore();
  const hapticsEnabled = useGameStore((s) => s.hapticsEnabled);
  const toggleHaptics = useGameStore((s) => s.toggleHaptics);
  const colors = theme === 'dark' ? darkColors : lightColors;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }] }>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      <View style={styles.row}>
        <Text style={{ color: colors.text }}>Sound</Text>
        <Switch value={soundEnabled} onValueChange={toggleSound} />
      </View>
      <View style={styles.row}>
        <Text style={{ color: colors.text }}>Haptics</Text>
        <Switch value={hapticsEnabled} onValueChange={toggleHaptics} />
      </View>
      <View style={styles.row}>
        <Text style={{ color: colors.text }}>Dark Mode</Text>
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
