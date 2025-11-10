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
    const expected = useGameStore.getState().score;
    useGameStore.getState().endGame();
    expect(useGameStore.getState().highScores[0]).toBe(expected);
  });

  test('combo multiplier increases with rapid taps and resets on delay', () => {
    useGameStore.getState().startGame();
    const realNow = Date.now;
    let t = 1000;
    // mock Date.now
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Date as any).now = jest.fn(() => t);

    // first tap -> +1 (multiplier 1)
    useGameStore.getState().tap();
    expect(useGameStore.getState().score).toBe(1);

    // within 400ms -> multiplier 2
    t += 300;
    useGameStore.getState().tap();
    expect(useGameStore.getState().score).toBe(3);

    // within 400ms again -> multiplier 3
    t += 300;
    useGameStore.getState().tap();
    expect(useGameStore.getState().score).toBe(6);

    // after window -> reset multiplier to 1
    t += 1000;
    useGameStore.getState().tap();
    expect(useGameStore.getState().score).toBe(7);

    // restore
    Date.now = realNow;
  });
});
