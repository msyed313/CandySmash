import {View, Text, StyleSheet, ImageBackground, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('main');
    }, 3000);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/CloudsBackground.png')}
      style={styles.v1}>
      <StatusBar backgroundColor="skyblue" barStyle="dark-content" />
      <Text style={styles.t1}>{'CANDY \n SMASH'}</Text>
      <Text style={styles.t2}>Relax and Play</Text>
    </ImageBackground>
  );
};

export default Splash;
const styles = StyleSheet.create({
  v1: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  t1: {
    fontSize: responsiveFontSize(7),
    color: '#F1DF01',
    fontWeight: '700',
  },
  t2: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(3),
    color: 'black',
  },
});
