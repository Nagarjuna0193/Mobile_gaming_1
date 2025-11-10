import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark';

interface GameState {
  // Ephemeral gameplay state
  score: number;
  timeLeft: number; // seconds
  duration: number; // total game duration
  isRunning: boolean;

  // Settings and persisted state
  soundEnabled: boolean;
  theme: ThemeMode;
  highScores: number[];

  // Actions
  startGame: () => void;
  tap: () => void;
  tick: () => void;
  endGame: () => void;
  reset: () => void;
  addHighScore: () => void;
  toggleSound: () => void;
  toggleTheme: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (
      set: (partial: Partial<GameState> | ((state: GameState) => Partial<GameState>)) => void,
      get: () => GameState
    ) => ({
      // defaults
      score: 0,
      duration: 30,
      timeLeft: 30,
      isRunning: false,
      soundEnabled: true,
      theme: 'light',
      highScores: [],

      startGame: () => set({ isRunning: true, score: 0, timeLeft: get().duration }),
      tap: () => {
        if (!get().isRunning) return;
        set({ score: get().score + 1 });
      },
      tick: () => {
        if (!get().isRunning) return;
        const tl = get().timeLeft - 1;
        if (tl <= 0) {
          get().endGame();
        } else {
          set({ timeLeft: tl });
        }
      },
      endGame: () => {
        set({ isRunning: false });
        get().addHighScore();
      },
      reset: () => set({ score: 0, timeLeft: get().duration, isRunning: false }),
      addHighScore: () => {
        const s = get().score;
        if (s <= 0) return;
        const updated = [...get().highScores, s].sort((a, b) => b - a).slice(0, 10);
        set({ highScores: updated });
      },
      toggleSound: () => set({ soundEnabled: !get().soundEnabled }),
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
    }),
    {
      name: 'mobile-game-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // persist only non-ephemeral slices
      partialize: (state: GameState) => ({
        soundEnabled: state.soundEnabled,
        theme: state.theme,
        highScores: state.highScores,
        duration: state.duration,
      }),
    }
  )
);
