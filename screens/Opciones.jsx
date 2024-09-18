import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,ImageBackground, fontSize } from 'react-native';

export default function Opciones (props) {

  
  const infOpc = ()=>{
    props.navigation.navigate('infOpc')
}
  return (
    <ImageBackground
        source={require ('../assets/epet20fondo.png')}
        resizeMode= {'cover'}
        style = {styles.backgroundImage}
     > 


     <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={infOpc}>
          <Text>Opción 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} >
          <Text>Opción 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text>Opción 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text>Opción 4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text>Opción 5</Text>
        </TouchableOpacity>
      </View>
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
  optionsContainer: {
    width: '500%',
    alignItems: 'center',
  },
  optionButton: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: '80%',
    height: 50,
    backgroundColor: '#FFFAFA'
  }
});
