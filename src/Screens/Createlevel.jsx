import { View, Text, ImageBackground, StyleSheet, ScrollView, TextInput, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import sqlite from 'react-native-sqlite-storage'
import { launchImageLibrary } from 'react-native-image-picker'
const Createlevel = () => {
  const [blue, setBlue] = useState(false)
  const [bluescore, setBlueScore] = useState('')
  const [bluetarget, setBlueTarget] = useState(0)
  let blueimg = require('../assets/OrangeJellyBean.png')
  let bluePath = '../assets/OrangeJellyBean.png'

  const [green, setGreen] = useState(false)
  const [greenscore, setGreenScore] = useState('')
  const [greentarget, setGreenTarget] = useState(0)
  let greenimg = require('../assets/GreenJellyBean.png')
  let greenPath = `require('../assets/GreenJellyBean.png')`

  const [red, setRed] = useState(false)
  const [redscore, setRedScore] = useState('')
  const [redtarget, setRedTarget] = useState(0)
  let redimg = require('../assets/RedJellyBean.png')
  let redPath = `require('../assets/RedJellyBean.png')`

  const [yellow, setYellow] = useState(false)
  const [yellowscore, setYellowScore] = useState('')
  const [yellowtarget, setYellowTarget] = useState(0)
  let yellowimg = require('../assets/YellowJellyBean.png')
  let yellowPath = `require('../assets/YellowJellyBean.png')`

  const [pink, setPink] = useState(false)
  const [pinkscore, setPinkScore] = useState('')
  const [pinktarget, setPinkTarget] = useState(0)
  let pinkimg = require('../assets/PinkJellyBean.png')
  let pinkPath = `require('../assets/PinkJellyBean.png')`

  const [c1, setC1] = useState(false)
  const [c1score, setC1Score] = useState('')
  const [c1target, setC1Target] = useState(0)
  const [imagePath, setImagePath] = useState(null);

  const [c2, setC2] = useState(false)
  const [c2score, setC2Score] = useState('')
  const [c2target, setC2Target] = useState(0)
  const [imagePath2, setImagePath2] = useState(null);

  const [c3, setC3] = useState(false)
  const [c3score, setC3Score] = useState('')
  const [c3target, setC3Target] = useState(0)
  const [imagePath3, setImagePath3] = useState(null);

  const [name, setName] = useState('')
  const [moves, setMoves] = useState('')

  const Createlevel = () => {
    let db = sqlite.openDatabase({ name: 'demo.db' });
    db.transaction(function (t) {
      t.executeSql(
        'insert into Customlevel( l_name,moves,rows,columns) values (?,?,?,?)',
        [name, moves, 6, 6],
        (tx, resultSet) => {
          console.log(JSON.stringify(resultSet));
          alert('data saved!!');
        },
        e => {
          alert(JSON.stringify(e));
          console.log(JSON.stringify(e));
        },
      );
    });
    if (blue) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into CustomCandy( l_name,Score,C_name,C_candy_path) values (?,?,?,?)',
          [name, bluescore, 'ORANGE', bluePath],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
            //alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
    if (bluetarget > 0) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into TargetCandy( l_name,t_name,t_candy_path,target,score) values (?,?,?,?,?)',
          [name, 'ORANGE', bluePath, bluetarget, bluescore],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
            //alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
    if (green) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into CustomCandy( l_name,Score,C_name,C_candy_path) values (?,?,?,?)',
          [name, greenscore, 'GREEN', greenPath],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
            //alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
    if (greentarget > 0) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into TargetCandy( l_name,t_name,t_candy_path,target,score) values (?,?,?,?,?)',
          [name, 'GREEN', greenPath, greentarget, greenscore],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
            //alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });

    }
    if (red) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into CustomCandy( l_name,Score,C_name,C_candy_path) values (?,?,?,?)',
          [name, redscore, 'RED', redPath],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
            //alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
    if (redtarget > 0) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into TargetCandy( l_name,t_name,t_candy_path,target,score) values (?,?,?,?,?)',
          [name, 'RED', redPath, redtarget, redscore],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
           // alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
    if (yellow) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into CustomCandy( l_name,Score,C_name,C_candy_path) values (?,?,?,?)',
          [name, yellowscore, 'YELLOW', yellowPath],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
            //alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
    if (yellowtarget > 0) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into TargetCandy( l_name,t_name,t_candy_path,target,score) values (?,?,?,?,?)',
          [name, 'YELLOW', yellowPath, yellowtarget, yellowscore],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
           // alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
    if (pink) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into CustomCandy( l_name,Score,C_name,C_candy_path) values (?,?,?,?)',
          [name, pinkscore, 'PINK', pinkPath],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
            //alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
    if (pinktarget > 0) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into TargetCandy( l_name,t_name,t_candy_path,target,score) values (?,?,?,?,?)',
          [name, 'PINK', pinkPath, pinktarget, pinkscore],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
            //alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
    if (c1) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into CustomCandy( l_name,Score,C_name,C_candy_path) values (?,?,?,?)',
          [name, c1score, 'C1', imagePath],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
            //alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
    if (c1target > 0) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into TargetCandy( l_name,t_name,t_candy_path,target,score) values (?,?,?,?,?)',
          [name, 'C1', imagePath, c1target, c1score],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
            //alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
    if (c2) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into CustomCandy( l_name,Score,C_name,C_candy_path) values (?,?,?,?)',
          [name, c2score, 'C2', imagePath2],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
            //alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
    if (c2target > 0) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into TargetCandy( l_name,t_name,t_candy_path,target,score) values (?,?,?,?,?)',
          [name, 'C2', imagePath2, c2target, c2score],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
            //alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
    if (c3) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into CustomCandy( l_name,Score,C_name,C_candy_path) values (?,?,?,?)',
          [name, c3score, 'C3', imagePath3],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
            //alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
    if (c3target > 0) {
      let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(function (t) {
        t.executeSql(
          'insert into TargetCandy( l_name,t_name,t_candy_path,target,score) values (?,?,?,?,?)',
          [name, 'C3', imagePath3, c3target, c3score],
          (tx, resultSet) => {
            console.log(JSON.stringify(resultSet));
            //alert('data saved!!');
          },
          e => {
            alert(JSON.stringify(e));
            console.log(JSON.stringify(e));
          },
        );
      });
    }
  }
  
  const getImageGallery = () => {
    let options = { 'mediaType': 'photo' };
   launchImageLibrary(options, response => {
   if(imagePath==null){
    setImagePath(response.assets[0].uri);
    setC1(true)
   }
   else if(imagePath2==null){
    setImagePath2(response.assets[0].uri);
    setC2(true)
  }
   else {
    setImagePath3(response.assets[0].uri);
    setC3(true)
  }
   //console.log(response.assets[0].uri);
   
   }); 
  }
  
  return (
    <ImageBackground source={require('../assets/CloudsBackground.png')} style={styles.ImageBackground} >
      <View style={styles.v1} >
        <ScrollView>
          <Text style={styles.t1}>Create level</Text>
          <Pressable onPress={() => setBlue(!blue)} style={styles.press}>
            <Pressable style={blue ? styles.colorcheck : styles.check} />
            <Image source={blueimg} style={styles.img} />
            <Text style={{ fontSize: responsiveFontSize(3), color: 'black' }}>Score</Text>
            <TextInput style={styles.input} onChangeText={setBlueScore} value={bluescore} keyboardType='numeric' />
          </Pressable>
          <Pressable onPress={() => setGreen(!green)} style={styles.press}>
            <Pressable style={green ? styles.colorcheck : styles.check} />
            <Image source={greenimg} style={styles.img} />
            <Text style={{ fontSize: responsiveFontSize(3), color: 'black' }}>Score</Text>
            <TextInput style={styles.input} onChangeText={setGreenScore} value={greenscore} keyboardType='numeric' />
          </Pressable>
          <Pressable onPress={() => setRed(!red)} style={styles.press}>
            <Pressable style={red ? styles.colorcheck : styles.check} />
            <Image source={redimg} style={styles.img} />
            <Text style={{ fontSize: responsiveFontSize(3), color: 'black' }}>Score</Text>
            <TextInput style={styles.input} onChangeText={setRedScore} value={redscore} keyboardType='numeric' />
          </Pressable>
          <Pressable onPress={() => setYellow(!yellow)} style={styles.press}>
            <Pressable style={yellow ? styles.colorcheck : styles.check} />
            <Image source={yellowimg} style={styles.img} />
            <Text style={{ fontSize: responsiveFontSize(3), color: 'black' }}>Score</Text>
            <TextInput style={styles.input} onChangeText={setYellowScore} value={yellowscore} keyboardType='numeric' />
          </Pressable>
          <Pressable onPress={() => setPink(!pink)} style={styles.press}>
            <Pressable style={pink ? styles.colorcheck : styles.check} />
            <Image source={pinkimg} style={styles.img} />
            <Text style={{ fontSize: responsiveFontSize(3), color: 'black' }}>Score</Text>
            <TextInput style={styles.input} onChangeText={setPinkScore} value={pinkscore} keyboardType='numeric' />
          </Pressable>
          {c1 ?<Pressable onPress={() => setC1(!c1)} style={styles.press}>
            <Pressable style={c1 ? styles.colorcheck : styles.check} />
            <Image source={{uri:imagePath}} style={styles.img} />
            <Text style={{ fontSize: responsiveFontSize(3), color: 'black' }}>Score</Text>
            <TextInput style={styles.input} onChangeText={setC1Score} value={c1score} keyboardType='numeric' />
          </Pressable>:null}
          {c2 ?<Pressable onPress={() => setC2(!c2)} style={styles.press}>
            <Pressable style={c2 ? styles.colorcheck : styles.check} />
            <Image source={{uri:imagePath2}} style={styles.img} />
            <Text style={{ fontSize: responsiveFontSize(3), color: 'black' }}>Score</Text>
            <TextInput style={styles.input} onChangeText={setC2Score} value={c2score} keyboardType='numeric' />
          </Pressable>:null}
          {c3 ?<Pressable onPress={() => setC3(!c3)} style={styles.press}>
            <Pressable style={c3 ? styles.colorcheck : styles.check} />
            <Image source={{uri:imagePath3}} style={styles.img} />
            <Text style={{ fontSize: responsiveFontSize(3), color: 'black' }}>Score</Text>
            <TextInput style={styles.input} onChangeText={setC3Score} value={c3score} keyboardType='numeric' />
          </Pressable>:null}
          <Pressable style={[styles.press,{backgroundColor: '#C5CACB',width:'40%',borderRadius:30}]} onPress={getImageGallery}>
               <Text style={{ fontSize: responsiveFontSize(2.5), color: 'black',padding:2 }}>Add Candy</Text>
          </Pressable>
          <View style={styles.v2}>
            <Text style={{ fontSize: responsiveFontSize(3.5), color: 'black' }}>Name</Text>
            <TextInput style={styles.input1} onChangeText={setName} value={name} />
          </View>
          <View style={[styles.v2, { columnGap: 52 }]}>
            <Text style={{ fontSize: responsiveFontSize(3.5), color: 'black' }}>Moves</Text>
            <TextInput style={styles.input1} onChangeText={setMoves} value={moves} keyboardType='numeric' />
          </View>
          <Text style={[styles.t1, { marginVertical: 10 }]}>Target</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 5 }}>
            {
              blue ?
                <View style={{ flexDirection: 'row', gap: 5, marginHorizontal: responsiveWidth(5) }}>
                  <Image source={blueimg} style={styles.img} />
                  <TextInput style={styles.input} onChangeText={setBlueTarget} value={bluetarget} keyboardType='numeric' />
                </View>
                : null
            }
            {
              green ?
                <View style={{ flexDirection: 'row', gap: 5, marginHorizontal: responsiveWidth(5) }}>
                  <Image source={greenimg} style={styles.img} />
                  <TextInput style={styles.input} onChangeText={setGreenTarget} value={greentarget} keyboardType='numeric' />
                </View>
                : null
            }
            {
              red ?
                <View style={{ flexDirection: 'row', gap: 5, marginHorizontal: responsiveWidth(5) }}>
                  <Image source={redimg} style={styles.img} />
                  <TextInput style={styles.input} onChangeText={setRedTarget} value={redtarget} keyboardType='numeric' />
                </View>
                : null
            }
            {
              yellow ?
                <View style={{ flexDirection: 'row', gap: 5, marginHorizontal: responsiveWidth(5) }}>
                  <Image source={yellowimg} style={styles.img} />
                  <TextInput style={styles.input} onChangeText={setYellowTarget} value={yellowtarget} keyboardType='numeric' />
                </View>
                : null
            }
            {
              pink ?
                <View style={{ flexDirection: 'row', columnGap: 5, marginHorizontal: responsiveWidth(5) }}>
                  <Image source={pinkimg} style={styles.img} />
                  <TextInput style={styles.input} onChangeText={setPinkTarget} value={pinktarget} keyboardType='numeric' />
                </View>
                : null
            }
            {
              c1 ?
                <View style={{ flexDirection: 'row', gap: 5, marginHorizontal: responsiveWidth(5) }}>
                  <Image source={{uri:imagePath}} style={styles.img} />
                  <TextInput style={styles.input} onChangeText={setC1Target} value={c1target} keyboardType='numeric' />
                </View>
                : null
            }
            {
              c2 ?
                <View style={{ flexDirection: 'row', gap: 5, marginHorizontal: responsiveWidth(5) }}>
                  <Image source={{uri:imagePath2}} style={styles.img} />
                  <TextInput style={styles.input} onChangeText={setC2Target} value={c2target} keyboardType='numeric' />
                </View>
                : null
            }
            {
              c3 ?
                <View style={{ flexDirection: 'row', gap: 5, marginHorizontal: responsiveWidth(5) }}>
                  <Image source={{uri:imagePath3}} style={styles.img} />
                  <TextInput style={styles.input} onChangeText={setC3Target} value={c3target} keyboardType='numeric' />
                </View>
                : null
            }
          </View>
          <Pressable style={styles.press1} onPress={Createlevel} >
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '600' }}>Create</Text>
          </Pressable>
        </ScrollView>
      </View>

    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  ImageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  v1: {
    borderWidth: 4,
    width: '80%',
    height: '75%',
    borderRadius: responsiveWidth(7),
    borderColor: '#7E25D7',
    backgroundColor: '#02A4ED',
    // alignItems:'center',
    paddingVertical: responsiveHeight(1)
  },
  t1: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: '600',
    color: 'black',
    alignSelf: 'center',
  },
  check: {
    borderWidth: 1,
    width: responsiveWidth(6),
    height: responsiveHeight(3),
    backgroundColor: 'white',
  },
  colorcheck: {
    borderWidth: 1,
    width: responsiveWidth(6),
    height: responsiveHeight(3),
    backgroundColor: '#C5CACB',
  },
  img: {
    width: 30,
    height: 30
  },
  press: {
    flexDirection: 'row',
    columnGap: 15,
    marginLeft: responsiveWidth(5),
    alignItems: 'center',
    marginVertical: responsiveHeight(0.5)
  },
  input: {
    borderWidth: 1,
    height: responsiveHeight(5),
    width: responsiveWidth(13),
    color: 'white',
  },
  input1: {
    borderWidth: 1,
    height: responsiveHeight(5),
    width: responsiveWidth(20),
  },
  v2: {
    flexDirection: 'row',
    columnGap: 60,
    marginHorizontal: responsiveWidth(5),
    alignItems: 'center',
    marginTop: responsiveHeight(1)
  },
  press1: {
    backgroundColor: '#7E25D7',
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    padding: 5,
    margin: 5,
  },
})
export default Createlevel