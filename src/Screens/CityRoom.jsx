import { View, Text, ImageBackground, StyleSheet, Image, Pressable, TextInput, ScrollView,Modal} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Api,  imgurl } from './Api';
import { players } from './Playerinfo';
const CityRoom = ({ navigation,route}) => {
  const rid=route.params.rid
  const [player, setPlayer] = useState([])
  const [playerid, setPlayerId] = useState()
  const [playerName, setPlayerName] = useState('')
  const [playerImage, setPlayerImage] = useState(null)
  const [error,setError]=useState('')
  const [modalVisible, setModalVisible] = useState(false);
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('player');
      const parsedPlayer = await JSON.parse(value);
      if (value !== null) {
        // We have data!!
        setPlayerId(parsedPlayer.Pid);
        setPlayerName(parsedPlayer.Pname)
        setPlayerImage(parsedPlayer.ImageName)
        console.log(parsedPlayer); 
      }
      else{
         console.log(parsedPlayer);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getplayers=async ()=>{
    try{
       const response=await fetch(`${Api}/Room/GetJoinRoom?rid=${rid}&pid=${playerid}`);
       const data=await response.json()
       if(response.ok){
           setPlayer(data)
           console.log(data);
       }
       else{
           setError(data.message)
           console.log("error: ",data);
       }
    }
    catch(error){
       console.log("Error: ",error);
    }
  }
  const Logout=async()=>{
    try {
        const response=await fetch(`${Api}/Player/Logout?id=${playerid}`);
        const data=await response.json()
        if(response.ok){
             await AsyncStorage.removeItem('player');
             console.log('Data removed')
             navigation.navigate('login')
         
        }
        else{
           console.log("Error",data);
        }
    } catch (error) {
       console.log("Error: ",error);
    }
 }
 const leaveRoom=async()=>{
   try {
      const response=await fetch(`${Api}/Room/Leave?pid=${playerid}`)
      const data=await response.json();
      if(response.ok){
        console.log(data);
        navigation.navigate('rooms')
      }
      else{
         console.log('error: ',data);
      }
   } catch (error) {
      console.log("Error: ",error);
   }
 }
  useEffect(() => {
    _retrieveData()
    if(playerid){
      getplayers()
    }
  }, [playerid]);
  return (
    <ImageBackground source={require('../assets/CloudsBackground.png')}
      style={styles.ImageBackground}>
      <Pressable style={styles.v1} onPress={()=>setModalVisible(true)}>
          {playerImage?<Image source={{uri:imgurl+playerImage}} style={styles.prof} />:
                       <Image source={require('../assets/icons/user.png')} style={styles.prof} />
        }
        <Text style={{fontSize:20}}>{playerName}</Text>
      </Pressable>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                   onPress={() => [
                      setModalVisible(false),
                      Logout()
                      ]}>
                    <Text style={styles.modalText}>Logout</Text>
                  </Pressable>
                  <Pressable
                   onPress={() => [
                      setModalVisible(false),
                      navigation.navigate('history')
                      ]}>
                    <Text style={[styles.modalText,{marginTop:5}]}>History</Text>
                  </Pressable>
             </View>
          </View>
        </Modal>
      <View style={{ width: '98%', height: '50%', alignSelf: 'center', marginTop: 50, padding: 15 }} >
        <ScrollView>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 14 }}>
                {player.length>0 ? player.map((item, index) => {
                  return (
                    <View style={{ width: '30%', alignItems: 'center' }} key={index}>
                      <Image source={{uri:imgurl+item.ImageName}} style={{ width: 70, height: 70 }} />
                      <Text style={{ fontSize: 20 }}>{item.Pname}</Text>
                      <Pressable style={{ backgroundColor: '#7E25D7', padding: 5, borderRadius: 30 }}>
                        <Text style={{ color: 'white' }}>Challenge</Text>
                      </Pressable>
                    </View>
                  )
                }) : <Text style={{fontSize:15,color:'black'}}>No player in room</Text>}
              </View>
          
        </ScrollView>
      </View>
      <Pressable style={{ backgroundColor: '#7E25D7', padding: 5, borderRadius: 30, width: '30%', alignItems: 'center', alignSelf: 'flex-end', padding: 5, marginTop: 150 }} onPress={leaveRoom}>
        <Text style={{ fontSize: 20, color: 'white' }}>Back</Text>
      </Pressable>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  v1: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#02A4ED',
    width: '33%',
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 20,
    gap: 5
  },
  prof: {
    width: 35,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 50
  },
  input: {
    borderWidth: 1,
    borderRadius: 30,
    width: '60%',
    fontSize: 15,
    paddingLeft: 10
    //backgroundColor:'#C5CACB'
  },
  press: {
    backgroundColor: '#7E25D7',
    alignItems: 'center',
    borderRadius: 50,
    width: '30%',
    justifyContent: 'center'
  },
  sview: {
    flexDirection: 'row',
    marginLeft: 5,
    gap: 5,
    alignSelf: 'center'
  },
  stext: {
    fontSize: 20,
    color: 'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
    position:'absolute',
    //width: '40%',
  },
  modalView: {
    marginTop:20,
    marginLeft: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    padding:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    //marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor:'#02A4ED',
    color: 'white',
    padding: 5,
    borderRadius:50
  },
   modal:{
    marginLeft: 25,
    backgroundColor:'grey',
    width: '33%',
    marginVertical:5,
    padding:10
   }
})
export default CityRoom