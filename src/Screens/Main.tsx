import React from 'react';
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
function Main({navigation}: {navigation: any}) {
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
          onPress={() => navigation.navigate('login')}>
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
