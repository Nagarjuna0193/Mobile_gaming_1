# Mobile Game App

A simple tap-based scoring mobile game built with Expo React Native and TypeScript.

## Features
- Tap to gain score within countdown timer
- High score persistence (AsyncStorage) (implemented via Zustand persist)
- Settings: sound toggle & theme (light/dark) with navigation theme switching
- Navigation: Menu, Gameplay, High Scores, Settings
- Global state using Zustand (persisted slices: soundEnabled, theme, highScores, duration)
- Jest tests for core logic (store actions)

## Scripts
- `npm start` - start Expo bundler
- `npm test` - run Jest test suite
- `npm run lint` - run ESLint
- `npm run format` - format code with Prettier

## Getting Started
```powershell
npm install
npm start
```
Choose platform (Android/iOS/Web) in Expo CLI.

## Project Structure
```
src/
  screens/        # UI screens
  store/          # Zustand store and logic
```

## Assumptions
Technical documentation not provided; assumptions made for a minimal arcade-style tap game.

## Next Steps
- Add animations & sound effects (placeholder right now)
- Expand tests for persistence + theme toggling
- Leaderboard sync (future backend)

## License
MIT (adjust as needed)
