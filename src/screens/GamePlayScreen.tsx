import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useGameStore } from '../store/gameStore';

const GamePlayScreen: React.FC = () => {
  const { score, timeLeft, isRunning, startGame, tap, tick, reset } = useGameStore();

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;
    if (isRunning) {
      interval = setInterval(() => tick(), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, tick]);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time: {timeLeft}</Text>
      <Text style={styles.score}>Score: {score}</Text>
      {!isRunning && (
        <Button title="Start Game" onPress={startGame} />
      )}
      {isRunning && (
        <TouchableOpacity style={styles.tapButton} onPress={tap}>
          <Text style={styles.tapText}>TAP!</Text>
        </TouchableOpacity>
      )}
      <Button title="Reset" onPress={reset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 },
  timer: { fontSize: 24 },
  score: { fontSize: 24, fontWeight: 'bold' },
  tapButton: { backgroundColor: '#4e8ef7', padding: 40, borderRadius: 100 },
  tapText: { color: '#fff', fontSize: 32, fontWeight: 'bold' }
});

export default GamePlayScreen;
