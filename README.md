# Mobile Game App

[![Deploy Web to GitHub Pages](https://github.com/Nagarjuna0193/Mobile_gaming_1/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/Nagarjuna0193/Mobile_gaming_1/actions/workflows/gh-pages.yml)
[![Pages](https://img.shields.io/github/pages/builds/Nagarjuna0193/Mobile_gaming_1?label=github%20pages)](https://Nagarjuna0193.github.io/Mobile_gaming_1)

A simple tap-based scoring mobile game built with Expo React Native and TypeScript.

## Features
- Tap to gain score within countdown timer
- Animated timer bar (Reanimated)
- Tap sound (expo-av) and haptics (expo-haptics) with sound toggle
- High score persistence (AsyncStorage) via Zustand persist
- Settings: sound toggle & theme (light/dark) with navigation theme switching
- Navigation: Menu, Gameplay, High Scores, Settings
- Global state using Zustand (persisted slices: soundEnabled, theme, highScores, duration)
- Jest tests for core logic (store actions) with AsyncStorage mock

## Scripts
- `npm start` - start Expo bundler
- `npm test` - run Jest test suite
- `npm run lint` - run ESLint
- `npm run format` - format code with Prettier

## Getting Started
```powershell
npm install
npm start
# If PowerShell blocks npm, run:
cmd /c npm start
```

## Live (Web)
- GitHub Pages: https://Nagarjuna0193.github.io/Mobile_gaming_1
- CI status: see the badge above. First deployment may take a minute after pushing to `main`.
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
