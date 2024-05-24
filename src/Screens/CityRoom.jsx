import { View, Text, ImageBackground, StyleSheet, Image, Pressable, TextInput, ScrollView } from 'react-native'
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
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('player');
      if (value !== null) {
        // We have data!!
        const parsedPlayer = JSON.parse(value);
        setPlayerId(parsedPlayer[0].Pid);
        setPlayerName(parsedPlayer[0].Pname)
        setPlayerImage(parsedPlayer[0].ImageName)
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const getplayers=async ()=>{
    try{
       const response=await fetch(`${Api}/Room/GetJoinRoom?rid=${rid}&pid=9`);
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
  useEffect(() => {
    _retrieveData(),console.log(rid),getplayers();
  }, []);
  return (
    <ImageBackground source={require('../assets/CloudsBackground.png')}
      style={styles.ImageBackground}>
      <Pressable style={styles.v1}>
        {playerImage ? <Image source={{ uri:imgurl+ playerImage }} style={styles.prof} /> :
          <Image source={require('../assets/icons/user.png')} style={styles.prof} />
        }
        <Text style={{ fontSize: 20 }}>{playerName}</Text>
      </Pressable>
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
      <Pressable style={{ backgroundColor: '#7E25D7', padding: 5, borderRadius: 30, width: '30%', alignItems: 'center', alignSelf: 'flex-end', padding: 5, marginTop: 150 }} onPress={() => navigation.goBack()}>
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
  }
})
export default CityRoom