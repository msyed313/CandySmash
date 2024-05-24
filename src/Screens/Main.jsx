import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Main({navigation}) {
    const[login,setLogin]=useState(false)
   
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('player');
      if (value !== null) {
        // We have data!!
        setLogin(true)
        //console.log(value);
      }
      
    } catch (error) {
      // Error retrieving data
       
    }
  };
  useEffect(()=>{
    _retrieveData()
  },[])

  return (
    <ImageBackground
      source={require('../assets/CloudsBackground.png')}
      style={styles.ImageBackground}>
      <SafeAreaView>
        <Text style={styles.t1}>{'CANDY \n SMASH'}</Text>
        <Pressable
          style={styles.press}
          onPress={() => navigation.navigate('levels')}>
          <Text style={styles.t2}>Single Player</Text>
        </Pressable>
        <Pressable
          style={styles.press}
          onPress={()=>{ {login ? navigation.navigate('players') : navigation.navigate('login') }  }}>
          <Text style={styles.t2}>Multi Player</Text>
        </Pressable>
        <Pressable style={styles.press} onPress={BackHandler.exitApp}>
          <Text style={styles.t2}>Exit</Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  ImageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  t1: {
    fontSize: responsiveFontSize(6),
    color: '#FFEC00',
    fontWeight: '700',
    marginBottom: responsiveHeight(3),
  },
  press: {
    margin: responsiveWidth(2),
    backgroundColor: '#02A4ED',
    padding: responsiveWidth(2),
    alignItems: 'center',
    borderRadius: responsiveWidth(6),
  },
  t2: {
    fontSize: responsiveFontSize(2.5),
    color: 'white',
  },
});
export default Main;
