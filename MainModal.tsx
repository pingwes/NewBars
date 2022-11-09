import { useState } from "react";
import { Text, View, Button, Alert, Modal, StyleSheet, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BarView } from "./BarView";
import { Bar } from './interfaces/Bar'

interface MainModalProps {
  bar?: Bar
  showModal?: boolean
  closeModal: Function
}

export const MainModal = (props: MainModalProps) => {
  
  const [ startReportVibe, setStartReportVibe] = useState(false)
 

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={props.showModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          props.closeModal();
        }}>
      { props.bar && (
        <BarView 
          closeModal={props.closeModal} 
          bar={props.bar}
          litLevel={10}
          male={50}
          female={50}
        />
      )}
    </Modal>

  )
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