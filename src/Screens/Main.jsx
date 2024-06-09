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

function Main({ navigation }) {
  const [login, setLogin] = useState(false);

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('player');
      if (value !== null) {
        setLogin(true);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/CloudsBackground.png')}
      style={styles.ImageBackground}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.t1}>{'CANDY \n SMASH'}</Text>
        <Pressable
          style={styles.press}
          onPress={() => navigation.navigate('levels')}>
          <Text style={styles.t2}>Single Player</Text>
        </Pressable>
        <Pressable
          style={styles.press}
          onPress={() => {
            login ? navigation.navigate('players') : navigation.navigate('login');
          }}>
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
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  t1: {
    fontSize: responsiveFontSize(6),
    color: '#FFEC00',
    fontWeight: '700',
    marginBottom: responsiveHeight(3),
    textAlign: 'center',
  },
  press: {
    margin: responsiveWidth(2),
    backgroundColor: '#02A4ED',
    padding: responsiveWidth(4),
    alignItems: 'center',
    borderRadius: responsiveWidth(6),
    width: responsiveWidth(80), // Adjust width for better responsiveness
  },
  t2: {
    fontSize: responsiveFontSize(2.5),
    color: 'white',
  },
});

export default Main;
