/**
 * @format
 */

import 'react-native-reanimated'; // 必须是第一行
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
