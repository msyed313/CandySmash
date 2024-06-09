import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Dimensions, Animated, LayoutChangeEvent, View, Text, Easing, PanResponderGestureState, SafeAreaView, ImageBackground, Image, Modal, Pressable, Button, registerCallableModule } from 'react-native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import { getRandomInt, getAllMatches, markAsMatch, condenseColumns, findMoves, sleep } from '../lib/GridApi'
import { TileData, TileDataType } from '../lib/TileData'
import Tile from './Tile'
import sqlite from 'react-native-sqlite-storage'
import { responsiveFontSize } from 'react-native-responsive-dimensions'


export let ROW = 6;
export let COLUMN = 7;
export const colors = {};
export const beanObjects = {}; // Object to store dynamically generated bean objects
export const BEAN_OBJS = []
export const BEANS_OBJS = []
export const color = {}
export const beansobjects = {}
let justClouds = require('../assets/CloudsBackground.png')
// Beans

const Screen = ({ navigation, route }) => {
  const [imagePath, setImagePath] = useState(null)
  const [localPath, setLocalPath] = useState(null)
  const [imagePath1, setImagePath1] = useState(null)
  const [localPath1, setLocalPath1] = useState(null)
  const [imagePath2, setImagePath2] = useState(null)
  const [localPath2, setLocalPath2] = useState()
  const l_name = route.params;
  let rows;
  let columns;
  let bean = []
  const [tscore, setTScore] = useState();
  const [t1score, setT1Score] = useState();
  const [t2score, setT2Score] = useState();
  const [tname, setTName] = useState();
  const [t1name, setT1Name] = useState();
  const [t2name, setT2Name] = useState();
  const [tileDataSource, setTileDataSource] = useState(initializeDataSource())
  const [blockScreen, setBlockScreen] = useState('')
  const gridOrigin = useRef([0, 0])
  let invalidSwap = false
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState()
  const config = { velocityThreshold: 0.3, directionalOffsetThreshold: 50 }
  const[availtarget,setAvailTarget]=useState(false)
  const [target, setTarget] = useState()
  const[availtarget1,setAvailTarget1]=useState(false)
  const [target1, setTarget1] = useState()
  const[availtarget2,setAvailTarget2]=useState(false)
  const [target2, setTarget2] = useState()
  const [movesModal, setMovesModal] = useState(false);
  const [targetModal, setTargetModal] = useState(false);
  async function getData() {
    let db = await sqlite.openDatabase({ name: 'demo.db' });
    db.transaction(function (t) {
      t.executeSql(
        'select * from Customlevel where l_name=?',
        [l_name.l_name],
        (tx, resultSet) => {
          // console.log('get All Data');
          for (let i = 0; i < resultSet.rows.length; i++) {
            // totallevels.push(resultSet.rows.item(i))
            setMoves(resultSet.rows.item(i).moves);
          }
        },
        (e) => {
          console.log(JSON.stringify(e));
        },
      );
    });
  }
 
  async function getcustomcandy() {
    let db = await sqlite.openDatabase({ name: 'demo.db' });
    db.transaction(function (t) {
      t.executeSql(
        'select * from CustomCandy where l_name=?',
        [l_name.l_name],
        (tx, resultSet) => {
          for (let i = 0; i < resultSet.rows.length; i++) {
            // bean.push(resultSet.rows.item(i))
            bean.push(resultSet.rows.item(i))
            // console.log(resultSet.rows.item(i));
          }
          console.log(bean);
           bean.forEach((item, index) => {
            let C_name_BEAN;
            switch (item.C_name) {
              case 'GREEN':
                C_name_BEAN = require('../assets/GreenJellyBean.png');
                break;
              case 'ORANGE':
                C_name_BEAN = require('../assets/OrangeJellyBean.png');
                break;
              case 'RED':
                C_name_BEAN = require('../assets/RedJellyBean.png');
                break;
              case 'YELLOW':
                C_name_BEAN = require('../assets/YellowJellyBean.png');
                break;
              case 'PINK':
                C_name_BEAN = require('../assets/PinkJellyBean.png');
                break;
              case 'C1':
                C_name_BEAN = {uri: item.C_candy_path};
                break;
              case 'C2':
                C_name_BEAN = {uri: item.C_candy_path};
                break;
              case 'C3':
                C_name_BEAN = {uri: item.C_candy_path};
                break;
              default:
                C_name_BEAN = {uri: item.C_candy_path};
                break;
            }

            if (C_name_BEAN) {
              color[item.C_name] = 0;
              const beanKey = `${item.C_name}_BEAN_OBJ`;
              beansobjects[beanKey] = {
              image: C_name_BEAN,
              color: 0,
              score: item.Score
              };
              BEANS_OBJS.push(beansobjects[beanKey]);
            }
          });
          //console.log(BEANS_OBJS);
        },
        e => {
          alert(JSON.stringify(e));
          console.log(JSON.stringify(e));
        },
      );
    });
  }
  async function gettargetcandy() {
    let db = await sqlite.openDatabase({ name: 'demo.db' });
    db.transaction(function (t) {
      t.executeSql(
        'select * from TargetCandy where l_name=?',
        [l_name.l_name],
        (tx, resultSet) => {
              for (let i = 0; i < resultSet.rows.length; i++) {
               if(!availtarget){
                  setTarget(resultSet.rows.item(i).target)
                  setTScore(resultSet.rows.item(i).score)
                  if(resultSet.rows.item(i).t_name == 'BLUE'){
                    setLocalPath(require(`../assets/BlueJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'RED'){
                    setLocalPath(require(`../assets/RedJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'PINK'){
                    setLocalPath(require(`../assets/PinkJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'ORANGE'){
                    setLocalPath(require(`../assets/OrangeJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'GREEN'){
                    setLocalPath(require(`../assets/GreenJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'YELLOW'){
                    setLocalPath(require(`../assets/YellowJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'C1'){
                    setImagePath(resultSet.rows.item(i).t_candy_path)
                  }
                  if(resultSet.rows.item(i).t_name == 'C2'){
                    setImagePath(resultSet.rows.item(i).t_candy_path)
                  }
                  if(resultSet.rows.item(i).t_name == 'C3'){
                    setImagePath(resultSet.rows.item(i).t_candy_path)
                  }
                  setAvailTarget(!availtarget)
                  console.log(availtarget);
                }
              else if(!availtarget1){
                  setTarget1(resultSet.rows.item(i).target)
                  setT1Score(resultSet.rows.item(i).score)
                  if(resultSet.rows.item(i).t_name == 'BLUE'){
                    setLocalPath1(require(`../assets/BlueJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'RED'){
                    setLocalPath1(require(`../assets/RedJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'PINK'){
                    setLocalPath1(require(`../assets/PinkJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'ORANGE'){
                    setLocalPath1(require(`../assets/OrangeJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'GREEN'){
                    setLocalPath1(require(`../assets/GreenJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'YELLOW'){
                    setLocalPath1(require(`../assets/YellowJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'C1'){
                    setImagePath1(resultSet.rows.item(i).t_candy_path)
                  }
                  if(resultSet.rows.item(i).t_name == 'C2'){
                    setImagePath1(resultSet.rows.item(i).t_candy_path)
                  }
                  if(resultSet.rows.item(i).t_name == 'C3'){
                    setImagePath1(resultSet.rows.item(i).t_candy_path)
                  }
                  setAvailTarget1(true)
                }
                else {
                  setTarget2(resultSet.rows.item(i).target)
                  setT2Score(resultSet.rows.item(i).score)
                  if(resultSet.rows.item(i).t_name == 'BLUE'){
                  setLocalPath2(require(`../assets/BlueJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'RED'){
                  setLocalPath2(require(`../assets/RedJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'PINK'){
                  setLocalPath2(require(`../assets/PinkJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'ORANGE'){
                  setLocalPath2(require(`../assets/OrangeJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'GREEN'){
                  setLocalPath2(require(`../assets/GreenJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'YELLOW'){
                  setLocalPath2(require(`../assets/YellowJellyBean.png`))
                  }
                  if(resultSet.rows.item(i).t_name == 'C1'){
                    setImagePath2(resultSet.rows.item(i).t_candy_path)
                  }
                  if(resultSet.rows.item(i).t_name == 'C2'){
                    setImagePath2(resultSet.rows.item(i).t_candy_path)
                  }
                  if(resultSet.rows.item(i).t_name == 'C3'){
                    setImagePath2(resultSet.rows.item(i).t_candy_path)
                  }
                  setAvailTarget2(true)
                }
              
            }
        },
        e => {
          alert(JSON.stringify(e));
          console.log(JSON.stringify(e));
        },
      );
    });
  } 
  useEffect(() => {
    getData();
    gettargetcandy();
    getcustomcandy();
  }, [])
  useEffect(() => {
    if (moves == 0) {
      setMovesModal(true)
    }
    else {
      if (target <= 0) {
        //console.log('Target completed!')
        setTargetModal(true)
      }
      else {
        ; (async function () {
          await sleep(300)
          animateValuesToLocations()
          await sleep(300)
          const nextMatches = getAllMatches(tileDataSource)
          if (nextMatches.length > 0) {
            processMatches(nextMatches)
          } else {
            if (!findMoves(tileDataSource)) {
              await sleep(500)
              console.error('Since there are no more tiles to move, swapping any tile will reset the game.')
            }
          }
        })()
      }
    }
  }, [tileDataSource])

  useEffect(() => {
    if (!!blockScreen.length) {
      setTileDataSource(initializeDataSource())
    }
  }, [blockScreen])

  const animateValuesToLocations = () => {
    tileDataSource.forEach((row, i) => {
      row.forEach((elem, j) => {
        Animated.timing(elem.location, {
          toValue: { x: TILE_WIDTH * i, y: TILE_WIDTH * j },
          duration: 400,
          useNativeDriver: true,
          easing: Easing.bezier(0.85, 0, 0.15, 1),
        }).start(() => {
          if (!!blockScreen.length) {
             setBlockScreen('')
          }
        })
      })
    })
  }

  const onLayout = (event) => {
    gridOrigin.current = [event.nativeEvent.layout.x, event.nativeEvent.layout.y]
  }

  const renderTiles = (tileData) => {
    const tiles = tileData.map(row => row.map(e => <Tile location={e.location} scale={e.scale} key={e.key} img={e.imgObj?.image} />))

    return tiles
  }

  const onSwipe = (gestureName, gestureState) => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    let initialGestureX = gestureState.x0
    let initialGestureY = gestureState.y0

    let i = Math.round((initialGestureX - gridOrigin.current[0] - 0.5 * TILE_WIDTH) / TILE_WIDTH)
    let j = Math.round((initialGestureY - gridOrigin.current[1] - 0.5 * TILE_WIDTH) / TILE_WIDTH)

    if (i > -1 && j > -1 && i < ROW && j < COLUMN) {
      switch (gestureName) {
        case SWIPE_UP:
          if (j > 0) swap(i, j, 0, -1)
          break
        case SWIPE_DOWN:
          if (j < COLUMN - 1) swap(i, j, 0, 1)
          break
        case SWIPE_LEFT:
          if (i > 0) swap(i, j, -1, 0)
          break
        case SWIPE_RIGHT:
          if (i < ROW - 1) swap(i, j, 1, 0)
          break
      }

    }
  }

  const swap = (i, j, dx, dy) => {

    const swapStarter = tileDataSource[i][j]
    const swapEnder = tileDataSource[i + dx][j + dy]
    tileDataSource[i][j] = swapEnder
    tileDataSource[i + dx][j + dy] = swapStarter

    const animateSwap = Animated.parallel([
      Animated.timing(swapStarter.location, {
        toValue: { x: TILE_WIDTH * (i + dx), y: TILE_WIDTH * (j + dy) },
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(swapEnder.location, {
        toValue: { x: TILE_WIDTH * i, y: TILE_WIDTH * j },
        duration: 200,
        useNativeDriver: true,
      }),
    ])

    animateSwap.start(() => {
      let allMatches = getAllMatches(tileDataSource)

      if (allMatches.length !== 0) {
        setMoves(moves - 1)
        processMatches(allMatches)
      } else {
        if (invalidSwap) {
          invalidSwap = false
          if (!findMoves(tileDataSource)) {
            setBlockScreen('========== There are no more tiles that can move. ==========')
          }
          return
        }
        invalidSwap = true
        swap(i, j, dx, dy)
      }
    })

  }
  const processMatches = (matches) => {
    //console.log(matches)
    let smashedbean = [];
    //let scorebean=[]
    let scores;
    matches.forEach(match => {
      match.forEach(coordinates => {
        const i = coordinates[0]
        const j = coordinates[1]
        const bean = tileDataSource[i][j].imgObj
        //getting score of smashed bean 
        // scorebean.push(bean)
        smashedbean.push(bean)
        scores = bean?.score
        console.log(bean);
     })
    })
    if (smashedbean.length > 0) {
      setScore(score => score + smashedbean.length * scores)
      if (scores == tscore)
        setTarget(prevCandyBlast => prevCandyBlast - smashedbean.length)
      if (scores == t1score)
        setTarget1(prevCandyBlast => prevCandyBlast - smashedbean.length)
      if (scores == t2score)
        setTarget2(prevCandyBlast => prevCandyBlast - smashedbean.length)
    }
    setTileDataSource(state => {
      let newTileDataSource = state.slice()
      markAsMatch(matches, newTileDataSource)
      condenseColumns(newTileDataSource)

      recolorMatches(newTileDataSource)
      return newTileDataSource

    })

  }

  const recolorMatches = (tileData) => {
    tileData.forEach(row => {
      row.forEach(e => {
        if (e.markedAsMatch === true) {
          let randIndex = getRandomInt(7)
          let randomBeanObj = BEANS_OBJS[randIndex]
          e.markedAsMatch = false
          e.imgObj = randomBeanObj

        }
      })
    })
  }

  return (
    <ImageBackground source={justClouds} style={styles.backGroundImage}>
      <SafeAreaView style={styles.scoreBoard}>
        {/*<Text>{JSON.stringify(l_name)}</Text>*/}
        <View style={styles.scoreElement}>
          <Text style={{ fontSize: responsiveFontSize(2.5) }}>Score</Text>
          <Text style={{ fontSize: responsiveFontSize(2.2) }}>{score}</Text>
        </View>
        <View style={[styles.scoreElement, { flexDirection: 'row' }]}>
          {availtarget ? <><Text style={{ fontSize: responsiveFontSize(2.5) }}>{target}</Text>
            {imagePath ? (
              <Image source={{uri:imagePath}} style={styles.img} />
              ) : (
              <Image source={localPath} style={styles.img} />
            )}</>
            : null}
          {availtarget1 ? <><Text style={{ fontSize: responsiveFontSize(2.5) }}>{target1}</Text>
            {imagePath1 ? (
              <Image source={{uri:imagePath1}} style={styles.img} />
            ) : (
              <Image source={localPath1} style={styles.img} />
            )}</>
            : null}
          {availtarget2 ? <><Text style={{ fontSize: responsiveFontSize(2.5) }}>{target2}</Text>
            {imagePath2 ? (
              <Image source={{uri:imagePath2}} style={styles.img} />
            ) : (
              <Image source={localPath2} style={styles.img} />
            )}</>
            : null}

        </View>
        <View style={styles.scoreElement}>
          <Text style={{ fontSize: responsiveFontSize(2.5) }}>Moves</Text>
          <Text style={{ fontSize: responsiveFontSize(2.2) }}>{moves}</Text>
        </View>
      </SafeAreaView>
      <GestureRecognizer onLayout={onLayout} config={config} style={styles.gestureContainer} onSwipe={(direction, state) => onSwipe(direction, state)}>
        {renderTiles(tileDataSource)}
      </GestureRecognizer>
      {!!blockScreen.length && (
        <View style={styles.blindView}>
          <Text>{blockScreen}</Text>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={movesModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Out of moves</Text>
            <Pressable onPress={() => [setMovesModal(false)]} style={styles.press}>
              <Text style={styles.t}>Retry</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={targetModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your Score:{score}</Text>
            <Text style={styles.modalText}>Level completed</Text>
            <Pressable onPress={() => [setTargetModal(false), navigation.navigate('customlevels')]} style={styles.press}>
              <Text style={styles.t}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </ImageBackground>
  )
}
const beans = [
  { "C_candy_path": "../assets/OrangeJellyBean.png", "C_id": 1, "Score": 1, "l_name": "lvl1", "C_name": "ORANGE" },
  { "C_candy_path": "../assets/RedJellyBean.png", "C_id": 2, "Score": 1, "l_name": "lvl1", "C_name": "RED" },
  { "C_candy_path": "../assets/YellowJellyBean.png", "C_id": 3, "Score": 1, "l_name": "lvl1", "C_name": "YELLOW" },
]
beans.forEach((item, index) => {
  let C_name_BEAN;
  switch (item.C_name) {
    case 'GREEN':
      C_name_BEAN = require('../assets/GreenJellyBean.png');
      break;
    case 'ORANGE':
      C_name_BEAN = require('../assets/OrangeJellyBean.png');
      break;
    case 'RED':
      C_name_BEAN = require('../assets/RedJellyBean.png');
      break;
    case 'YELLOW':
      C_name_BEAN = require('../assets/YellowJellyBean.png');
      break;
    case 'PINK':
      C_name_BEAN = require('../assets/PinkJellyBean.png');
      break;
    default:
      C_name_BEAN=require('../assets/PurpleJellyBean.png')
      break;
  }

  if (C_name_BEAN) {
    colors[item.C_name] = 0;
    const beanKey = `${item.C_name}_BEAN_OBJ`;
    beanObjects[beanKey] = {
      image: C_name_BEAN,
      color: colors[item.C_name],
      score: item.Score
    };
    BEAN_OBJS.push(beanObjects[beanKey]);
  }
});
const colorkeys = Object.keys(colors)
function createKeys(numRows, numColumns) {
  let keys = [];
  let count = 0;
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numColumns; j++) {
      row.push(count);
      count++;
    }
    keys.push(row);
  }
  return keys;
}
const initializeDataSource = () => {

  let keys = createKeys(ROW, COLUMN)

  var tileData = keys.map(row => {
    let dataRows = row.map(key => {
      let int = getRandomInt(colorkeys.length)
      let randomBeanObj = BEAN_OBJS[int]
      let data = TileData(randomBeanObj, key)
      return data
    })
    return dataRows
  })

  let allMatches = getAllMatches(tileData)
  // When there are no 3 matching blocks in the initial arrangement and the next move is possible, return titleData.
  if (!allMatches.length && findMoves(tileData)) return tileData

  return initializeDataSource()
}
export default React.memo(Screen)
let Window = Dimensions.get('window')
let windowSpan = Math.min(Window.width, Window.height)
export const TILE_WIDTH = windowSpan / 6


let Windows = Dimensions.get('window')

let windowWidth = Windows.width
let windowHeight = Windows.height
let styles = StyleSheet.create({
  gestureContainer: {
    // flex: 1,
    width: '95%',
    height: '75%',
    //position: 'absolute',
    marginTop: 100,
    // backgroundColor: 'green',
  },
  backGroundImage: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blindView: {
    position: 'absolute',
    width: '95%',
    height: '75%',
    backgroundColor: 'white',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    // opacity: 0.5,
  },
  scoreElement: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  scoreBoard: {
    position: 'absolute',
    top: 0,
    flex: 3,
    flexDirection: 'row',
    width: windowWidth,
    height: windowHeight / 6,
    alignItems: 'center',
    marginTop: 15,
    // backgroundColor: red,
  },
  img: {
    width: 35,
    height: 35,
    resizeMode: 'contain'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    // margin: 20,
    backgroundColor: 'skyblue',
    padding: 10,
    //alignItems: 'center',
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
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    //borderBottomWidth: 1,
    padding: 10,
    //borderColor: 'red',
  },

  press: {
    backgroundColor: '#8e8e8e',
    width: '40%',
    padding: 5,
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'center'
  },
  t: {
    fontSize: 20,
    color: 'white'
  }
})

