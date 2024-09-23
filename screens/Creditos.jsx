import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground  } from 'react-native';

const styles = StyleSheet.create({
   
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      },
   
    text: {
      color: 'white',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      height: 38
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius:10,         
        margin: '1rem',
        padding: '2rem',
    },
  });

export default function Creditos () {
    return (

    <ImageBackground
        source={require('../assets/epet20fondo.png')}
        resizeMode={'cover'}
        style={styles.backgroundImage}
      >

        <View style={styles.container}>
           <Text style={styles.text}>
           Esta aplicación fue diseñada por el mejor grupo galáctico, los mas copados, todo.
           </Text>
           <Text style={styles.text}>
            Marcos Ortega alias Odoo Bassignani 
           </Text>
           <Text style={styles.text}>
           Luana Alveal alias la peor alumna 
           </Text>
           <Text style={styles.text}>
           Lucas Bravo alias el mejor alumno
           </Text>
           <Text style={styles.text}>
           Facundo Pichiman alias el bautista
           </Text>
           <Text style={styles.text}>
           Nazareno Álvarez alias el búfalo
           </Text>
        </View>
    </ImageBackground>
    )
};