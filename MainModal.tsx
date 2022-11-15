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

        />
      )}
    </Modal>
  )
}