import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';

export default function App() {
  const Stack = createStackNavigator();

  function MyStack() {
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
              backgroundColor: '#304A6E',
              marginBottom:0,
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
              backgroundColor: '#304A6E',
              marginBottom:0,
            }
          }}
        />
      </Stack.Navigator>
  );
}
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

