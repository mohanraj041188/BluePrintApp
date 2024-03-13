/**
 * @format
 */
<script src="http://localhost:8097"></script>
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SplashScreen from 'react-native-splash-screen';

// Register the app component
AppRegistry.registerComponent(appName, () => App);

// Hide the splash screen once the app is loaded
// AppRegistry.runApplication(appName, {
//   initialProps: {},
//   rootTag: document.getElementById('app-root') || document.getElementById('root'),
// });

// SplashScreen.hide(); // Add this line to hide the splash screen