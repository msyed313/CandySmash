import { View, Text,StyleSheet,ImageBackground,Pressable,Image,TextInput, ScrollView } from 'react-native'
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
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('player');
      if (value !== null) {
        // We have data!!
        const parsedPlayer = JSON.parse(value);
        setPlayerId(parsedPlayer[0].Pid);
        setPlayerName(parsedPlayer[0].Pname)
        setImageName(parsedPlayer[0].ImageName)
      }
    } catch (error) {
      // Error retrieving data
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
  //const joinRoom=async()
   useEffect(()=>{_retrieveData(),getRooms()},[])
  return (
    <ImageBackground source={require('../assets/CloudsBackground.png')}
    style={styles.ImageBackground}>
      <Pressable style={styles.v1}>
          {imageName?<Image source={{uri:imgurl+imageName}} style={styles.prof} />:
                       <Image source={require('../assets/icons/user.png')} style={styles.prof} />
        }
        <Text style={{fontSize:20}}>{playerName}</Text>
      </Pressable>
     <ScrollView>
     {
       rooms?.map((item,index)=>{
          return(
             <View style={styles.rview} key={index}>
                <Image source={{uri:roomurl+item.ImageName}} style={styles.img} />
                <Pressable style={styles.press} onPress={()=>navigation.navigate('cityroom',{rid:item.Rid})}>
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
  }
})
export default Rooms