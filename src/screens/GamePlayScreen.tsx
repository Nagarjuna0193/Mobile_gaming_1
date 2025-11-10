import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useGameStore } from '../store/gameStore';
import { lightColors, darkColors } from '../theme/colors';
import TimerBar from '../components/TimerBar';
import { playClick, loadSounds } from '../utils/sound';
import * as Haptics from 'expo-haptics';

const GamePlayScreen: React.FC = () => {
  const { score, timeLeft, isRunning, startGame, tap, tick, reset } = useGameStore();
  const comboMultiplier = useGameStore((s) => s.comboMultiplier);
  const hapticsEnabled = useGameStore((s) => s.hapticsEnabled);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      interval = setInterval(() => tick(), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, tick]);

  // preload sound
  useEffect(() => {
    loadSounds();
  }, []);

  const themeMode = useGameStore((s) => s.theme);
  const colors = themeMode === 'dark' ? darkColors : lightColors;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TimerBar duration={useGameStore((s) => s.duration)} timeLeft={timeLeft} />
      <Text style={[styles.timer, { color: colors.text }]}>Time: {timeLeft}</Text>
      <Text style={[styles.score, { color: colors.text }]}>Score: {score}</Text>
      {isRunning && comboMultiplier > 1 && (
        <Text style={[styles.multiplier, { color: colors.primary }]}>
          Combo x{comboMultiplier}
        </Text>
      )}
      {!isRunning && (
        <Button title="Start Game" onPress={startGame} />
      )}
      {isRunning && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Tap to score"
          style={[styles.tapButton, { backgroundColor: colors.primary }]}
          onPress={async () => {
            tap();
            await playClick(useGameStore.getState().soundEnabled);
            if (hapticsEnabled) {
              void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
          }}
        >
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
  multiplier: { fontSize: 20, fontWeight: '600' },
  tapButton: { backgroundColor: '#4e8ef7', padding: 40, borderRadius: 100 },
  tapText: { color: '#fff', fontSize: 32, fontWeight: 'bold' }
});

export default GamePlayScreen;
