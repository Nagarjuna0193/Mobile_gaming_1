import { useGameStore } from '../src/store/gameStore';

describe('gameStore logic', () => {
  beforeEach(() => {
    const { reset } = useGameStore.getState();
    reset();
  });

  test('startGame initializes state', () => {
    useGameStore.getState().startGame();
    const state = useGameStore.getState();
    expect(state.isRunning).toBe(true);
    expect(state.score).toBe(0);
    expect(state.timeLeft).toBe(state.duration);
  });

  test('tap increments score only when running', () => {
    const s1 = useGameStore.getState().score;
    useGameStore.getState().tap();
    expect(useGameStore.getState().score).toBe(s1); // not running yet
    useGameStore.getState().startGame();
    useGameStore.getState().tap();
    expect(useGameStore.getState().score).toBe(1);
  });

  test('tick decrements time and ends game at zero', () => {
    useGameStore.getState().startGame();
    for (let i = 0; i < useGameStore.getState().duration; i++) {
      useGameStore.getState().tick();
    }
    expect(useGameStore.getState().isRunning).toBe(false);
  });

  test('addHighScore stores top scores', () => {
    useGameStore.getState().startGame();
    for (let i = 0; i < 5; i++) useGameStore.getState().tap();
    useGameStore.getState().endGame();
    expect(useGameStore.getState().highScores[0]).toBe(5);
  });
});
