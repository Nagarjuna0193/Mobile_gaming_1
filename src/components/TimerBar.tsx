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
    transform: [{ scaleX: progress.value }],
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
    flex: 1,
    backgroundColor: '#4e8ef7',
    transform: [{ scaleX: 1 }],
    transformOrigin: 'left center',
  },
});

export default TimerBar;
