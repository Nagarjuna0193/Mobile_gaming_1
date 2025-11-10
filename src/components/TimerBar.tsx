import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';

interface Props {
  duration: number; // total seconds
  timeLeft: number; // seconds remaining
}

const TimerBar: React.FC<Props> = ({ duration, timeLeft }) => {
  const progress = useSharedValue(1); // 1 -> full, 0 -> empty

  useEffect(() => {
    const pct = duration > 0 ? timeLeft / duration : 0;
    progress.value = withTiming(pct, { duration: 300, easing: Easing.out(Easing.cubic) });
  }, [timeLeft, duration, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${Math.max(0, Math.min(1, progress.value)) * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fill, animatedStyle]} />
    </View>
  );
};

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
