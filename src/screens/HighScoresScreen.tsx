import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useGameStore } from '../store/gameStore';

const HighScoresScreen: React.FC = () => {
  const highScores = useGameStore((s) => s.highScores);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>High Scores</Text>
      {highScores.length === 0 && <Text>No scores yet.</Text>}
      <FlatList
        data={highScores}
        keyExtractor={(_item: number, idx: number) => idx.toString()}
        renderItem={({ item, index }: { item: number; index: number }) => (
          <Text style={styles.scoreItem}>{index + 1}. {item}</Text>
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
