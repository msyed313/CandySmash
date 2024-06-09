import {View, Text, Button} from 'react-native';
import React from 'react';
import sqlite from 'react-native-sqlite-storage';
const Sqlite = () => {
  const l_name=1
  const addNewColumn = () => {
    let db = sqlite.openDatabase({ name: 'demo.db' });
    db.transaction(tx => {
      tx.executeSql(
        'ALTER TABLE Gamelevels ADD COLUMN Status TEXT',
        [],
        (tx, results) => {
          console.log('Column added successfully');
          alert('Column added successfully');
        },
        error => {
          console.log('Error adding column', error);
          alert('Error adding column');
        }
      );
    });
  };
  const deleteCandy = () => {
    let db = sqlite.openDatabase({ name: 'demo.db' });
      db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Customlevel',
        [],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert('Record deleted successfully');
          } else {
            alert('No record found with the given name');
          }
        },
        error => {
          console.log('Error', error);
          alert('Error deleting record');
        }
      );
    });
  };
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
        `update Gamelevels set Status =? Where l_id=3`,
        ['unlock'],
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
        'create table if not exists Customlevel(l_id INTEGER PRIMARY KEY, l_name TEXT,moves INTEGER,rows INTEGER,columns INTEGER)',
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
        'insert into Customlevel( l_name,moves,rows,columns) values (?,?,?,?)',
        ['lvl1', 27,6,6],
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
        'create table if not exists CustomCandy(C_id INTEGER PRIMARY KEY, l_name TEXT,Score INTEGER,C_name TEXT,C_candy_path TEXT)',
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
        'insert into CustomCandy( l_name,Score,C_name,C_candy_path) values (?,?,?,?)',
        ['lvl1', 8, 'GREEN', '../assets/GreenJellyBean.ng'],
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
  async function updateCustomCandy() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
      t.executeSql(
        `update CustomCandy set C_candy_path =? where C_id=4`,
        [`require('../assets/GreenJellyBean.png')`],
        (tx, resultSet) => {
          console.log(JSON.stringify(resultSet));
        },
        e => {
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
        'create table if not exists TargetCandy(t_id INTEGER PRIMARY KEY, l_name TEXT,t_name TEXT,t_candy_path TEXT,target INTEGER,score INTEGER)',
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
        'insert into TargetCandy( l_name,t_name,t_candy_path,target,score) values (?,?,?,?,?)',
        ['lvl1', 'RED', '../assets/RedJellyBean.png', 11,5],
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
  async function updateTargetCandy() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
      t.executeSql(
        `update TargetCandy set t_candy_path =? where l_name='lvl1'`,
        [`require('../assets/RedJellyBean.png')`],
        (tx, resultSet) => {
          console.log(JSON.stringify(resultSet));
        },
        e => {
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
  async function getoneData() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t) {
      t.executeSql(
        'select * from Gamelevels where l_name=?',
        [l_name],
        (tx, resultSet) => {
          // console.log('get All Data');
          const paths = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            paths.push(results.rows.item(i).t_candy_path);
            console.log(l_name)
            console.log(results.rows.item(i).t_candy_path)
          }
          },
        (e) => {
          console.log(JSON.stringify(e));
        },
      );
    });
  }
  return (
    <View style={{padding: 10, gap: 10}}>
      <Button title="Add Column" onPress={addNewColumn} />
      <Button title="Delete" onPress={deleteCandy} />
      <Button title="Create Table" onPress={createTable} />
      <Button title="get" onPress={getAllData} />
      <Button title="Save Data" onPress={saveData} />
      <Button title="Update  Data" onPress={updateData} />
       <Button title='one data' onPress={getoneData} />
      <Button title="Create Custom Table" onPress={createcustomTable} />
      <Button title="custom level" onPress={Customlevels} />
      <Button title="get custom level" onPress={getcustomlevel} />
      <Button title="create custom candy" onPress={CustomCandy} />
      <Button title="save custom candy" onPress={savecustomCandy} />
      <Button title="get custom candy" onPress={getcustomcandy} />
      <Button title="create target candy" onPress={TargetCandy} />
      <Button title="save target candy" onPress={savetargetCandy} />
      <Button title="get target candy" onPress={gettargetcandy} />
      <Button title='update target candy' onPress={updateTargetCandy}/>
      <Button title='update custom candy' onPress={updateCustomCandy}/>
    </View>
  );
};

export default Sqlite;
