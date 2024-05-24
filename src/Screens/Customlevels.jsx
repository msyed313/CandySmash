import React, {useState,useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import sqlite from 'react-native-sqlite-storage';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
function Customlevels({navigation}) {
  const Levels = [];
  useEffect(() => {
    getcustomlevel()
  }, [])
  async function getcustomlevel() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
    t.executeSql(
    'select * from Customlevel',
    [],
    (tx, resultSet) => {
    for (let i = 0; i < resultSet.rows.length; i++) {
      Levels.push(resultSet.rows.item(i));
    }
    console.log(Levels)
    //alert('get All Data');
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
            onPress={() => navigation.navigate('gamelevel')}>
            <Text style={styles.t2}>Game levels</Text>
          </Pressable>
        </View>
        <ScrollView style={styles.sv}>
          <View style={styles.v2}>
          <FlatList
              data={Levels}
              numColumns={3}
              renderItem={({item})=>(
                 <View style={styles.mv} key={item.l_id}>
                     
                     <Pressable style={styles.p2} onPress={()=>navigation.navigate('customscreen',{
                       l_name:item.l_name
                     })}>
                    <Text style={styles.t3}>{item.l_name}</Text>
                     </Pressable>
                 </View>
              )}
            />
          </View>
        </ScrollView>

        <Pressable style={styles.p3} onPress={() => navigation.goBack()}>
          <Text style={styles.t2}>Back</Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  ImageBackground: {
    width: '100%',
    height: '100%',
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
    marginVertical: responsiveHeight(14),
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
  },
  mv: {
    width: '30%',
    alignItems: 'center',
  },
  p2: {
    backgroundColor: '#02A4ED',
    padding: responsiveWidth(3),
    borderRadius: responsiveWidth(4),
    alignItems: 'center',
  },
  p3: {
    backgroundColor: '#02A4ED',
    width: responsiveWidth(25),
    padding: 5,
    borderRadius: responsiveWidth(5),
    alignSelf: 'flex-end',
    margin: responsiveWidth(1),
  },
});
export default Customlevels;
