import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, Dimensions, Animated, LayoutChangeEvent, View, Text, Easing, PanResponderGestureState, SafeAreaView, ImageBackground,Image, Modal, Pressable, Button} from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import {getRandomInt, getAllMatches, markAsMatch, condenseColumns, flattenArrayToPairs, findMoves, sleep} from '../lib/GridApi'
import { TileData,TileDataType } from '../lib/TileData'
import Tile from './Tile'
import sqlite from 'react-native-sqlite-storage'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
// react-native-swipe-gestures swipeDirections type
export enum swipeDirections {
  SWIPE_UP = 'SWIPE_UP',
  SWIPE_DOWN = 'SWIPE_DOWN',
  SWIPE_LEFT = 'SWIPE_LEFT',
  SWIPE_RIGHT = 'SWIPE_RIGHT',
}
export let ROW=6;
export let COLUMN=7;

let justClouds = require('../assets/CloudsBackground.png')
 // Beans
  const PINK_BEAN = require('../assets/PinkJellyBean.png')
  const PURPLE_BEAN = require('../assets/PurpleJellyBean.png')
  const BLUE_BEAN = require('../assets/BlueJellyBean.png')
  const ORANGE_BEAN = require('../assets/OrangeJellyBean.png')
  const GREEN_BEAN = require('../assets/GreenJellyBean.png')
  const YELLOW_BEAN = require('../assets/YellowJellyBean.png')
  const RED_BEAN = require('../assets/RedJellyBean.png')

// Colors
  const COLORS = {
  BLUE: 0,
  RED: 1,
  YELLOW: 2,
  PINK: 3,
  PURPLE: 4,
  ORANGE: 5,
  GREEN: 6,
}
const colorkeys=Object.keys(COLORS)
 const BLUE_BEAN_OBJ: ImageObjType = {
  image: BLUE_BEAN,
  color: COLORS.BLUE,
  score:5,
}
 const RED_BEAN_OBJ: ImageObjType = {
  image: RED_BEAN,
  color: COLORS.RED,
  score:7
}
 const YELLOW_BEAN_OBJ: ImageObjType = {
  image: YELLOW_BEAN,
  color: COLORS.YELLOW,
  score:10
}
 const PINK_BEAN_OBJ: ImageObjType = {
  image: PINK_BEAN,
  color: COLORS.PINK,
  score:13
}
 const PURPLE_BEAN_OBJ: ImageObjType = {
  image: PURPLE_BEAN,
  color: COLORS.PURPLE,
  score:4
}
 const ORANGE_BEAN_OBJ: ImageObjType = {
  image: ORANGE_BEAN,
  color: COLORS.ORANGE,
  score:5
}
 const GREEN_BEAN_OBJ: ImageObjType = {
  image: GREEN_BEAN,
  color: COLORS.GREEN,
  score:11
}



export const BEAN_OBJS = [PINK_BEAN_OBJ, PURPLE_BEAN_OBJ, BLUE_BEAN_OBJ, ORANGE_BEAN_OBJ, GREEN_BEAN_OBJ, YELLOW_BEAN_OBJ, RED_BEAN_OBJ]

export interface ImageObjType {
  image:any
  color: number
  score:number
}
const Secondlevel = ({navigation,route}:{navigation:any,route:any}) => {
  //ROW=6
 //COLUMN=7
 const[imagePath,setImagePath]=useState(null)
  const l_id = route.params;
  const n_id=parseInt(route.params.l_id)+1
  let rows:number;
  let columns:number;
  const [tname, setTName] = useState('');
  const [tileDataSource, setTileDataSource] = useState(initializeDataSource())
  const [blockScreen, setBlockScreen] = useState('')
  const gridOrigin = useRef([0, 0])
  let invalidSwap = false
  const [score,setScore]=useState(0)
  const [moves,setMoves]=useState(1)
  const config = {velocityThreshold: 0.3, directionalOffsetThreshold: 50}
  const[target,setTarget]=useState(1)
  const [movesModal, setMovesModal] = useState(false);
  const [targetModal, setTargetModal] = useState(false);
  async function getData() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t: any) {
      t.executeSql(
        'select * from Gamelevels where l_id=?',
        [l_id.l_id],
        (tx: any, resultSet: any) => {
          // console.log('get All Data');
          for (let i = 0; i < resultSet.rows.length; i++) {
            // totallevels.push(resultSet.rows.item(i))
            setMoves(resultSet.rows.item(i).moves);
            setTarget(resultSet.rows.item(i).t_count);
            setTName(resultSet.rows.item(i).t_candy);
            if(resultSet.rows.item(i).t_candy == 'BLUE_BEAN'){
              setImagePath(require(`../assets/BlueJellyBean.png`))
            }
            if(resultSet.rows.item(i).t_candy == 'RED_BEAN'){
              setImagePath(require(`../assets/RedJellyBean.png`))
            }
            if(resultSet.rows.item(i).t_candy == 'PINK_BEAN'){
              setImagePath(require(`../assets/PinkJellyBean.png`))
            }
            if(resultSet.rows.item(i).t_candy == 'PURPLE_BEAN'){
              setImagePath(require(`../assets/PurpleJellyBean.png`))
            }
            if(resultSet.rows.item(i).t_candy == 'ORANGE_BEAN'){
              setImagePath(require(`../assets/OrangeJellyBean.png`))
            }
            if(resultSet.rows.item(i).t_candy == 'GREEN_BEAN'){
              setImagePath(require(`../assets/GreenJellyBean.png`))
            }
            if(resultSet.rows.item(i).t_candy == 'YELLOW_BEAN'){
              setImagePath(require(`../assets/YellowJellyBean.png`))
            }
          }
          },
        (e: any) => {
          console.log(JSON.stringify(e));
        },
      );
    });
  }
  async function updateData() {
    let db = await sqlite.openDatabase({name: 'demo.db'});
    db.transaction(function (t:any) {
    t.executeSql(
    `update Gamelevels set score =? where l_id=${l_id.l_id}`,
    [score],
    (tx:any, resultSet:any) => {
    console.log(JSON.stringify(resultSet));
    },
    (e:any)=> {
    console.log(JSON.stringify(e));
    },
    );
    });
    }
  useEffect(() => {
    getData();
    
  }, []);
  useEffect(() => {
    if(moves==0){
      setMovesModal(true)
    }
    else{
    if (target <= 0) {
      //console.log('Target completed!')
      setTargetModal(true)
    }
    else{
      if(tname == 'BLUE_BEAN'){
        setImagePath(require('../assets/BlueJellyBean.png'))
      }
      console.log(imagePath)
    ;(async function () {
      await sleep(500)
      animateValuesToLocations()
      await sleep(500)
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
  }}
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
          toValue: {x: TILE_WIDTH * i, y: TILE_WIDTH * j},
          duration: 500,
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

  const onLayout = (event: LayoutChangeEvent) => {
    gridOrigin.current = [event.nativeEvent.layout.x, event.nativeEvent.layout.y]
  }

  const renderTiles = (tileData: TileDataType[][]) => {
    const tiles = tileData.map(row => row.map(e => <Tile   location={e.location} scale={e.scale} key={e.key} img={e.imgObj?.image} />))

    return tiles
  }
  
  const onSwipe = (gestureName: string, gestureState: PanResponderGestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections 
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
 
  const swap = (i: number, j: number, dx: number, dy: number) => {
    
    const swapStarter = tileDataSource[i][j]
    const swapEnder = tileDataSource[i + dx][j + dy]
    tileDataSource[i][j] = swapEnder
    tileDataSource[i + dx][j + dy] = swapStarter

    const animateSwap = Animated.parallel([
      Animated.timing(swapStarter.location, {
        toValue: {x: TILE_WIDTH * (i + dx), y: TILE_WIDTH * (j + dy)},
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(swapEnder.location, {
        toValue: {x: TILE_WIDTH * i, y: TILE_WIDTH * j},
        duration: 200,
        useNativeDriver: true,
      }),
    ])

    animateSwap.start(() => {
      let allMatches = getAllMatches(tileDataSource)

      if (allMatches.length !== 0) {
        setMoves(moves-1)
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
  const processMatches = (matches: number[][][]) => {
    //console.log(matches)
    let smashedbean=[];
    let scorebean=[]
    let scores:any;
    matches.forEach(match => {
      match.forEach(coordinates => {
        const i = coordinates[0]
        const j = coordinates[1]
        const bean = tileDataSource[i][j].imgObj
        //getting score of smashed bean 
        scorebean.push(bean)
        scores=bean?.score
        if (tname == 'BLUE_BEAN') {
          // Iterate through BEAN_OBJS to find the BLUE_BEAN_OBJ
          const blueBeanObj = BEAN_OBJS.find(bean => bean.image === BLUE_BEAN);
          // Check if BLUE_BEAN_OBJ is found
          if (blueBeanObj) {
            // Access the color property of RED_BEAN_OBJ
            const blueBeanColor = blueBeanObj.color;
            
            console.log(blueBeanObj);
            //comparing smashed bean color with target bean color
            if (bean?.color === blueBeanColor) smashedbean.push(bean);
          }
        }
        if (tname == 'RED_BEAN') {
          // Iterate through BEAN_OBJS to find the BLUE_BEAN_OBJ
          const redBeanObj = BEAN_OBJS.find(bean => bean.image === RED_BEAN);
          // Check if BLUE_BEAN_OBJ is found
          if (redBeanObj) {
            // Access the color property of RED_BEAN_OBJ
            const redBeanColor = redBeanObj.color;
            setImagePath(require(`../assets/RedJellyBean.png`))
            console.log(redBeanColor);
            //comparing smashed bean color with target bean color
            if (bean?.color === redBeanColor) smashedbean.push(bean);
          }
        }
        if (tname == 'PURPLE_BEAN') {
          // Iterate through BEAN_OBJS to find the BLUE_BEAN_OBJ
          const purpleBeanObj = BEAN_OBJS.find(bean => bean.image === PURPLE_BEAN);
          // Check if BLUE_BEAN_OBJ is found
          if (purpleBeanObj) {
            // Access the color property of RED_BEAN_OBJ
            const purpleBeanColor = purpleBeanObj.color;
            setImagePath(require(`../assets/PurpleJellyBean.png`))
            console.log(purpleBeanColor);
            //comparing smashed bean color with target bean color
            if (bean?.color === purpleBeanColor) smashedbean.push(bean);
          }
        }
        if (tname == 'GREEN_BEAN') {
          // Iterate through BEAN_OBJS to find the BLUE_BEAN_OBJ
          const greenBeanObj = BEAN_OBJS.find(
            bean => bean.image === GREEN_BEAN,
          );
          // Check if BLUE_BEAN_OBJ is found
          if (greenBeanObj) {
            // Access the color property of RED_BEAN_OBJ
            const greenBeanColor = greenBeanObj.color;
            setImagePath(require(`../assets/GreenJellyBean.png`))
            console.log(greenBeanColor);
            //comparing smashed bean color with target bean color
            if (bean?.color === greenBeanColor) smashedbean.push(bean);
          }
        }
        if (tname == 'YELLOW_BEAN') {
          // Iterate through BEAN_OBJS to find the BLUE_BEAN_OBJ
          const yellowBeanObj = BEAN_OBJS.find(
            bean => bean.image === YELLOW_BEAN,
          );
          // Check if BLUE_BEAN_OBJ is found
          if (yellowBeanObj) {
            // Access the color property of RED_BEAN_OBJ
            const yellowBeanColor = yellowBeanObj.color;
            setImagePath(require(`../assets/YellowJellyBean.png`))
            console.log(yellowBeanColor);
            //comparing smashed bean color with target bean color
            if (bean?.color === yellowBeanColor) smashedbean.push(bean);
          }
        }
        if (tname == 'ORANGE_BEAN') {
          // Iterate through BEAN_OBJS to find the BLUE_BEAN_OBJ
          const orangeBeanObj = BEAN_OBJS.find(
            bean => bean.image === ORANGE_BEAN,
          );
          // Check if BLUE_BEAN_OBJ is found
          if (orangeBeanObj) {
            // Access the color property of RED_BEAN_OBJ
            const orangeBeanColor = orangeBeanObj.color;
           // setImagePath(require(`../assets/YellowJellyBean.png`))
            //comparing smashed bean color with target bean color
            if (bean?.color === orangeBeanColor) smashedbean.push(bean);
          }
        }
        if (tname == 'PINK_BEAN') {
          // Iterate through BEAN_OBJS to find the BLUE_BEAN_OBJ
          const pinkBeanObj = BEAN_OBJS.find(
            bean => bean.image === PINK_BEAN,
          );
          // Check if BLUE_BEAN_OBJ is found
          if (pinkBeanObj) {
            // Access the color property of RED_BEAN_OBJ
            const pinkBeanColor = pinkBeanObj.color;
           // setImagePath(require(`../assets/YellowJellyBean.png`))
           
            //comparing smashed bean color with target bean color
            if (bean?.color === pinkBeanColor) smashedbean.push(bean);
          }
        }
           })
    })
    if(smashedbean.length>0){
      setTarget(prevCandyBlast => prevCandyBlast - smashedbean.length)
    }
    if(scorebean.length>0){
      setScore(score=>score + scorebean.length*scores)
    }
    setTileDataSource(state => {
      let newTileDataSource = state.slice()
      markAsMatch(matches, newTileDataSource)
      condenseColumns(newTileDataSource)
      
      recolorMatches(newTileDataSource)
      
      return newTileDataSource
      
    })
    
  }
 
  const recolorMatches = (tileData: TileDataType[][]) => {
    tileData.forEach(row => {
      row.forEach(e => {
        if (e.markedAsMatch === true) {
          let randIndex = getRandomInt(7)
          let randomBeanObj = BEAN_OBJS[randIndex]
          e.markedAsMatch = false
          e.imgObj = randomBeanObj

        }
      })
    })
  }

  return (
    <ImageBackground source={justClouds} style={styles.backGroundImage}>
    <SafeAreaView style={styles.scoreBoard}>
     {/* <Text>{JSON.stringify(l_id)}</Text>*/}
    <View style={styles.scoreElement}>
          <Text style={{fontSize:responsiveFontSize(2.5)}}>Score</Text>
          <Text style={{fontSize:responsiveFontSize(2.2)}}>{score}</Text>
        </View>
        <View style={[styles.scoreElement,{flexDirection:'row'}]}>
          <Text style={{fontSize:responsiveFontSize(2.5)}}> Collect {target}</Text>
            {imagePath ? (
              <Image source={imagePath} style={styles.img} />
            ) : (
              <Text style={{fontSize:responsiveFontSize(1.8)}}>{tname}</Text>
            )}
          
        </View>
        <View style={styles.scoreElement}>
          <Text style={{fontSize:responsiveFontSize(2.5)}}>Moves</Text>
          <Text style={{fontSize:responsiveFontSize(2.2)}}>{moves}</Text>
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
                <Pressable onPress={() => [setMovesModal(false) ]} style={styles.press}>
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
                <Pressable onPress={() => [updateData(),setTargetModal(false),navigation.navigate('gamescreen',{l_id:n_id}) ]} style={styles.press}>
                  <Text style={styles.t}>Next</Text>  
             </Pressable>
              </View>
            </View>
          </Modal>
      
    </ImageBackground>
  )
}

function createKeys(numRows:any, numColumns:any) {
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
const initializeDataSource = (): TileDataType[][] => {
  
  let keys = createKeys(ROW,COLUMN)

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

export default React.memo(Secondlevel)

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
    marginTop:100,
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
  img:{
    width:35,
    height:35,
    resizeMode:'contain'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width:'100%',
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

  press:{
    backgroundColor:'#8e8e8e',
    width:'40%',
    padding:5,
    alignItems:'center',
    borderRadius:50,
    alignSelf:'center'
  },
  t:{
    fontSize:20,
    color:'white'
  }
})
