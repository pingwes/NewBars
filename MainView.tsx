import React, { useState, useEffect } from "react";
import { Text, View, Button, Alert, Modal, StyleSheet, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useFonts } from 'expo-font';
import Slider from '@react-native-community/slider';
import { client } from './api/apollo'
import { gql, useQuery } from '@apollo/client';
import Ionicons from '@expo/vector-icons/Ionicons';
import { usePostHog } from "posthog-react-native";
import { MainModal } from "./MainModal";
import { Bar } from './interfaces/Bar'


const GET_BARS = gql`
  query getBars {
    bars {
      id
      name
      address
      longitude
      latitude
      litLevel
      males
      females
    }
  }
  `


export const MainView = () => {

  const [barModalVisible, setBarModalVisible] = useState(true);
  const [bars, setBars] = useState<Bar[]>([])
  const [bar, setBar] = useState<Bar>({})
  const { loading, error, data } = useQuery(GET_BARS);
  const posthog = usePostHog()

  useEffect(() => {
    posthog?.capture("MainView loaded", { status: "successful" })
  }, []);

  useEffect(() => {
    if(data) {
      setBars(data.bars)
    }
  })

  const pickBar = (bar: Bar) => {
    posthog?.capture("Bar selected", { status: "successful" })
    console.log("bar picked")
    setBarModalVisible(true)
    setBar(bar)
  }

  const closeModal = () =>{    
    console.log("yoo")
    setBarModalVisible(false)
  }

  if (loading) return <Text>'Loading...'</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <View  style={[styles.container]}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.763399,
          longitude: -122.420416,
          latitudeDelta: 0.09,
          longitudeDelta: 0.05,
        }}
        userInterfaceStyle={'dark'}
      >
        { bars.map((bar: any)=> {
          return (
            <Marker 
            key = { bar.id }
            coordinate = {{
              latitude: parseFloat(bar.latitude),
              longitude: parseFloat(bar.longitude)
            }}>
              <Pressable onPress={() => pickBar(bar)}>
                <Text style={{ fontSize: 20 }}>🔥</Text>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 500
  },
  modalView: {
    margin: 5,    
    backgroundColor: "white",
    fontSize:20,
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    marginTop: 10,
  }
});