import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Alert, Modal, StyleSheet, Pressable, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { usePostHog } from "posthog-react-native";
import { MainModal } from "./MainModal";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import axios from 'axios';
const baseUrl = 'https://heroku-nodejs-11.herokuapp.com';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export const MainView = (props) => {

  const [barModalVisible, setBarModalVisible] = useState(false);
  const [bars, setBars] = useState([])
  const [bar, setBar] = useState({})  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState();
  const notificationListener = useRef();
  const responseListener = useRef();
  const posthog = usePostHog()

  // Invoking get method to perform a GET request
  const fetchBars = async () => {
    const url = `${baseUrl}/bars`;
    const response = await axios.get(url);
    setBars(response.data)
  };

  useEffect(() => {
    fetchBars()

    posthog?.capture("MainView loaded", { status: "successful" })


    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token)
      posthog?.capture("expoPushToken", { 
        token: token,
        status: "successful"
      })
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  const pickBar = (bar) => {
    posthog?.capture("Bar selected", { status: "successful" })
    fetchBars()

    setBarModalVisible(true)
    setBar(bar)
  }

  const closeModal = () => {    
    setBarModalVisible(false)
  }


  return (
    <View  style={[styles.container]}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.760,
          longitude: -122.4220,
          latitudeDelta: 0.03,
          longitudeDelta: 0.01,
        }}
        userInterfaceStyle={'dark'}
      >
        { bars.map((bar)=> {
          return (
            <Marker 
            key = { bar.id }
            coordinate = {{
              latitude: parseFloat(bar.latitude),
              longitude: parseFloat(bar.longitude)
            }}>
              <Pressable onPress={() => pickBar(bar)}>
                <Text style={{ fontSize: bar.litLevel*5 + 5 }}>🔥</Text>
              </Pressable>
            </Marker>
          )
        })}
      </MapView>
    <MainModal 
      bar={bar} 
      showModal={barModalVisible}
      closeModal={closeModal}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}