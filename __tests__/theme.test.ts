import { useGameStore } from '../src/store/gameStore';

describe('theme toggle', () => {
  test('toggles theme between light and dark', () => {
    const initial = useGameStore.getState().theme;
    useGameStore.getState().toggleTheme();
    const after = useGameStore.getState().theme;
    expect(after).not.toBe(initial);
    useGameStore.getState().toggleTheme();
    expect(useGameStore.getState().theme).toBe(initial);
  });
});
