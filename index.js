import 'react-native-gesture-handler';
import 'react-native-reanimated'; // must be imported before other reanimated usage

import { registerRootComponent } from 'expo';
import App from './App';
registerRootComponent(App);