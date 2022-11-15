//index.js file
//you just need to add highlighted code down below
import { AppRegistry } from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent("NewBars", () => App);