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
   
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      height: 38
    }
  });

export default function Creditos () {
    return (

    <ImageBackground
        source={require('../assets/epet20fondo.png')}
        resizeMode={'cover'}
        style={styles.backgroundImage}
      >

        <View style={styles.text}>
           
        </View>
    </ImageBackground>
    )
};