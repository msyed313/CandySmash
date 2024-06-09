import { View, Text,StyleSheet,ImageBackground,Pressable,Image,TextInput, ScrollView,Modal } from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RoomData } from './RoomData'
import { Api, imgurl, roomurl } from './Api';
const Rooms = ({navigation}) => {
  const[player,setPlayer]=useState()
   const[playerid,setPlayerId]=useState('')
   const[playerName,setPlayerName]=useState('')
   const[imageName,setImageName]=useState(null)
   const[rooms,setRooms]=useState()
   const[error,setError]=useState('')
   const [modalVisible, setModalVisible] = useState(false);
   _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('player');
      const parsedPlayer = await JSON.parse(value);
      if (value !== null) {
        // We have data!!
        setPlayerId(parsedPlayer.Pid);
        setPlayerName(parsedPlayer.Pname)
        setImageName(parsedPlayer.ImageName)
        console.log(parsedPlayer); 
      }
      else{
         console.log(parsedPlayer);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getRooms= async()=>{
    try {
      const response=await fetch(`${Api}/Room/Get`);
      const data=await response.json();
      if(response.ok){
          //console.log(data);
          setRooms(data)
          console.log(rooms);
      }
      else{
         console.log(data);
         setError(data)
      }
    } catch (error) {
      console.log("Error:",error);
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
  const joinRoom=async(rid)=>{
    try {
       const response=await fetch(`${Api}/Room/Join?rid=${rid}&pid=${playerid}`)
       const data=await response.json()
       if(response.ok){
         console.log(data);
         navigation.navigate('cityroom',{rid:rid})
       }
       else{
         console.log("error: ",data);
       }
    } catch (error) {
        console.log("Error: ",error);
    }
  }
   useEffect(()=>{_retrieveData(),getRooms()},[])
  return (
    <ImageBackground source={require('../assets/CloudsBackground.png')}
    style={styles.ImageBackground}>
      <Pressable style={styles.v1} onPress={()=>setModalVisible(true)}>
          {imageName?<Image source={{uri:imgurl+imageName}} style={styles.prof} />:
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
     <ScrollView>
     {
       rooms?.map((item,index)=>{
          return(
             <View style={styles.rview} key={index}>
                <Image source={{uri:roomurl+item.ImageName}} style={styles.img} />
                <Pressable style={styles.press} onPress={()=>joinRoom(item.Rid)}>
                <Text style={{fontSize:18,color:'white'}}>{item.Rname}</Text>
                </Pressable>
              </View>
          )
       })
     }

      </ScrollView> 
     
    </ImageBackground>
  )
}
const styles=StyleSheet.create({
  ImageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  v1:{
    justifyContent:'flex-end',
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#02A4ED',
    width:'33%',
   paddingHorizontal:10,
    borderRadius:20,
    margin:20,
    gap:5
  },
  prof:{
    width:35,
    height:40,
    resizeMode:'contain',
    borderRadius:50
  },
  img:{
    width:250,
    height:150
  },
  rview:{
    justifyContent:'center',
    alignItems:'center'
  },
  press:{
    backgroundColor:'#7E25D7',
    width:'50%',
    padding:10,
    alignItems:'center',
    margin:10,
    borderRadius:50
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
export default Rooms