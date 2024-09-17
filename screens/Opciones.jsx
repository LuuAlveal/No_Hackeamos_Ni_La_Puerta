import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,ImageBackground, fontSize } from 'react-native';
export default function Opciones () {
  return (
    <ImageBackground
        source={require ('../assets/epet20fondo.png')}
        resizeMode= {'cover'}
        style = {styles.backgroundImage}
     > 


     <View style={styles.container}>
      <View style={styles.header}>
        {/*<Image
          source={require('./epet20fondo.png')} // Reemplaza con la ruta a tu logo
          style={styles.logo}
        />
        class="css-text-146c3p1"
        */}
        <TouchableOpacity style={styles.settingsButton}>
          
        <Text style={{ fontSize: 40, padding: '0' }}>⚙️</Text>
          
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text>Opción 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
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
        { /*
        <TouchableOpacity style={styles.backButton}>
          <Text>← Volver</Text>
        </TouchableOpacity> */ }
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
  header: {
    
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    
  },
  settingsButton: {
    top: '-50px', 
    left: '400px', 
    position: 'absolute',
    padding: '0',
    borderWidth: 0,

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
  },
  backButton: {

  },
});
