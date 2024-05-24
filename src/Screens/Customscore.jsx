import { View, Text, Image, FlatList, Button } from 'react-native'
import React,{useEffect, useState} from 'react'
import sqlite from 'react-native-sqlite-storage';
const Customscore = () => {
    const [imagePaths, setImagePaths] = useState([]);
    const name=1 
    async function createTable() {
        let db = await sqlite.openDatabase({name: 'demo.db'});
        db.transaction(function (t) {
          t.executeSql(
            'create table if not exists Test(id INTEGER PRIMARY KEY,candy_path TEXT)',
            [],
            () => {
              alert('table created!');
            },
            e => {
              alert(JSON.stringify(e));
              console.log(JSON.stringify(e));
            },
          );
        });
      }
      async function saveData() {
        let db = await sqlite.openDatabase({name: 'demo.db'});
        db.transaction(function (t) {
          t.executeSql(
            'insert into Test(candy_path) values (?)',
            ['CANDYSMASH/src/assets/BlueJellyBean.png'],
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
      }
    async function getAllData() {
        let db = await sqlite.openDatabase({name: 'demo.db'});
        db.transaction(function (t) {
          t.executeSql(
            'select * from Gamelevels',
            [],
            (tx, resultSet) => {
                const paths = [];
              for (let i = 0; i < resultSet.rows.length; i++) {
               // console.log(resultSet.rows.item(i));
               // console.log(resultSet.rows.item(i).t_candy_path);
                paths.push(resultSet.rows.item(i))
                setImagePaths(paths)
              }
             // console.log(JSON.stringify(resultSet));
             // alert('get All Data');
             console.log(paths[4]);
            },
            e => {
              alert(JSON.stringify(e));
              console.log(JSON.stringify(e));
            },
          );
        });
      }
      async function getData() {
        let db = await sqlite.openDatabase({name: 'demo.db'});
        db.transaction(function (t) {
          t.executeSql(
            'select * from Test',
            [],
            (tx, resultSet) => {
                const paths = [];
              for (let i = 0; i < resultSet.rows.length; i++) {
               // console.log(resultSet.rows.item(i));
               // console.log(resultSet.rows.item(i).t_candy_path);
                paths.push(resultSet.rows.item(i))
                setImagePaths(paths)
              }
             // console.log(JSON.stringify(resultSet));
             // alert('get All Data');
             console.log(paths[4]);
            },
            e => {
              alert(JSON.stringify(e));
              console.log(JSON.stringify(e));
            },
          );
        });
      }
      useEffect(()=>{
           getData()
      },[])
  return (
    <View>
      <Button title="table" onPress={createTable} />

      <Button title="save" onPress={saveData} />
      <FlatList
        data={imagePaths}
        renderItem={({item,index})=>(
            <Text>{item.candy_path}</Text>
        )}
      />
      <FlatList
        data={imagePaths}
        renderItem={({item,index})=>(
            <Image key={index} source={{uri:item.candy_path}} style={{ width:30, height:30 }} />
        )}
      />

         

    </View>
  )
}

export default Customscore