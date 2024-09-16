import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function Ayuda () {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text>
                        ¿Cómo puedo anotarme a una materia?
                    </Text>    
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>
                        ¿Cómo puedo registrarme?
                    </Text>    
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>
                    ¿Cómo puedo saber los datos de la materia a la que me quiero anotar?
                    </Text>    
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>
                    ¿Cómo puedo contactar a la escuela?
                    </Text>    
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>
                    ¿Hasta en cuantas materias me puedo anotar?
                    </Text>    
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#304A6E',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: 20,
    },
});
