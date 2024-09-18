import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Register from '../screens/Register';
import Opciones from '../screens/Opciones';
import Ayuda from '../screens/ayuda';
import infOpc from '../screens/infOpc';

const Stack = createStackNavigator();
  
export default function MyStack() {
      return (
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={ Login } 
            options={{
              title: "E.P.E.T N 20",
              headerTintColor: 'white',
              headerTitleAlign: 'center',
              headerStyle: { 
                backgroundColor: '#304A6E'
              }
            }}
        />
  
        <Stack.Screen 
            name="Register" 
            component={ Register } 
            options={{
              title: "E.P.E.T N 20",
              headerTintColor: 'white',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#304A6E',
              }
            }}
        />
  
        <Stack.Screen 
            name="Home" 
            component={ Home } 
            options={{
              title: "E.P.E.T N 20",
              headerTintColor: 'white',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#304A6E'
              }
            }}
        />
          <Stack.Screen 
            name="Opciones" 
            component={ Opciones } 
            options={{
              title: "E.P.E.T N 20",
              headerTintColor: 'white',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#304A6E'
              }
            }}
        />
          <Stack.Screen 
            name="Ayuda" 
            component={ Ayuda } 
            options={{
              title: "E.P.E.T N 20",
              headerTintColor: 'white',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#304A6E'
              }
            }}
        />
   

   <Stack.Screen 
            name="infOpc" 
            component={ infOpc } 
            options={{
              title: "E.P.E.T N 20",
              headerTintColor: 'white',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#304A6E',
              }
            }}
        />
  
  
        </Stack.Navigator>
    );
  
}