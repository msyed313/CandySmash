import {Animated, Dimensions} from 'react-native'
//import { ImageObjType } from '../components/Gamescreen'


let Window = Dimensions.get('window')
let windowSpan = Math.min(Window.width, Window.height)
export const TILE_WIDTH = windowSpan / 6



export function TileData(imgObj, key) {
  return {
    key: key,
    markedAsMatch: false,
    location: new Animated.ValueXY(),
    imgObj: imgObj,
    scale: new Animated.Value(1),
    
  }
}
