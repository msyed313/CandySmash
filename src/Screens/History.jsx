import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import Historydata from './Historydata'
function History() {
  return (
    <ImageBackground source={require('../assets/CloudsBackground.png')}
    style={styles.ImageBackground}>
            <View style={styles.v1} >
                <Text style={styles.t1}>History</Text>
                <View style={styles.v2}>
                     <View style={styles.v3}>
                        <Text>Sr.No</Text>
                        <Text>Name</Text>
                        <Text>Score</Text>
                        <Text>Status</Text>
                        <Text>Date</Text>
                     </View>
                    
                        {
                            Historydata.map((item,index)=>{
                                return(
                                    <View style={styles.v4} key={index}>
                                    <Text>{index+1}</Text>
                                    <Text>{item.name}</Text>
                                    <Text>{item.score}</Text>
                                    <Text>{item.status}</Text>
                                    <Text>{item.date}</Text>
                                    </View>
                                )
                            })
                        }
                     
                    
                </View>
            </View>
    </ImageBackground>
  )
}
const styles=StyleSheet.create({
    ImageBackground:{
        flex:1,
        width: '100%',
        height: '100%',
        justifyContent:'center',
        alignItems:'center'
    },
    v1:{
        borderWidth:4,
        width:'90%',
        borderColor:'#7E25D7',
        paddingHorizontal:10,
        paddingVertical:20,
        backgroundColor:'#02A4ED',
        alignItems:'center',
        borderRadius:30
    },
    t1:{
        fontSize:23,
        fontWeight:'700',
        color:'black'
    },
    v2:{
        backgroundColor:'white',
        //borderWidth:2,
        width:'95%',
        padding:10,
        marginTop:10,
        
    },
    v3:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        marginVertical:5,
        width:'100%'
    }  ,
    v4:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        marginVertical:7,
        width:'100%'
    }
})
export default History