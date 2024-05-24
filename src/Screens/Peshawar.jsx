import { View, Text, ImageBackground, StyleSheet, Image, Pressable, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from './Api';
import { players } from './Playerinfo';
const Peshawar = ({ navigation }) => {
  const [player, setPlayer] = useState()
  const [playerid, setPlayerId] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [playerImage, setPlayerImage] = useState(null)
  const [searched, setSearched] = useState(false)
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('player');
      if (value !== null) {
        // We have data!!
        const parsedPlayer = JSON.parse(value);
        setPlayerId(parsedPlayer[0].Pid);
        setPlayerName(parsedPlayer[0].Pname)
        setPlayerImage(parsedPlayer[0].ImagePath)
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const getPlayers = async () => {
    try {
      const response = await fetch(`http://172.16.217.214/CandySmash/api/Player/GetPlayers?id=5`)
      const data = await response.json()
      if (response.ok) {
        console.log(data);
      }
      else {
        console.log('Error', data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }
  useEffect(() => { getPlayers(), _retrieveData() }, [])
  return (
    <ImageBackground source={require('../assets/CloudsBackground.png')}
      style={styles.ImageBackground}>
      <Pressable style={styles.v1}>
        {playerImage ? <Image source={{ uri: playerImage }} style={styles.prof} /> :
          <Image source={require('../assets/icons/user.png')} style={styles.prof} />
        }
        <Text style={{ fontSize: 20 }}>{playerName}</Text>
      </Pressable>
      <Text>{player}</Text>
      <View style={{ width: '98%', height: '50%', alignSelf: 'center', marginTop: 50, padding: 15 }} >
        <ScrollView>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 14 }}>
                {players.map((item, index) => {
                  return (
                    <View style={{ width: '30%', alignItems: 'center' }} key={index}>
                      <Image source={item.image} style={{ width: 70, height: 70 }} />
                      <Text style={{ fontSize: 20 }}>{item.name}</Text>
                      <Pressable style={{ backgroundColor: '#7E25D7', padding: 5, borderRadius: 30 }}>
                        <Text style={{ color: 'white' }}>Challenge</Text>
                      </Pressable>
                    </View>
                  )
                })}
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
export default Peshawar