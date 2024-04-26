import React, {useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  View,
  Pressable,
  Image,
} from 'react-native';

function Login({navigation}: {navigation: any}) {
  const [passView, setPassView] = useState(false);
  return (
    <ImageBackground
      source={require('../assets/CloudsBackground.png')}
      style={styles.ImageBackground}>
      <StatusBar backgroundColor="skyblue" barStyle="dark-content" />

      <View style={styles.v1}>
        <Text style={styles.t1}>Login to your account</Text>
        <TextInput placeholder="uname" style={styles.input} />
        <TextInput
          placeholder="password"
          style={[styles.input, {position: 'relative'}]}
          secureTextEntry={passView ? false : true}
        />
        {passView ? (
          <Pressable onPress={() => setPassView(false)}>
            <Image
              source={require('../assets/icons/hide.png')}
              style={styles.icon}
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => [setPassView(true)]}>
            <Image
              source={require('../assets/icons/view.png')}
              style={styles.icon}
            />
          </Pressable>
        )}
        <Pressable style={styles.press}>
          <Text style={styles.t2}>login</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('signup')}>
          <Text style={[styles.t1, {fontSize: 15}]}>
            Don't have account ? Signup
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  v1: {
    width: '95%',
    borderWidth: 3,
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderColor: '#7E25D7',
    backgroundColor: '#02A4ED',
    borderRadius: 30,
    alignItems: 'center',
  },
  t1: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
    paddingVertical: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 30,
    fontSize: 18,
    padding: 10,
    marginVertical: 10,
    width: '120%',
    color: 'black',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    position: 'absolute',
    marginTop: -50,
    marginLeft: 85,
  },
  press: {
    backgroundColor: '#7E25D7',
    paddingVertical: 8,
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 50,
  },
  t2: {
    fontSize: 25,
    color: 'white',
    fontWeight: '600',
  },
});
export default Login;
