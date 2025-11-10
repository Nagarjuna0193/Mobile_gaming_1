import { Audio } from 'expo-av';
import type { AVPlaybackStatus } from 'expo-av';

let clickSound: Audio.Sound | null = null;

export async function loadSounds() {
  if (clickSound) return;
  clickSound = new Audio.Sound();
  // Simple placeholder beep using a remote tone or local asset. Replace with your asset path.
  // Here we use an embedded base64-generated silent sound as placeholder fallback.
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    await clickSound.loadAsync(require('../../assets/click.wav'));
  } catch (e) {
    // ignore if asset missing
  }
}

export async function playClick(enabled: boolean) {
  try {
    if (!enabled) return;
    if (!clickSound) await loadSounds();
    if (!clickSound) return;
    const status: AVPlaybackStatus = await clickSound.getStatusAsync();
    if ('isLoaded' in status && status.isLoaded) {
      await clickSound.replayAsync();
    }
  } catch {
    // no-op in test/web
  }
}
