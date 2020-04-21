/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Todos from './Components/Screens/Todos'

AppRegistry.registerComponent(appName, () => Todos);
