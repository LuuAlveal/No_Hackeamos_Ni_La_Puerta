import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './Stack/MyStack';

export default function App() {

  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

