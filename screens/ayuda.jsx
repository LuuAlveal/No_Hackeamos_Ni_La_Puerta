import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

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
                <TouchableOpacity style={styles.optionButton}>
                    <Text>
                        ¿Cómo puedo anotarme a una materia?
                    </Text>    
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                    <Text>
                        ¿Cómo puedo registrarme?
                    </Text>    
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                    <Text>
                    ¿Cómo puedo saber los datos de la materia a la que me quiero anotar?
                    </Text>    
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                    <Text>
                    ¿Cómo puedo contactar a la escuela?
                    </Text>    
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                    <Text>
                    ¿Hasta en cuantas materias me puedo anotar?
                    </Text>    
                </TouchableOpacity>
            </View>
        </View>
    )
};
