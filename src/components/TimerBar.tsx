import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withRepeat,
} from 'react-native-reanimated';

interface Props {
  duration: number; // total seconds
  timeLeft: number; // seconds remaining
}

function TimerBar({ duration, timeLeft }: Props) {
  const progress = useSharedValue(1); // 1 -> full, 0 -> empty
  const pulse = useSharedValue(1);

  useEffect(() => {
    const pct = duration > 0 ? timeLeft / duration : 0;
    progress.value = withTiming(pct, { duration: 300, easing: Easing.out(Easing.cubic) });
  }, [timeLeft, duration, progress]);

  const lowThreshold = Math.min(5, Math.ceil(duration * 0.2));
  const isLow = timeLeft <= lowThreshold;

  useEffect(() => {
    if (isLow) {
      pulse.value = withRepeat(withTiming(0.6, { duration: 500 }), -1, true);
    } else {
      pulse.value = withTiming(1, { duration: 200 });
    }
  }, [isLow, pulse]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${Math.max(0, Math.min(1, progress.value)) * 100}%`,
    opacity: pulse.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fill,
          { backgroundColor: isLow ? '#e53935' : '#4e8ef7' },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 12,
    width: '80%',
    backgroundColor: '#3333',
    borderRadius: 6,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  fill: {
    height: '100%',
    width: '100%',
    backgroundColor: '#4e8ef7',
  },
});

export default TimerBar;
