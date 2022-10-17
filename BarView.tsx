import { Text, View, Button, Alert, Modal, StyleSheet, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Bar } from './interfaces/Bar'
import { useState } from 'react';
import { usePostHog } from 'posthog-react-native';

interface BarViewProps {
  closeModal: Function,
  bar: Bar,
  litLevel: number
  male: number
  female: number
}

export const BarView = (props:BarViewProps) => {
  const [reportGenderRatio, setReportGenderRatio] = useState(50);
  const [reportLitLevel, setReportLitLevel] = useState(5)
  const [ showVibeReport, setShowVibeReport ] = useState(false)
  const posthog = usePostHog()


  return (
    
    <View style={styles.centeredView}>
        <View style={styles.modalView}>
        { !showVibeReport && (
          <>
            <View style={{flexDirection: "row", height:50, alignItems:"stretch", width:'100%'}}>
              <Text style={{ flex:6, fontFamily: 'Factor-A-Medium', fontSize: 25, }}>{props.bar.name}</Text>
              <View style={{ flex:1, flexDirection:"row-reverse"}}>
                <Pressable
                  onPress={()=>{
                    props.closeModal()
                  }}>
                  <Ionicons name="md-close" size={32} color="gray" style={{ alignItems:"stretch", }} />
                </Pressable>
              </View>
            </View>
            <View style={{flex: 2, flexDirection: "row", marginBottom: 10, marginHorizontal: "auto", maxHeight:120, marginTop: 20}} >
              <View style={{ alignItems: 'center', }}>
                <Text style={{ fontSize: 40 }}>🔥</Text>
                <Text style={{ fontSize: 18, color:'orange' }}>8/10</Text>
                <Text style={{ fontSize: 18, color:'grey' }}>Lit level</Text>
              </View>
              <View style={{marginLeft:30, marginBottom:10}}>
                <View style={{flex: 2, flexDirection: "row", justifyContent:"space-between"}} >
                    <Text style={{ fontSize: 20, fontFamily: 'Factor-A-Medium', color:'#307ecc', }}>Male</Text>
                    <Text style={{ fontSize: 20, fontFamily: 'Factor-A-Medium', color:'#be2596', }}>Female</Text>
                </View>
                <View style={{ marginTop:-10, width:240, marginBottom:10 }}>
                  <Slider
                    maximumValue={100}
                    minimumValue={0}
                    minimumTrackTintColor="#307ecc"
                    maximumTrackTintColor="#be2596"
                    step={1}
                    value={reportLitLevel}
                  />
                  <View style={{alignItems:'center'}}>
                    <Text style={{ fontSize: 18, color:'blue' }}>1:1</Text>
                    <Text style={{ fontSize: 18, color:'grey' }}>Ratio</Text>
                  </View>
                </View>
              </View>
            </View>
            <Pressable
              onPress={()=>{
                posthog?.capture("Vibe report started", { status: "successful" })
                setShowVibeReport(true)
              }}
              style={[styles.button, styles.buttonClose]}
            >
              <Text style={[styles.textStyle, { fontFamily: 'Factor-A-Medium', fontSize:18, padding:4 }]}>Report Vibe</Text>
            </Pressable>
          </>
        )}
        { showVibeReport && (
          <>
            <View style={{flexDirection: "row", height:50, alignItems:"stretch", width:'100%'}}>
            <Text style={{ flex:6, fontFamily: 'Factor-A-Medium', fontSize: 25, }}>Submit Vibe Report</Text>
            <View style={{ flex:1, flexDirection:"row-reverse"}}>
              <Pressable
                onPress={()=>{
                  props.closeModal()
                }}>
                <Ionicons name="md-close" size={32} color="gray" style={{ alignItems:"stretch", }} />
              </Pressable>
            </View>
          </View>
          <View style={{flex: 2, flexDirection: "column", marginBottom: 10, marginHorizontal: "auto",}} >
            <View style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center', }}>
              
                <Text style={{ fontSize: 40 }}>🔥</Text>
                <Slider
                  style={{width: 250, height: 40}}
                  minimumValue={0}
                  maximumValue={10}
                  minimumTrackTintColor="orange"
                  
                  value={reportLitLevel}
                  onValueChange={(value)=>{
                    setReportLitLevel(Math.round(value * 10) / 10)
                  }}
                />
                <Text style={{ fontSize: 18, color:'orange' }}>{reportLitLevel}/10</Text>
                <Text style={{ fontSize: 18, color:'grey' }}>Lit level</Text>
                
              </View>
            
              <View style={{marginTop:30}}>
                <View style={{
                    flex: 2, 
                    flexDirection: "row", 
                    justifyContent:"space-between", 
                    maxWidth:250,
                    maxHeight:25, }} 
                  >
                    <Text style={{ fontSize: 20, fontFamily: 'Factor-A-Medium', color:'#307ecc', }}>Male</Text>
                    <Text style={{ fontSize: 20, fontFamily: 'Factor-A-Medium', color:'#be2596', }}>Female</Text>
                </View>
                <View
                  style={{
                    marginTop: -15
                  }}>
                  <Slider
                    style={{width: 250, height: 40}}
                    maximumValue={100}
                    minimumValue={0}
                    minimumTrackTintColor="#307ecc"
                    maximumTrackTintColor="#be2596"
                    step={1}
                    value={reportGenderRatio}
                  />
                  <View style={{alignItems:'center'}}>
                    <Text style={{ fontSize: 18, color:'blue' }}>1:1</Text>
                    <Text style={{ fontSize: 18, color:'grey' }}>Ratio</Text>
                  </View>
                </View>
              </View>
              </View>
            <Pressable
              onPress={()=>{
                setShowVibeReport(true)
                posthog?.capture("Vibe report submitted", { status: "successful" })
              }}
              style={[styles.button, styles.buttonClose]}
            >
              <Text style={[styles.textStyle, { fontFamily: 'Factor-A-Medium', fontSize:18, padding:4 }]}>Submit</Text>
            </Pressable>
          </View>
        </>
        )}

        </View>
    </View>)
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