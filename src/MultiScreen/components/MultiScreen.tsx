import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, Dimensions, Animated, LayoutChangeEvent, View, Text, Easing, PanResponderGestureState, SafeAreaView, ImageBackground,Image, Modal, Pressable, Button} from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import {getRandomInt, getAllMatches, markAsMatch, condenseColumns, flattenArrayToPairs, findMoves, sleep} from '../lib/GridApi'
import { TileData,TileDataType } from '../lib/TileData'
import Tile from './Tile'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { COLORS,BEAN_OBJS } from '../lib/Images'
import { ROW,COLUMN } from '../lib/spec'

// react-native-swipe-gestures swipeDirections type
export enum swipeDirections {
  SWIPE_UP = 'SWIPE_UP',
  SWIPE_DOWN = 'SWIPE_DOWN',
  SWIPE_LEFT = 'SWIPE_LEFT',
  SWIPE_RIGHT = 'SWIPE_RIGHT',
}
const justClouds=require('../assets/CloudsBackgroung.png')
const colorkeys=Object.keys(COLORS)
 
const MultiScreen = ({navigation,route}:{navigation:any,route:any}) => {
  //ROW=6
 //COLUMN=7
 const[imagePath,setImagePath]=useState(null)
  const l_id = 1;
  const n_id=1+1
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
  const [gameDuration,setGameDuration]=useState(145)
  const[currentPlayer,setCurrentPlayer]=useState(1)
  const[timeLeft,setTimeLeft]=useState(10)
    
  useEffect(()=>{
    setTimeout(()=>{
      //  console.log(gameDuration);
       setGameDuration((time)=>time-1)
       setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
          return 10;
        } else {
          return prevTime - 1;
        }
      });
   },1000)
  },[gameDuration])
  useEffect(() => {
    if(gameDuration==0){
      setTargetModal(true)
    }
    else{
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
  }}, [tileDataSource])
  
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
    <ImageBackground source={require('../assets/CloudsBackground.png')} style={styles.backGroundImage}>
           <SafeAreaView style={styles.scoreBoard}>
        <View style={[styles.scoreElement]}>
          <Image source={require('../assets/msyed.jpeg')} style={styles.img} />
          <Text style={{ fontSize: 18 }}>{score}</Text>
          {currentPlayer==1?<Text style={styles.time} >{timeLeft}</Text>:null}
        </View>
        <View style={styles.scoreElement}>
          <Image source={require('../assets/smart-watch.png')} style={{ width:100, height:65}} />
          <Text style={{ position: 'absolute', fontSize: 20, marginVertical: 20, marginLeft: 2 }}>{Math.floor(gameDuration / 60)}:{gameDuration % 60}</Text>
        </View>
        <View style={[styles.scoreElement]}>
          <Image source={require('../assets/shoaib.jpeg')} style={styles.img} />
          <Text style={{ fontSize: 18 }}>{score}</Text>
          {currentPlayer==2?<Text style={styles.time} >{timeLeft}</Text>:null}
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
        visible={targetModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your Score:{score}</Text>
            <Text style={styles.modalText}>Level completed</Text>
            <Pressable onPress={() => [setTargetModal(false)]} style={styles.press}>
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

export default React.memo(MultiScreen)

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
    width:50,
    height:50,
    resizeMode:'contain'
  },
  time:{
     position:'absolute',
     fontSize:30,
     color:'white'
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
