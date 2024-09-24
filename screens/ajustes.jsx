import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ImageBackground,} from 'react-native';
export default function Ajustes (props) {
  const Ayuda= ()=> {
      props.navigation.navigate('Ayuda')
  }
  const Creditos= ()=> {
      props.navigation.navigate('Creditos')
  }
  
    return (
      <ImageBackground
      source={require ('../assets/epet20fondo.png')}
      resizeMode= {'cover'}
      style = {styles.backgroundImage}
   > 
   <View style={styles.container}>
    <View style={styles.Containerbutton}>
      <TouchableOpacity style={styles.Button} onPress={Ayuda}>
        <Text>preguntas frecuentes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress={Creditos}>
        <Text>creditos</Text>
      </TouchableOpacity>
    </View>
   </View>
  </ImageBackground>
  );
};

