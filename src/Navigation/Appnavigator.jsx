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



const Stack = createNativeStackNavigator();
function Appnavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      
        <Stack.Screen name='splash' component={Splash} />
        <Stack.Screen name='main' component={Main} />
        <Stack.Screen name='signup' component={Signup}/>
        <Stack.Screen name='login' component={Login}/>
        <Stack.Screen name='levels' component={Levels}/>
        <Stack.Screen name='customlevel' component={Customlevels}/>
        <Stack.Screen name='createlevel' component={Createlevel}/>
        <Stack.Screen name='gamescreen' component={Gamescreen} />
        <Stack.Screen name="sqlite" component={Sqlite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Appnavigator;
