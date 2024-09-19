import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
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
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#304A6E',
    },
    optionButton: {
      padding: 16,
      textAlign: 'center',
      borderRadius: 12,
      marginVertical: 12,
      alignItems: 'center',
      width: '80%',
      height: 60,
      backgroundColor: '#FFFAFA'
    }
  });

export default function Ayuda () {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
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
        </View>
    )
};
