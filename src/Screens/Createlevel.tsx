import { View, Text, ImageBackground, StyleSheet, ScrollView, TextInput, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const Createlevel = () => {
    const[blue,setBlue]=useState(false)
    const[green,setGreen]=useState(false)
    const[red,setRed]=useState(false)
    const[yellow,setYellow]=useState(false)
    const[purple,setPurple]=useState(false)
    let bluepath=require('../assets/BlueJellyBean.png')
    let greenpath=require('../assets/GreenJellyBean.png')
    let redpath=require('../assets/RedJellyBean.png')
    let yellowpath=require('../assets/YellowJellyBean.png')
    let purplepath=require('../assets/PurpleJellyBean.png')
  return (
    <ImageBackground source={require('../assets/CloudsBackground.png')} style={styles.ImageBackground} >
        <View style={styles.v1} >
            <ScrollView>
                <Text style={styles.t1}>Create level</Text>
                   <Pressable onPress={()=>setBlue(!blue)} style={styles.press}>
                      <Pressable style={blue ? styles.colorcheck:styles.check}/>
                      <Image source={bluepath} style={styles.img}/>
                      <Text style={{fontSize:responsiveFontSize(3),color:'black'}}>Score</Text>
                      <TextInput style={styles.input} />
                    </Pressable>
                    <Pressable onPress={()=>setGreen(!green)} style={styles.press}>
                      <Pressable style={green ? styles.colorcheck:styles.check}/>
                      <Image source={greenpath} style={styles.img}/>
                      <Text style={{fontSize:responsiveFontSize(3),color:'black'}}>Score</Text>
                      <TextInput style={styles.input} />
                    </Pressable>
                    <Pressable onPress={()=>setRed(!red)} style={styles.press}>
                      <Pressable style={red ? styles.colorcheck:styles.check}/>
                      <Image source={redpath} style={styles.img}/>
                      <Text style={{fontSize:responsiveFontSize(3),color:'black'}}>Score</Text>
                      <TextInput style={styles.input} />
                    </Pressable>
                    <Pressable onPress={()=>setYellow(!yellow)} style={styles.press}>
                      <Pressable style={yellow ? styles.colorcheck:styles.check}/>
                      <Image source={yellowpath} style={styles.img}/>
                      <Text style={{fontSize:responsiveFontSize(3),color:'black'}}>Score</Text>
                      <TextInput style={styles.input} />
                    </Pressable>
                    <Pressable onPress={()=>setPurple(!purple)} style={styles.press}>
                      <Pressable style={purple ? styles.colorcheck:styles.check}/>
                      <Image source={purplepath} style={styles.img}/>
                      <Text style={{fontSize:responsiveFontSize(3),color:'black'}}>Score</Text>
                      <TextInput style={styles.input} />
                    </Pressable>
                    <View style={styles.v2}>
                        <Text style={{fontSize:responsiveFontSize(3.5),color:'black'}}>Name</Text>
                        <TextInput style={styles.input1}/>
                    </View>
                    <View style={[styles.v2,{columnGap:52}]}>
                        <Text style={{fontSize:responsiveFontSize(3.5),color:'black'}}>Moves</Text>
                        <TextInput style={styles.input1}/>
                    </View>
                 <Text style={[styles.t1,{marginVertical:10}]}>Target</Text>
                 <View style={{flexDirection:'row',flexWrap:'wrap',rowGap:5}}>
                 {
                    blue ? 
                     <View style={{flexDirection:'row',gap:5,marginHorizontal:responsiveWidth(5)}}>
                        <Image source={bluepath} style={styles.img}/>
                        <TextInput style={styles.input} />
                     </View>   
                    :null
                 }
                 {
                    green ? 
                     <View style={{flexDirection:'row',gap:5,marginHorizontal:responsiveWidth(5)}}>
                        <Image source={greenpath} style={styles.img}/>
                        <TextInput style={styles.input} />
                     </View>   
                    :null
                 }
                 {
                    red ? 
                     <View style={{flexDirection:'row',gap:5,marginHorizontal:responsiveWidth(5)}}>
                        <Image source={redpath} style={styles.img}/>
                        <TextInput style={styles.input} />
                     </View>   
                    :null
                 }
                 {
                    yellow ? 
                     <View style={{flexDirection:'row',gap:5,marginHorizontal:responsiveWidth(5)}}>
                        <Image source={yellowpath} style={styles.img}/>
                        <TextInput style={styles.input} />
                     </View>   
                    :null
                 }
                 {
                    purple ? 
                     <View style={{flexDirection:'row',columnGap:5,marginHorizontal:responsiveWidth(5)}}>
                        <Image source={purplepath} style={styles.img}/>
                        <TextInput style={styles.input} />
                     </View>   
                    :null
                 }
                 </View>
                 <Pressable style={styles.press1}>
          <Text style={{color:'white',fontSize:22,fontWeight:'600'}}>Create</Text>
        </Pressable>
            </ScrollView>
        </View>
    </ImageBackground>
  ) 
}
const styles=StyleSheet.create({
    ImageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      v1:{
        borderWidth:4,
        width:'80%',
        height:'75%',
        borderRadius:responsiveWidth(7),
        borderColor: '#7E25D7',
        backgroundColor: '#02A4ED',
       // alignItems:'center',
        paddingVertical:responsiveHeight(1)
      },
      t1:{
       fontSize:responsiveFontSize(3.5),
       fontWeight:'600',
       color:'black',
       alignSelf:'center',
      },
      check:{
        borderWidth:1,
        width:responsiveWidth(6),
        height:responsiveHeight(3),
        backgroundColor: 'white',
        },
      colorcheck:{
        borderWidth:1,
        width:responsiveWidth(6),
        height:responsiveHeight(3),
        backgroundColor: '#C5CACB',
      },
      img:{
        width:30,
        height:30
      },
      press:{
        flexDirection:'row',
        columnGap:15,
        marginLeft:responsiveWidth(5),
        alignItems:'center',
        marginVertical:responsiveHeight(0.5)
      },
      input:{
        borderWidth:1,
        height:responsiveHeight(3),
        width:responsiveWidth(13)
      },
      input1:{
        borderWidth:1,
        height:responsiveHeight(4),
        width:responsiveWidth(20)
      },
      v2:{
        flexDirection:'row',
        columnGap:60,
        marginHorizontal:responsiveWidth(5),
        alignItems:'center',
        marginTop:responsiveHeight(1)
      },
      press1: {
        backgroundColor: '#7E25D7',
        width: '50%',
        alignItems: 'center',
        alignSelf:'center',
        borderRadius: 50,
        padding: 5,
        margin: 5,
      },
})
export default Createlevel