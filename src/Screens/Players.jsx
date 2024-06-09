import { View, Text, ImageBackground, StyleSheet, Image, Pressable, TextInput, ScrollView, Modal, Alert, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Api, imgurl } from './Api';

const Players = ({ navigation }) => {
  const [player, setPlayer] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [imageName, setImageName] = useState(null);
  const [searched, setSearched] = useState(false);
  const [searchPlayers, setSearchPlayers] = useState([]);
  const [name, setName] = useState(null);
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [serverMessages, setServerMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [image, setImage] = useState(null);
  const [receivedImages, setReceivedImages] = useState([]);
  const [senderId, setSenderId] = useState('');
  const [animatedValue] = useState(new Animated.Value(0));
  const [clientImage,setClientImage]=useState(null)
  const [clientName,setClientName]=useState('')
  const [clientImageName,setClientImageName]=useState(null)
  const [challengerId,setChallengerId]=useState('')
  const [receivemessage,setReceiveMessage]=useState('')
  const [showMessage, setShowMessage] = useState(false);
  const animateMessages = () => {
    // Animate server messages when they update
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const declineMessages = () => {
    // Animate the message when `receivemessage` updates
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Set a timeout to hide and delete the message after 2 seconds
    const timer = setTimeout(() => {
      // Reverse the animation before hiding
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowMessage(false);
        setReceiveMessage(''); // Clear the message after hiding
      });
    }, 2000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (receivemessage) {
      setShowMessage(true);
      declineMessages();
    }
  }, [receivemessage]);
  
  useEffect(() => {
    animateMessages();
    console.log(serverMessages);
    if(serverMessages.length>0){
      setChallengerId(serverMessages[0].senderId)
       }
    }, [serverMessages]);
  useEffect(()=>{
     getPlayer()
     
  },[challengerId])
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('player');
      const parsedPlayer = await JSON.parse(value);
      if (value !== null) {
        // We have data!!
        setSenderId(parsedPlayer.Pid);
        setPlayerName(parsedPlayer.Pname);
        setImageName(parsedPlayer.ImageName);
        //console.log(parsedPlayer);
      } else {
        //console.log(parsedPlayer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPlayers = async () => {
    try {
      const response = await fetch(`${Api}/Player/GetPlayers?id=${senderId}`);
      const data = await response.json();
      if (response.ok) {
        setPlayer(Array.isArray(data) ? data : []);
        //console.log(data);
      } else {
        setError1(data);
        console.log('Error', data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const getPlayer = async () => {
    try {
      const response = await fetch(`${Api}/Player/GetPlayer?id=${challengerId}`);
      const data = await response.json();
      if (response.ok) {
        //console.log(data);
        setClientImage(data.ImagePath)
        setClientName(data.Pname)
        setClientImageName(data.ImageName)
        //console.log(data.Pname);
      } else {
        //setError1(data);
        console.log('Error', data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const searchplayer = async () => {
    try {
      const response = await fetch(`${Api}/Player/search?name=${name}&id=${senderId}`);
      const data = await response.json();
      if (response.ok) {
        setSearchPlayers(data);
        console.log(data);
        setSearched(true);
        setError('');
        setName('');
      } else {
        console.log('Error', data.message);
        setError(data.message);
        setSearched(true);
        setSearchPlayers('');
        setName('');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const Logout = async () => {
    try {
      const response = await fetch(`${Api}/Player/Logout?id=${senderId}`);
      await AsyncStorage.removeItem('player');
        console.log('Data removed');
      const data = await response.json();
      if (response.ok) {
        navigation.navigate('login');
      } else {
        console.log("Error", data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const connect = () => {
    const ws = new WebSocket(`ws://192.168.10.10:8080/?id=${senderId}`);
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setConnectionStatus('Connected');
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      //console.log(data);
      if (data.type === 'image') {
        setReceivedImages(prevImages => [...prevImages, { senderId: data.senderId, image: data.data }]);
      } else if (data.type === 'message') {
        if(data.data=='accepted'){
          //console.log(data);
          navigation.navigate('multi',{challenger:data.clientId,receiver:data.senderId})
        }
        else if(data.data=='declined'){
           setReceiveMessage('player declined your request')
        }
        else{
        setServerMessages(prevMessages => [...prevMessages, { senderId: data.senderId, text: data.data }]);
      }}
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus(`Error: ${error.message}`);
    };

    ws.onclose = (e) => {
      console.log('Disconnected from WebSocket server:', e.reason);
      setConnectionStatus(`Disconnected: ${e.reason}`);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  };

  const sendMessageToClient = async (id,mes) => {
    try {
      const body = { clientId: id, senderId };
      if (image) {
        body.image = image.base64;
      }
       else if (mes=='challenged you') {
        body.message = 'challenged you';
      }
      else if(mes=='declined'){
        body.message='declined'
      }
      const response = await fetch('http://192.168.10.10:8080/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  const sendMessageToBoth = async (mes) => {
    try {
      const body = { clientId: challengerId, senderId };
      
      if (image) {
        body.image = image.base64;
      } else  {
        body.message = mes;
      }
      const response = await fetch('http://192.168.10.10:8080/sendboth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  useEffect(() => {
    _retrieveData();
    if (senderId) {
      getPlayers();
      connect();
    }
  }, [senderId]);

  return (
    <ImageBackground source={require('../assets/CloudsBackground.png')}
      style={styles.ImageBackground}>
      <Pressable style={styles.v1} onPress={() => setModalVisible(true)}>
        {imageName ? (
          <Image source={{ uri: imgurl + imageName }} style={styles.prof} />
        ) : (
          <Image source={require('../assets/icons/user.png')} style={styles.prof} />
        )}
        <Text style={{ fontSize: 20 }}>{playerName}</Text>
      </Pressable>
      {serverMessages.map((msg, index) => (
        <Animated.View
          key={index}
          style={[
            styles.chl,
            {
              opacity: animatedValue,
              transform: [
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-60, -70],
                  }),
                },
              ],
            },
          ]}
        >
        {
            clientImageName?
            <Image source={{ uri: imgurl + clientImageName }} style={{width:'20%',height:'80%',borderRadius:200,resizeMode:'center'}} />:
            <Text style={styles.chltext}>{clientName}</Text>
          }
          
          <Text style={styles.chltext}>{msg.text}</Text>
          <Pressable style={styles.chlpress} onPress={() => [setServerMessages([]),sendMessageToBoth('accepted')]}>
            <Text style={styles.chltext}>Accept</Text>
          </Pressable>
          <Pressable style={styles.chlpress} onPress={() => [setMessage('declined'),setServerMessages([]),sendMessageToClient(challengerId,'declined')]}>
            <Text style={styles.chltext}>Decline</Text>
          </Pressable>
        </Animated.View>
      ))}
      {receivemessage ?
      <Animated.View
      style={[
        styles.chl,
        {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-60, -70],
              }),
            },
          ],
        },
      ]}
    >
    <Text style={styles.chltext}>{receivemessage}</Text>
    </Animated.View>
       :null
      }
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
              <Text style={[styles.modalText, { marginTop: 5 }]}>History</Text>
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
            searched ? <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', gap: 14 }}>
              {searchPlayers.length > 0 ? searchPlayers.map((item, index) => {
                return (
                  <Pressable style={{ width: '30%', alignItems: 'center' }} key={index} onPress={() => [sendMessageToClient(item.Pid,'challenged you')]}>
                    {item.ImageName ? <Image source={{ uri: imgurl + item.ImageName }} style={{ width: 70, height: 70 }} /> : <Image source={require('../assets/icons/user.png')} style={{ width: 70, height: 70 }} />}
                    <Text style={{ fontSize: 20 }}>{item.Pname}</Text>
                    <Pressable style={{ backgroundColor: '#7E25D7', padding: 5, borderRadius: 30 }} >
                      <Text style={{ color: 'white' }}>Challenge</Text>
                    </Pressable>
                  </Pressable>
                )
              }) : <Text style={{ fontSize: 15, color: 'black' }}>No player online</Text>}
            </View> :
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 14 }}>
                {player.length > 0 ? player.map((item, index) => {
                  return (
                    <Pressable style={{ width: '30%', alignItems: 'center' }} key={index}  onPress={() => [sendMessageToClient(item.Pid,'challenged you')]}>
                      {item.ImageName ? <Image source={{ uri: imgurl + item.ImageName }} style={{ width: 70, height: 70 }} /> : <Image source={require('../assets/icons/user.png')} style={{ width: 70, height: 70 }} />}
                      <Text style={{ fontSize: 20 }}>{item.Pname}</Text>
                      <Pressable style={{ backgroundColor: '#7E25D7', padding: 5, borderRadius: 30 }} >
                        <Text style={{ color: 'white' }}>Challenge</Text>
                      </Pressable>
                    </Pressable>
                  )
                }) : <Text style={{ fontSize: 15, color: 'black' }}>No player online</Text>}
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
  );
};

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
    marginTop: 20,
    marginBottom: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
    position: 'absolute',
  },
  modalView: {
    marginTop: 20,
    marginLeft: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    padding: 10,
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
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#02A4ED',
    color: 'white',
    padding: 5,
    borderRadius: 50
  },
  modal: {
    marginLeft: 25,
    backgroundColor: 'grey',
    width: '33%',
    marginVertical: 5,
    padding: 10
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
  chl: {
    backgroundColor: '#02A4ED',
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    padding: 5,
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    marginTop: '20%',
    height:'10%',
    justifyContent:'space-evenly'
  },
  chltext: {
    fontSize: 15,
    color: 'white'
  },
  chlpress: {
    backgroundColor: '#7E25D7',
    padding: 5,
    borderRadius: 30
  }
});

export default Players;
