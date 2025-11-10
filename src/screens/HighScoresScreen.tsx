import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useGameStore } from '../store/gameStore';
import { lightColors, darkColors } from '../theme/colors';

const HighScoresScreen: React.FC = () => {
  const highScores = useGameStore((s) => s.highScores);
  const themeMode = useGameStore((s) => s.theme);
  const colors = themeMode === 'dark' ? darkColors : lightColors;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>High Scores</Text>
      {highScores.length === 0 && <Text style={{ color: colors.text }}>No scores yet.</Text>}
      <FlatList
        data={highScores}
        keyExtractor={(_item: number, idx: number) => idx.toString()}
        renderItem={({ item, index }: { item: number; index: number }) => (
          <Text style={[styles.scoreItem, { color: colors.text }]}>{index + 1}. {item}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  scoreItem: { fontSize: 20, paddingVertical: 4 }
});

export default HighScoresScreen;
