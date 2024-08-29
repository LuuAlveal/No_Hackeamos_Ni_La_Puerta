import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
export default function Opciones () {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/*<Image
          source={require('./epet20fondo.png')} // Reemplaza con la ruta a tu logo
          style={styles.logo}
        />*/}
        <TouchableOpacity style={styles.settingsButton}>
          <Text>⚙️</Text>
          
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
        <TouchableOpacity style={styles.backButton}>
          <Text>← Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222', // Ajusta el color de fondo
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
  logo: {
    // Ajusta el tamaño y estilo de tu logo
  },
  settingsButton: {
    // Estilos para el botón de configuración
  },
  optionsContainer: {
    width: '80%',
  },
  optionButton: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  backButton: {
    // Estilos para el botón de volver
  },
});
