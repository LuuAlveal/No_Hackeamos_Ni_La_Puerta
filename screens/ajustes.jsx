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
    <TouchableOpacity style={styles.Button} onPress={Ayuda}>
        <Text>Nuestra pagina oficial</Text>
      </TouchableOpacity>
   </View>
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Containerbutton: {
    width: '500%',
    alignItems: 'center',
  },
  Button: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: '80%',
    height: 50,
    backgroundColor: '#FFFAFA'
  }
});