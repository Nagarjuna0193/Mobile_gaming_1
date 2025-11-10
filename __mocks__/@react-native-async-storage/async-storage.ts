// Jest manual mock for @react-native-async-storage/async-storage
// Provides an in-memory key-value store for tests.

interface Store { [key: string]: string | null }
const memory: Store = {};

const AsyncStorage = {
  setItem: async (key: string, value: string) => {
    memory[key] = value;
  },
  getItem: async (key: string) => {
    return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null;
  },
  removeItem: async (key: string) => {
    delete memory[key];
  },
  clear: async () => {
    Object.keys(memory).forEach(k => delete memory[k]);
  },
  getAllKeys: async () => Object.keys(memory),
  multiGet: async (keys: string[]) => keys.map(k => [k, memory[k] ?? null] as [string, string | null]),
  multiSet: async (pairs: [string, string][]) => {
    pairs.forEach(([k, v]) => { memory[k] = v; });
  },
  multiRemove: async (keys: string[]) => { keys.forEach(k => delete memory[k]); },
};

export default AsyncStorage;
export { AsyncStorage };
