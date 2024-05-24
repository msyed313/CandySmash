import { View,Modal, Text, ImageBackground, StyleSheet, Image, Pressable, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Api,imgurl} from './Api';
import { players } from './Playerinfo';
const Players = ({ navigation }) => {
  const [player, setPlayer] = useState([])
  const [playerid, setPlayerId] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [imageName, setImageName] = useState(null)
  const [searched, setSearched] = useState(false)
  const [searchPlayers,setSearchPlayers]=useState([])
  const[name,setName]=useState(null)
  const[error,setError]=useState('')
  const[error1,setError1]=useState('')
  const [modalVisible, setModalVisible] = useState(false);
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('player');
      if (value !== null) {
        // We have data!!
        const parsedPlayer = JSON.parse(value);
        setPlayerId(parsedPlayer[0].Pid);
        setPlayerName(parsedPlayer[0].Pname)
        setImageName(parsedPlayer[0].ImageName)
        console.log(parsedPlayer[0].Pid);
        console.log(playerid);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const _removeitem=async ()=>{
    try {
      await AsyncStorage.removeItem('player');
      navigation.navigate('login')
      console.log('Data removed')
     }
  catch(exception) {
      console.log(exception)
    }
  }
  const getPlayers = async () => {
    try {
      const response = await fetch(`${Api}/Player/GetPlayers?id=${playerid}`)
      const data = await response.json()
      if (response.ok) {
        setPlayer(Array.isArray(data) ? data : [])
        console.log(data);
      }
      else {
        setError1(data)
        console.log('Error', data);
        
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }
  const searchplayer=async ()=>{
    try {
      const response = await fetch(`${Api}/Player/search?name=${name}&id=${playerid}`);
      const data = await response.json();
     // const pid=data.Pid;
      if (response.ok) {
        setSearchPlayers(data)
        console.log(data);
        setSearched(true)
        setError('')
        setName('')
      } else {
        console.log('Error', data.message);
        setError(data.message)
        setSearched(true)
        setSearchPlayers('')
        setName('')
      }
    }catch (error) {
      console.log('Error:', error);
    }
  }
  useEffect(() => {
    _retrieveData().then(() => {
      if (playerid) {
        setTimeout(() => {
          getPlayers();
        }, 3000);
      }
    });
  }, [playerid]);
  return (
    <ImageBackground source={require('../assets/CloudsBackground.png')}
      style={styles.ImageBackground}>
      <Pressable style={styles.v1} onPress={()=>setModalVisible(true)}>
        {imageName ? <Image source={{ uri:imgurl+imageName }} style={styles.prof} /> :
          <Image source={require('../assets/icons/user.png')} style={styles.prof} />
        }
        <Text style={{ fontSize: 20 }}>{playerName}</Text>
      </Pressable>
       <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                   onPress={() => [
                      setModalVisible(false),
                      _removeitem()
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
      <View style={styles.sview}>
        <TextInput placeholder='search player' style={styles.input} onChangeText={setName} value={name} />
        <Pressable style={styles.press} onPress={searchplayer}>
          <Text style={styles.stext}>Search</Text>
        </Pressable>
      </View>
      <View style={{ width: '98%', height: '50%', alignSelf: 'center', marginTop: 50, padding: 15 }} >
        <ScrollView>
          {
            searched ?  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', gap: 14 }}>
            {searchPlayers.length>0? searchPlayers.map((item, index) => {
              return (
                <View style={{ width: '30%', alignItems: 'center' }} key={index}>
                 {item.ImageName?<Image source={{uri:imgurl+item.ImageName}} style={{ width: 70, height: 70 }} />:<Image source={require('../assets/icons/user.png')} style={{ width: 70, height: 70 }} />}
                  <Text style={{ fontSize: 20 }}>{item.Pname}</Text>
                  <Pressable style={{ backgroundColor: '#7E25D7', padding: 5, borderRadius: 30 }}>
                    <Text style={{ color: 'white' }}>Challenge</Text>
                  </Pressable>
                </View>
              )
            }): <Text style={{fontSize:15,color:'black'}}>No player online</Text>}
          </View> :
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent:'flex-start', gap: 14 }}>
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
                }) : <Text style={{fontSize:15,color:'black'}}>No player online</Text>}
              </View>
          }
        </ScrollView>
        </View>
        
      <Pressable style={{ backgroundColor: '#02A4ED', padding: 5, borderRadius: 30, width: '50%', alignItems: 'center', alignSelf: 'center', padding: 10 }} onPress={() => navigation.navigate('rooms')}>
        <Text style={{ fontSize: 20, color: 'white' }}>Join Room</Text>
      </Pressable>
      <Pressable style={{ backgroundColor: '#7E25D7', padding: 5, borderRadius: 30, width: '30%', alignItems: 'center', alignSelf: 'flex-end', padding: 5, marginTop: 50 }} onPress={() => navigation.goBack()}>
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
    marginLeft: 20,
    gap: 5,
    marginTop:20,
    marginBottom:10
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
  ,
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
  }
})
export default Players