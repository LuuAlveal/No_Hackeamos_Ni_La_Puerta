import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground  } from 'react-native';
import { Linking } from 'react-native';

const AnotarseMateria = () => {
    Linking.openURL('https://drive.google.com/file/d/1mGvps6PheUVDiOZqAsK6akfrO_bBrEqZ/view?usp=drive_link');
};
const Registrase = () => {
    Linking.openURL('https://drive.google.com/file/d/1xLjtTgbe85Apy_AMc0hN06OFY8yGz9sk/view?usp=drive_link');
};
const DatosMateria = () => {
    Linking.openURL('https://drive.google.com/file/d/1mGvps6PheUVDiOZqAsK6akfrO_bBrEqZ/view?usp=drive_link');
};
const InformacionEscuela = () => {
    Linking.openURL('https://drive.google.com/file/d/1uRFxjUZjo2O91N5xR6gSk_RUUh4coeSP/view?usp=drive_link');
};
const MaximoMaterias = () => {
    Linking.openURL('https://drive.google.com/file/d/1YLziNl5WJ8bm7OO64sU6lwXUX_GZfWYl/view?usp=drive_link');
};
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
    },
    optionButton: {
      padding: 16,
      textAlign: 'center',
      borderRadius: 15,
      marginVertical: 15,
      alignItems: 'center',
      width: '80%',
      height: 60,
      backgroundColor: '#FFFAFA'
    }
  });

export default function Ayuda () {
    return (

        <ImageBackground
        source={require('../assets/epet20fondo.png')}
        resizeMode={'cover'}
        style={styles.backgroundImage}
      >

        <View style={styles.container}>
            
                <TouchableOpacity 
                    style={styles.optionButton}
                    onPress={AnotarseMateria}
                    >
                    <Text>
                        ¿Cómo puedo anotarme a una materia?
                    </Text>    
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.optionButton}
                    onPress={Registrase}
                    >
                    <Text>
                        ¿Cómo puedo registrarme?
                    </Text>    
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.optionButton}
                    onPress={DatosMateria}
                    >
                    <Text>
                    ¿Cómo puedo saber los datos de la materia a la que me quiero anotar?
                    </Text>    
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.optionButton}
                    onPress={InformacionEscuela}
                    >
                    <Text>
                    ¿Cómo puedo contactar a la escuela?
                    </Text>    
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.optionButton}
                    onPress={MaximoMaterias}
                    >
                    <Text>
                    ¿Hasta en cuantas materias me puedo anotar?
                    </Text>    
                </TouchableOpacity>
            </View>
    </ImageBackground>
    )
};
