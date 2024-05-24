import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Sqlite from '../sqlite/Sqlite';
import Splash from '../Screens/Splash';
import Main from '../Screens/Main';
import Signup from '../Screens/Signup';
import Login from '../Screens/Login';
import Levels from '../Screens/Levels';
import Customlevels from '../Screens/Customlevels';
import Createlevel from '../Screens/Createlevel';
import Gamescreen from '../GameScreen/components/Gamescreen';
import Customscore from '../Screens/Customscore';

import Players from '../Screens/Players';
import Screen from '../CustomScreen/components/Screen';
import MultiScreen from '../MultiScreen/components/MultiScreen';
import Rooms from '../Screens/Rooms';
import Islamabad from '../Screens/CityRoom';
import Lahore from '../Screens/Lahore';
import Peshawar from '../Screens/Peshawar';
import History from '../Screens/History';
import CityRoom from '../Screens/CityRoom';
const Stack = createNativeStackNavigator();
function Appnavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='splash' component={Splash} />
        <Stack.Screen name='players' component={Players} />
        <Stack.Screen name='multi' component={MultiScreen} />
        <Stack.Screen name="sqlite" component={Sqlite} />
        <Stack.Screen name='main' component={Main} />
        <Stack.Screen name='signup' component={Signup}/>
        <Stack.Screen name='login' component={Login}/>
        <Stack.Screen name='levels' component={Levels}/>
        <Stack.Screen name='customlevels' component={Customlevels}/>
        <Stack.Screen name='createlevel' component={Createlevel}/>
        <Stack.Screen name='gamescreen' component={Gamescreen} />
        <Stack.Screen  name='customscreen' component={Screen} />
        <Stack.Screen name='test' component={Customscore} />
        <Stack.Screen name='rooms' component={Rooms} />
        <Stack.Screen name='cityroom' component={CityRoom}/>
        <Stack.Screen name='history' component={History} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Appnavigator;
