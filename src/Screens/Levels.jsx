import React, {useEffect, useState} from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import sqlite from 'react-native-sqlite-storage';


function Levels({navigation}) {
  const Levels= [];
    useEffect(() => {
      getAllData()
    }, [])
    async function getAllData() {
      let db = await sqlite.openDatabase({name: 'demo.db'});
      db.transaction(function (t) {
      t.executeSql(
      'select * from Gamelevels',
      [],
      (tx, resultSet) => {
      for (let i = 0; i < resultSet.rows.length; i++) {
        Levels.push(resultSet.rows.item(i));
      }
      console.log(Levels)
    },
      (e) => {
      console.log(JSON.stringify(e));
      },
      );
      });
      }
  return (
    <ImageBackground
      source={require('../assets/CloudsBackground.png')}
      style={styles.ImageBackground}>
      <SafeAreaView>
        <View style={styles.v1}>
          <View>
            <Image
              source={require('../assets/icons/love.png')}
              style={styles.life}
            />
            <Text style={styles.t1}>5</Text>
          </View>
          <Pressable
            style={styles.p1}
            onPress={() => navigation.navigate('customlevels')}>
            <Text style={styles.t2}>Custom levels</Text>
          </Pressable>
        </View>
        <ScrollView style={styles.sv}>
          <View style={styles.v2}>
            <FlatList
              data={Levels}
              numColumns={3}
              renderItem={({item})=>(
                 <View style={styles.mv} key={item.l_id}>
                     <View style={{flexDirection: 'row'}}>
                     {item.score >= 130 ? (
                      <Image
                        source={require('../assets/icons/star.png')}
                        style={styles.stars}
                      />
                    ) : (
                      <Image
                        source={require('../assets/icons/rating.png')}
                        style={styles.stars}
                      />
                    )}
                    {item.score >= 315 ? (
                      <Image
                        source={require('../assets/icons/star.png')}
                        style={styles.stars}
                      />
                    ) : (
                      <Image
                        source={require('../assets/icons/rating.png')}
                        style={styles.stars}
                      />
                    )}
                    {item.score >= 425 ? (
                      <Image
                        source={require('../assets/icons/star.png')}
                        style={styles.stars}
                      />
                    ) : (
                      <Image
                        source={require('../assets/icons/rating.png')}
                        style={styles.stars}
                      />
                    )}
                     </View>
                     {item.score>0 || item.Status=='unlock' ?
                     <Pressable style={styles.p2} onPress={()=>navigation.navigate('gamescreen',{
                      l_id:item.l_id
                    })}>
                    <Text style={styles.t3}>{item.l_name}</Text>
                    </Pressable>:
                    <Pressable style={styles.p2}>
                    <Text style={styles.t3}>{item.l_name}</Text>
                    </Pressable>
                    }
                     
                 </View>
              )}
            />
          </View>
        </ScrollView>
        <View style={[styles.v1]}>
          <Pressable style={styles.p1} onPress={()=>navigation.navigate('createlevel')}>
            <Text style={styles.t2}>Create level</Text>
          </Pressable>
          <Pressable style={styles.p1} onPress={() => navigation.goBack()}>
            <Text style={styles.t2}>Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  ImageBackground: {
    width: '100%',
    height: '100%',
    //justifyContent:'center',
    
  },
  v1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(1),
  },
  life: {
    width: responsiveWidth(15),
    height: responsiveHeight(15),
    resizeMode: 'contain',
    position: 'relative',
  },
  t1: {
    position: 'absolute',
    fontSize: responsiveFontSize(3.5),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(5),
    color: 'white',
  },
  p1: {
    backgroundColor: '#02A4ED',
    height: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(5),
    alignItems: 'center',
  },
  t2: {
    fontSize: responsiveFontSize(2.5),
    color: 'white',
    alignSelf: 'center',
  },
  t3: {
    fontSize: responsiveFontSize(2.7),
    color: 'white',
    fontWeight: 'bold',
  },
  sv: {
    width: '90%',
    height: responsiveHeight(50),
    marginVertical: responsiveHeight(13),
    alignSelf: 'center',
  },
  v2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    //alignSelf:'center'
  },
  stars: {
    width: responsiveWidth(7),
    height: responsiveHeight(7),
    resizeMode: 'contain',
    color:'yellow'
  },
  mv: {
    width: '30%',
    alignItems: 'center',
  },
  p2: {
    backgroundColor: '#02A4ED',
    padding: 15,
    borderRadius: responsiveWidth(4),
    alignItems: 'center',
  },
});
export default Levels;
