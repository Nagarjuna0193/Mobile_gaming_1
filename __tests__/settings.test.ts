import { useGameStore } from '../src/store/gameStore';

describe('settings toggles', () => {
  beforeEach(() => {
    const { reset } = useGameStore.getState();
    reset();
  });

  test('toggle haptics switches setting', () => {
    const initial = useGameStore.getState().hapticsEnabled;
    useGameStore.getState().toggleHaptics();
    expect(useGameStore.getState().hapticsEnabled).toBe(!initial);
  });
});
