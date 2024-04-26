import {View, Text, Button} from 'react-native';
import React from 'react';
import sqlite from 'react-native-sqlite-storage';
const Sqlite = () => {
  async function createTable() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
      t.executeSql(
        'create table if not exists Gamelevels(l_id INTEGER PRIMARY KEY, l_name INTEGER,moves INTEGER,t_count INTEGER,score INTEGER,t_candy TEXT,rows INTEGER,column INTEGER,t_candy_path TEXT)',
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
        'insert into Gamelevels( l_name,moves,t_count,t_candy,rows,column,t_candy_path) values (?,?,?,?,?,?,?)',
        [10, 37, 25, 'ORANGE_BEAN', 6, 8, '../assets/OrangeJellyBean.png'],
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
          for (let i = 0; i < resultSet.rows.length; i++) {
            console.log(resultSet.rows.item(i));
            console.log(resultSet.rows.item(i).t_candy_path);
          }
          console.log(JSON.stringify(resultSet));
          alert('get All Data');
        },
        e => {
          alert(JSON.stringify(e));
          console.log(JSON.stringify(e));
        },
      );
    });
  }
  async function updateData() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
      t.executeSql(
        `update Gamelevels set l_name =? where l_id=7`,
        [7],
        (tx, resultSet) => {
          console.log(JSON.stringify(resultSet));
        },
        e => {
          console.log(JSON.stringify(e));
        },
      );
    });
  }

  async function createcustomTable() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
      t.executeSql(
        'create table if not exists Customlevel(l_id INTEGER PRIMARY KEY, l_name TEXT,moves INTEGER)',
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

  async function Customlevels() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
      t.executeSql(
        'insert into Customlevel( l_name,moves) values (?,?)',
        ['lvl1', 27],
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
  async function getcustomlevel() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
      t.executeSql(
        'select * from Customlevel',
        [],
        (tx, resultSet) => {
          for (let i = 0; i < resultSet.rows.length; i++) {
            console.log(resultSet.rows.item(i));
          }
          console.log(JSON.stringify(resultSet));
          alert('get All Data');
        },
        e => {
          alert(JSON.stringify(e));
          console.log(JSON.stringify(e));
        },
      );
    });
  }

  async function CustomCandy() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
      t.executeSql(
        'create table if not exists CustomCandy(C_id INTEGER PRIMARY KEY, l_name TEXT,Score INTEGER,C_name TEXT,C_candy_path TEXT,t_name TEXT)',
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

  async function savecustomCandy() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
      t.executeSql(
        'insert into CustomCandy( l_name,Score,C_name,C_candy_path,t_name) values (?,?,?,?,?)',
        ['lvl1', 7, 'first.jpeg', '../assets/first.jpeg', 'cc1'],
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
  async function getcustomcandy() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
      t.executeSql(
        'select * from CustomCandy',
        [],
        (tx, resultSet) => {
          for (let i = 0; i < resultSet.rows.length; i++) {
            console.log(resultSet.rows.item(i));
          }
          console.log(JSON.stringify(resultSet));
          alert('get All Data');
        },
        e => {
          alert(JSON.stringify(e));
          console.log(JSON.stringify(e));
        },
      );
    });
  }

  async function TargetCandy() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
      t.executeSql(
        'create table if not exists TargetCandy(t_id INTEGER PRIMARY KEY, l_name TEXT,C_name TEXT,t_candy_path TEXT,t_name TEXT,target INTEGER,B_name TEXT)',
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

  async function savetargetCandy() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
      t.executeSql(
        'insert into TargetCandy( l_name,C_name,t_candy_path,t_name,target,B_name) values (?,?,?,?,?,?)',
        ['lvl1', 'first.jpeg', '../assets/first.jpeg', 'cc1', 11, 'FIRST_BEAN'],
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
  async function gettargetcandy() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
      t.executeSql(
        'select * from TargetCandy',
        [],
        (tx, resultSet) => {
          for (let i = 0; i < resultSet.rows.length; i++) {
            console.log(resultSet.rows.item(i));
          }
          console.log(JSON.stringify(resultSet));
          alert('get All Data');
        },
        e => {
          alert(JSON.stringify(e));
          console.log(JSON.stringify(e));
        },
      );
    });
  }
  return (
    <View style={{padding: 10, gap: 10}}>
      <Button title="Create Table" onPress={createTable} />
      <Button title="get" onPress={getAllData} />
      <Button title="Save Data" onPress={saveData} />
      <Button title="Update  Data" onPress={updateData} />

      <Button title="Create Custom Table" onPress={createcustomTable} />
      <Button title="custom level" onPress={Customlevels} />
      <Button title="get custom level" onPress={getcustomlevel} />
      <Button title="create custom candy" onPress={CustomCandy} />
      <Button title="save custom candy" onPress={savecustomCandy} />
      <Button title="get custom candy" onPress={getcustomcandy} />
      <Button title="create target candy" onPress={TargetCandy} />
      <Button title="save target candy" onPress={savetargetCandy} />
      <Button title="get target candy" onPress={gettargetcandy} />
    </View>
  );
};

export default Sqlite;
