import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Opciones () {
  const navigation = useNavigation();

  const infOpc = ()=>{
    navigation.navigate('infOpc')
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
          <Text>Programacion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} >
          <Text>Programación Web Estatica</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text>ingles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text>automatización y control</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text>Sistema de gestion de calidad </Text>
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
